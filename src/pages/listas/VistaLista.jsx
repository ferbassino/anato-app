import React, { useEffect, useRef, useState } from "react";
import "./VistaLista.css";
import { useReactToPrint } from "react-to-print";
import { getAllStudents } from "../../services/studentsServices";
import { ClipLoader } from "react-spinners";
import client from "../../api/client";

const VistaLista = ({ comision, handleListaVisible }) => {
  const [comisionEnVistaGeneralVisible, setComisionEnVistaGeneralVisible] =
    useState(false);
  const [currentStudents, setCurrentStudents] = useState([]);
  const [vistaPdfVisible, setVistaPdfVisible] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consición, setCondicion] = useState("");

  const handleDelete = async (el) => {
    if (el.roles === "student") {
      try {
        setLoading(true);
        const response = await client.put(`api/student/${el._id}`, {
          roles: "libre",
        });
        if (response.data.success) {
          const response = await client.get(`api/student/${el._id}`);
          const students = await getAllStudents();
          if (students) {
            setStudents(students);
            const listaActual = [];
            if (comision === "general") {
              setComisionEnVistaGeneralVisible(true);
            } else {
              setComisionEnVistaGeneralVisible(false);
            }
            students.map((el) => {
              if (comision === el.comision) {
                listaActual.push(el);
              } else if (comision === "general") {
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
            setCurrentStudents(listaActual);
            setLoading(false);
          }
        }
      } catch (error) {
        alert("ocurrió un error vuelva a intentarlo mas tarde");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (el.roles === "libre") {
      try {
        setLoading(true);
        const response = await client.put(`api/student/${el._id}`, {
          roles: "student",
        });
        if (response.data.success) {
          const response = await client.get(`api/student/${el._id}`);
          const students = await getAllStudents();
          if (students) {
            setStudents(students);
            const listaActual = [];
            if (comision === "general") {
              setComisionEnVistaGeneralVisible(true);
            } else {
              setComisionEnVistaGeneralVisible(false);
            }
            students.map((el) => {
              if (comision === el.comision) {
                listaActual.push(el);
              } else if (comision === "general") {
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
            setCurrentStudents(listaActual);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const currentsStudents = async () => {
      setLoading(true);
      const students = await getAllStudents();
      if (students) {
        setStudents(students);
        const listaActual = [];
        if (comision === "general") {
          setComisionEnVistaGeneralVisible(true);
        } else {
          setComisionEnVistaGeneralVisible(false);
        }
        students.map((el) => {
          if (comision === el.comision) {
            listaActual.push(el);
          } else if (comision === "general") {
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
        setCurrentStudents(listaActual);
        setLoading(false);
      }
    };
    currentsStudents();
  }, []);

  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: `com-${comision}`,
  });
  return (
    <>
      {loading ? (
        <>
          <ClipLoader
            color="#81a1fc"
            loading={loading}
            id="hashLoader"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </>
      ) : (
        <div className="contenedorGeneral">
          <div className="comisiones-imprimir">
            <button name="comisiones" onClick={handleListaVisible}>
              Comisiones
            </button>
            <button name="imprimir" onClick={generatePDF}>
              Imprimir
            </button>
          </div>
          <div id="tableContainer">
            <div ref={conponentPDF} className="imprimir-container">
              <table summary="">
                {comision === "general" ? (
                  <>
                    <caption>
                      <span>{currentStudents.length}</span>
                      <span id="titulo">alumnos </span>
                      {/* <span>Impresion: {currentDate}</span> */}
                    </caption>
                  </>
                ) : (
                  <>
                    <caption>
                      <span id="titulo">Comisión: {comision}</span> -
                      <span> {currentStudents.length} alumnos</span>
                    </caption>
                  </>
                )}

                <thead>
                  <tr>
                    <th id="columnaOrden" scope="col">
                      N°
                    </th>
                    {comisionEnVistaGeneralVisible ? (
                      <th id="columnaComision" scope="col">
                        Com
                      </th>
                    ) : null}
                    <th scope="col">Apellido</th>
                    <th scope="col">Nombres</th>
                    <th scope="col">DNI</th>
                    <th scope="col">cond</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((el, index) => (
                    <tr
                      key={el._id}
                      onClick={() => {
                        // handleStudent(el._id);
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
                      <td onClick={(e) => handleDelete(el)}>
                        {el.roles === "student" ? "Reg" : "Lib"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VistaLista;
