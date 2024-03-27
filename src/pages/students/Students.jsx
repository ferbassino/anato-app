import React, { useEffect, useState, useRef } from "react";
import "./Students.css";
import client from "../../api/client";
import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { Document, Page, View, PDFViewer } from "@react-pdf/renderer";
import { useReactToPrint, ReactToPrint } from "react-to-print";

const Students = () => {
  const [studentsArray, setStudentsArray] = useState([]);
  const [lista, setLista] = useState("");
  const [total, setTotal] = useState(0);
  const [comisionActual, setComisionActual] = useState("");
  const [loading, setLoading] = useState(false);
  const [listaVisible, setListaVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [vistaExamenVisible, setVistaExamenVisible] = useState(false);
  const [vistaDniVisible, setVistaDniVisible] = useState(false);
  const [vistaPdfVisible, setVistaPdfVisible] = useState(false);
  const [comisionEnVistaGeneralVisible, setComisionEnVistaGeneralVisible] =
    useState(false);
  const conponentPDF = useRef();
  const navigate = useNavigate();

  const navigation = [
    { name: "Lista general", href: "#", current: true },
    { name: "com-01", href: "#", current: false },
    { name: "com-02", href: "#", current: false },
    { name: "com-03", href: "#", current: false },
    { name: "com-04", href: "#", current: false },
    { name: "com-05", href: "#", current: false },
    { name: "com-06", href: "#", current: false },
    { name: "com-07", href: "#", current: false },
    { name: "com-08", href: "#", current: false },
    { name: "com-09", href: "#", current: false },
    { name: "com-10", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const date = new Date();

  useEffect(() => {
    setCurrentDate(date.getFullYear());
  }, []);

  const mostrarLista = async (e) => {
    try {
      setVistaDniVisible(true);
      setLoading(true);
      setListaVisible(false);
      setComisionActual(e);
      const listaActual = [];
      const students = await client.get("api/student");

      if (students) {
        if (e === "Lista general") {
          setComisionEnVistaGeneralVisible(true);
        } else {
          setComisionEnVistaGeneralVisible(false);
        }
        students.data.students.map((el) => {
          if (e === `com-${el.comision}`) {
            listaActual.push(el);
          } else if (e === "Lista general") {
            listaActual.push(el);
          }
        });
        listaActual.sort((a, b) => {
          if (a.apellido < b.apellido) {
            return -1;
          }
          if (a.apellido > b.apellido) {
            return 1;
          }
          return 0;
        });

        setListaVisible(true);
        setStudentsArray(listaActual);
        setTotal(listaActual.length);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleHome = () => {
    navigate("/home");
  };
  // useEffect(() => {
  //   const getStudents = async () => {
  //     const students = await client.get("api/student");
  //     console.log(students.data.students);
  //     setStudentsArray(students.data.students);
  //   };
  //   getStudents();
  // }, []);

  const handleVistaDni = () => {
    setVistaDniVisible(true);
    setVistaExamenVisible(false);
    setVistaPdfVisible(false);
  };
  const handleVistaExamen = () => {
    setVistaDniVisible(false);
    setVistaExamenVisible(true);
    setVistaPdfVisible(false);
  };
  const handleVistaPdf = () => {
    setVistaDniVisible(false);
    setVistaExamenVisible(false);
    setVistaPdfVisible(true);
  };

  const handleStudent = (id) => {
    navigate(`/vista-alumno/${id}`);
  };
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center"></div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          onClick={(e) => mostrarLista(e.target.text)}
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>{" "}
                  </div>{" "}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    onClick={(e) => mostrarLista(e.target.text)}
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {listaVisible ? (
        <>
          <div className="vista-buton-container">
            <button
              onClick={handleVistaDni}
              className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
            >
              Vista DNI
            </button>
            {/* <button
              onClick={handleVistaExamen}
              className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
            >
              Vista exámen
            </button> */}

            <ReactToPrint
              trigger={() => (
                <button className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm">
                  Imprimir
                </button>
              )}
              content={() => conponentPDF.current}
              pageStyle="@page { size: auto;  margin: 20mm }"
            />
            {/* <button
              onClick={generatePDF}
              className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
            >
              Generar PDF
            </button> */}
          </div>
          {vistaDniVisible ? (
            <div ref={conponentPDF}>
              <div className="tableContainer">
                <table summary="">
                  <caption>
                    <span id="titulo">Comisión: {comisionActual}</span>
                    <span>{total} alumnos</span>
                    {/* <span>Impresion: {currentDate}</span> */}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      {comisionEnVistaGeneralVisible ? (
                        <th scope="col">Com</th>
                      ) : null}
                      <th scope="col">Apellido</th>
                      <th scope="col">Nombres</th>
                      <th scope="col">DNI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsArray.map((el, index) => (
                      <tr
                        key={el._id}
                        onClick={() => {
                          handleStudent(el._id);
                        }}
                        className="hover:bg-blue-400 cursor-pointer"
                      >
                        <td className="apellido-nombre">{index + 1}</td>
                        {comisionEnVistaGeneralVisible ? (
                          <td className="apellido-nombre">{el.comision}</td>
                        ) : null}
                        <td className="apellido-nombre">{el.apellido}</td>
                        <td className="apellido-nombre">{el.nombres}</td>
                        <td className="apellido-nombre">{el.dni}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          {vistaExamenVisible ? (
            <div ref={conponentPDF}>
              <div className="catedra "></div>
              <div className="tableContainer">
                <table summary="">
                  <caption>
                    <h1 className="titulo-cursiva">CÁTEDRA DE ANATOMÍA</h1>
                    {/* <h1 className="titulo-cursiva"> */}
                    <h1>ESCUELA DE KINESIOLOGÍA Y FISIATÍA</h1>
                    <h1 className="titulo-cursiva">U.B.A.</h1>
                  </caption>
                  <caption className="ano-comision">
                    <span>AÑO {currentDate}</span>
                    <span id="titulo">COMISIÓN {comisionActual.slice(4)}</span>
                  </caption>
                  <thead>
                    <tr>
                      <th className="numero" scope="col">
                        N°
                      </th>
                      <th className="apellido" scope="col">
                        Apellido y Nombre
                      </th>
                      <th className="T" scope="col">
                        T
                      </th>
                      <th className="P" scope="col">
                        P
                      </th>
                      <th className="T" scope="col">
                        T
                      </th>
                      <th className="P" scope="col">
                        P
                      </th>
                      <th className="N" scope="col">
                        N
                      </th>
                      <th className="T" scope="col">
                        T
                      </th>
                      <th className="P" scope="col">
                        P
                      </th>
                      <th className="T" scope="col">
                        T
                      </th>
                      <th className="P" scope="col">
                        P
                      </th>
                      <th className="N" scope="col">
                        N
                      </th>
                      <th className="T" scope="col">
                        T
                      </th>
                      <th className="P" scope="col">
                        P
                      </th>
                      <th className="T" scope="col">
                        T
                      </th>
                      <th className="P" scope="col">
                        P
                      </th>
                      <th className="N" scope="col">
                        N
                      </th>
                      <th className="C" scope="col">
                        C
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsArray.map((el, index) => (
                      <tr key={el._id}>
                        <td>{index + 1}</td>

                        <td className="apellido-nombre">
                          {el.apellido}, {el.nombres}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="N"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="N"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="N"></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          {vistaPdfVisible ? (
            <div ref={conponentPDF}>
              <div className="tableContainer">
                <table summary="">
                  <caption>
                    <span id="titulo">Comisión: {comisionActual}</span>
                    <span>{total} alumnos</span>
                    {/* <span>Impresion: {currentDate}</span> */}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Com</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Nombres</th>
                      <th scope="col">DNI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsArray.map((el, index) => (
                      <tr
                        key={el._id}
                        onClick={() => {
                          handleStudent(el._id);
                        }}
                        className="hover:bg-blue-400 cursor-pointer"
                      >
                        <td className="apellido-nombre">{index + 1}</td>
                        <td className="apellido-nombre">{el.comision}</td>

                        <td className="apellido-nombre">{el.apellido}</td>
                        <td className="apellido-nombre">{el.nombres}</td>
                        <td className="apellido-nombre">{el.dni}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <ClipLoader
            // color={color}
            loading={true}
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Students;
