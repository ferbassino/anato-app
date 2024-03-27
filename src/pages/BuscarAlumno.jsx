import React, { useEffect, useState } from "react";
import client from "../api/client";
import StudentView from "./../components/StudentView";
import "./CambioDeComision.css";
const BuscarAlumno = () => {
  const [dniVisible, setDniVisible] = useState(false);
  const [inputBusquedaVisible, setInputBusquedaVisible] = useState(false);
  const [dni, setDni] = useState("");
  const [apellido, setApellido] = useState("");
  const [students, setStudents] = useState([]);
  const [studentDni, setStudentDni] = useState({});
  const [studentDniVisible, setStudentDniVisible] = useState(false);
  const [studentApellidoArray, setStudentApellidoArray] = useState({});
  const [coincidencias, setCoincidencias] = useState(0);
  const [studentApellidoVisible, setStudentApellidoVisible] = useState(false);
  const [studentVisible, setStudentVisible] = useState(false);

  useEffect(() => {
    try {
      const getAllStudents = async () => {
        const response = await client.get("/api/student");
        if (response.data.success) {
          setStudents(response.data.students);
        }
      };
      getAllStudents();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDniVisible = () => {
    setDniVisible(true);
    setInputBusquedaVisible(true);
    setApellido("");
    setDni("");
    setStudentDniVisible(false);
    setStudentApellidoArray({});
    setCoincidencias(0);
    setStudentApellidoVisible(false);
    setStudentVisible(false);
  };
  const handleApellidoVisible = () => {
    setDniVisible(false);
    setInputBusquedaVisible(true);
    setDni("");
    setApellido("");
    setDni("");
    setStudentDniVisible(false);
    setStudentApellidoArray({});
    setCoincidencias(0);
    setStudentApellidoVisible(false);
    setStudentVisible(false);
  };

  //   42246562

  const handleDni = (e) => {
    if (dni.length !== 8) {
      alert("el DNI debe tener 8 números");
      setDni("");
      setApellido("");
      setStudentDni({});
      setStudentDniVisible(false);
      setStudentApellidoArray({});
      setCoincidencias(0);
      setStudentApellidoVisible(false);
      setStudentVisible(false);
      return;
    }
    const arrayDni = [];

    students.map((student) => {
      if (student.dni === dni) {
        setStudentDni(student);
        setStudentDniVisible(true);
        arrayDni.push(student);
        setDni("");
        setInputBusquedaVisible(false);
      }
    });

    if (arrayDni.length < 1) {
      alert("El DNI no se encontró entre los alumnos");
      setDni("");
      setApellido("");
      setStudentDni({});
      setStudentDniVisible(false);
      setStudentApellidoArray({});
      setCoincidencias(0);
      setStudentApellidoVisible(false);
      setStudentVisible(false);
      return;
    }
  };
  const studentArrarSplitApellidos = [];
  const studentArrarSplitApellidos2 = [];

  let apellidos = [];

  const handleApellido = (e) => {
    if (
      apellido.match(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
      ) === null
    ) {
      alert("Se debe ingresar una apellido válido");
      setDni("");
      setApellido("");
      setStudentDni({});
      setStudentDniVisible(false);
      setStudentApellidoArray({});
      setCoincidencias(0);
      setStudentApellidoVisible(false);
      setStudentVisible(false);
      return;
    }

    students.map((student) => {
      apellidos = student.apellido.split(" ");
      studentArrarSplitApellidos.push({ ...student, apellidos });
    });
    const array = [];
    studentArrarSplitApellidos.map((student) => {
      if (
        student.apellidos[0] === apellido.toUpperCase() ||
        student.apellidos[1] === apellido.toUpperCase()
      ) {
        studentArrarSplitApellidos2.push(student);
        array.push(student);
        setStudentApellidoArray(studentArrarSplitApellidos2);
        setCoincidencias(studentArrarSplitApellidos2.length);
        setStudentApellidoVisible(true);
        setInputBusquedaVisible(false);
      }
    });
    if (array < 1) {
      alert("No se encontraron alumnos con ese apellido");
    }
  };
  const handleStudent = (e) => {
    console.log(e);
  };
  const handleVolverABuscar = () => {
    setDniVisible(false);
    setInputBusquedaVisible(false);
    setDni("");
    setApellido("");
    setStudentDni({});
    setStudentDniVisible(false);
    setStudentApellidoArray({});
    setCoincidencias(0);
    setStudentApellidoVisible(false);
    setStudentVisible(false);
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
        <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Buscar alumno
          </h1>
          <p>1. Elegir un dato de búsqueda, por DNI o por apellido</p>
          <button
            onClick={handleDniVisible}
            className="my-2  inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Por DNI
          </button>
          <button
            onClick={handleApellidoVisible}
            className="my-2 inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Por Apellido
          </button>
          {inputBusquedaVisible ? (
            <>
              <p className="mb-8 leading-relaxed"></p>
              {dniVisible ? (
                <>
                  <div className="flex w-full justify-center items-end">
                    <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                      <label
                        htmlFor="hero-field"
                        className="leading-7 text-xl text-gray-600"
                      >
                        Ingresar DNI
                      </label>
                      <input
                        required
                        onChange={(e) => setDni(e.target.value)}
                        value={dni}
                        type="text"
                        id="hero-field"
                        name="hero-field"
                        className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-blue-200 focus:bg-transparent border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <button
                      disabled={false}
                      onClick={(e) => handleDni(e)}
                      className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                    >
                      Enviar DNI
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-full justify-center items-end">
                    <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                      <label
                        htmlFor="hero-field"
                        className="leading-7 text-xl text-gray-600"
                      >
                        Ingresar Apellido
                      </label>
                      <input
                        onChange={(e) => setApellido(e.target.value)}
                        value={apellido}
                        type="text"
                        id="hero-field"
                        name="hero-field"
                        className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-blue-200 focus:bg-transparent border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <button
                      onClick={handleApellido}
                      className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                    >
                      Enviar Apellido
                    </button>
                  </div>
                </>
              )}

              <div className="flex"></div>
            </>
          ) : null}
        </div>
        {studentDniVisible ? (
          <>
            <div className="container px-5 pt-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                  {studentDni.apellido}, {studentDni.nombres}
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
                  Comisión: {studentDni.comision}
                </p>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-xl">
                  {studentDni.horarioComision}
                </p>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-xl">
                  DNI: {studentDni.dni}
                </p>
              </div>
            </div>
            <button
              disabled={false}
              onClick={handleVolverABuscar}
              className="inline-flex text-white bg-blue-500 border-0  px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
            >
              volver a buscar
            </button>
          </>
        ) : null}
        {studentApellidoVisible ? (
          <>
            <div>
              {coincidencias > 0 && coincidencias < 2 ? (
                <h1>Se encontró un alumno </h1>
              ) : (
                <h1>Se encontraron {coincidencias} alumnos</h1>
              )}

              <div className="tableContainer">
                <table summary="">
                  <thead>
                    <tr>
                      <th scope="col">Com</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Nombres</th>
                      <th scope="col">DNI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentApellidoArray.map((el, index) => (
                      <tr
                        key={el._id}
                        onClick={() => {
                          handleStudent(el._id);
                        }}
                      >
                        <td className="apellido-nombre">{el.comision}</td>
                        <td className="apellido-nombre">{el.apellido}</td>
                        <td className="apellido-nombre">{el.nombres}</td>
                        <td className="apellido-nombre">{el.dni}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                disabled={false}
                onClick={handleVolverABuscar}
                className="inline-flex text-white bg-blue-500 border-0  px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              >
                volver a buscar
              </button>
            </div>
            {/* <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                        {studentDni.apellido}, {studentDni.nombres}
                      </h1>
                      <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
                        Comisión: {studentDni.comision}
                      </p>
                      <p className="lg:w-2/3 mx-auto leading-relaxed text-xl">
                        {studentDni.horarioComision}
                      </p>
                      <p className="lg:w-2/3 mx-auto leading-relaxed text-xl">
                        DNI: {studentDni.dni}
                      </p>
                    </div>
                  </div> */}
          </>
        ) : null}
      </div>
    </section>
  );
};

export default BuscarAlumno;
