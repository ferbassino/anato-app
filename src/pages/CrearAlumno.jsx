import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import "./CrearAlumno.css";
import ClipLoader from "react-spinners/ClipLoader";

const CrearAlumno = () => {
  const navigate = useNavigate();
  const [apellido, setApellido] = useState("");
  const [nombres, setNombres] = useState("");
  const [dni, setDni] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [cursada, setCursada] = useState("");
  const [comision, setComision] = useState("");
  const [horarioComision, setHorarioComision] = useState("");
  const [crearVisible, setCrearVisible] = useState(false);
  const [actualizarVisible, setActualizarVisible] = useState(false);
  const [eliminarVisible, setEliminarVisible] = useState(false);
  const [alumnoEliminarVisible, setAlumnoEliminarVisible] = useState(false);
  const [studenId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

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

  students.map((el) => {
    if (el.apellido == "ALVAREZ") {
      console.log(el);
    }
  });

  // console.log(students);

  console.log(apellido);
  const handleCreate = async () => {
    try {
      setLoading(true);
      const response = await client.post("/api/student", {
        apellido,
        nombres,
        dni,
        ingreso,
        cursada,
        comision,
        horarioComision,
      });
      if (response.data.success) {
        setLoading(false);
        setCrearVisible(false);
        setActualizarVisible(false);
        setEliminarVisible(false);
        setApellido("");
        setNombres("");
        setDni("");
        setIngreso("");
        setCursada("");
        setComision("");
        setHorarioComision("");
        alert(
          `el alumno ${apellido}, ${nombres} se agregó a la comisión ${comision} exitosamente`
        );
      } else {
        setLoading(false);
        setCrearVisible(false);
        setActualizarVisible(false);
        setEliminarVisible(false);
        setApellido("");
        setNombres("");
        setDni("");
        setIngreso("");
        setCursada("");
        setComision("");
        setHorarioComision("");
        alert(
          "hubo problemas en la carga del alumno, vuelva a intentarlo mas tarde"
        );
      }
    } catch (error) {
      setLoading(false);
      setCrearVisible(false);
      setActualizarVisible(false);
      setEliminarVisible(false);
      setApellido("");
      setNombres("");
      setDni("");
      setIngreso("");
      setCursada("");
      setComision("");
      setHorarioComision("");
      console.log(error);
    }
  };

  const handleCreateVisible = () => {
    setCrearVisible(true);
    setActualizarVisible(false);
    setEliminarVisible(false);
    setApellido("");
    setNombres("");
    setDni("");
    setIngreso("");
    setCursada("");
    setComision("");
    setHorarioComision("");
  };
  const handleActualizarVisible = () => {
    setCrearVisible(false);
    setActualizarVisible(true);
    setEliminarVisible(false);
    setApellido("");
    setNombres("");
    setDni("");
    setIngreso("");
    setCursada("");
    setComision("");
    setHorarioComision("");
  };
  const handleEliminarVisible = () => {
    setCrearVisible(false);
    setActualizarVisible(false);
    setEliminarVisible(true);
    setApellido("");
    setNombres("");
    setDni("");
    setIngreso("");
    setCursada("");
    setComision("");
    setHorarioComision("");
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await client.get("/api/student");
      if (response.data.success) {
        const students = response.data.students;
        let student;
        students.map((el) => {
          if (el.dni === dni) {
            student = el;
          }
        });
        if (student) {
          setLoading(false);
          setApellido(student.apellido);
          setNombres(student.nombres);
          setComision(student.comision);
          setCursada(student.cursada);
          setAlumnoEliminarVisible(true);
          setStudentId(student._id);
        } else {
          setLoading(false);
          setCrearVisible(false);
          setActualizarVisible(false);
          setEliminarVisible(false);
          setAlumnoEliminarVisible(false);
          setApellido("");
          setNombres("");
          setDni("");
          setIngreso("");
          setCursada("");
          setComision("");
          setHorarioComision("");
          alert(
            "no se encontró el alumno, revise el DNI o que el alumno esté en la lista"
          );
        }
      } else {
        setLoading(false);
        setCrearVisible(false);
        setActualizarVisible(false);
        setEliminarVisible(false);
        setAlumnoEliminarVisible(false);
        setApellido("");
        setNombres("");
        setDni("");
        setIngreso("");
        setCursada("");
        setComision("");
        setHorarioComision("");
        alert("No se encontró la lista, vuelva a intentarlo mas tarde");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await client.delete(`/api/student/${studenId}`);
      if (response.data.success) {
        alert("el alumno se eliminó con exito");
        setLoading(false);
        setCrearVisible(false);
        setActualizarVisible(false);
        setEliminarVisible(false);
        setAlumnoEliminarVisible(false);
        setApellido("");
        setNombres("");
        setDni("");
        setIngreso("");
        setCursada("");
        setComision("");
        setHorarioComision("");
      } else {
        setLoading(false);
        setCrearVisible(false);
        setActualizarVisible(false);
        setEliminarVisible(false);
        setAlumnoEliminarVisible(false);
        setApellido("");
        setNombres("");
        setDni("");
        setIngreso("");
        setCursada("");
        setComision("");
        setHorarioComision("");
        alert(
          "Ocurrió un problema en la eliminación, vuelva a intentarlo mas tarde"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
      ) : (
        <>
          <section className="text-gray-600 body-font relative">
            <div className="p-2 w-full">
              <div className="button-container">
                <button
                  onClick={handleCreateVisible}
                  className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  Agregar Alumno
                </button>
                <button
                  onClick={handleActualizarVisible}
                  className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  Editar alumno
                </button>
                <button
                  onClick={handleEliminarVisible}
                  className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  Eliminar alumno
                </button>
              </div>
            </div>
            {crearVisible ? (
              <>
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                      Agregar un alumno a la lista
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                      Ingresar los datos requeridos para agregar un alumno que
                      no se encuentra en la lista
                    </p>
                  </div>
                  <div className="lg:w-1/2 md:w-2/3 mx-auto ">
                    <div className="">
                      <div className="p-2 sm:w-1/2">
                        <div className="relative ">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Apellido
                          </label>
                          <input
                            onChange={(e) => setApellido(e.target.value)}
                            value={apellido}
                            type="text"
                            id="name"
                            name="name"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 sm:w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Nombres
                          </label>
                          <input
                            onChange={(e) => setNombres(e.target.value)}
                            value={nombres}
                            type="text"
                            id="text"
                            name="text"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>

                      {/* ---------------------------------- */}
                      <div className="p-2 sm:w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            DNI
                          </label>
                          <input
                            onChange={(e) => setDni(e.target.value)}
                            value={dni}
                            type="text"
                            id="dni"
                            name="dni"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 sm:w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Ingreso a la carrera
                          </label>
                          <input
                            onChange={(e) => setIngreso(e.target.value)}
                            value={ingreso}
                            type="text"
                            id="ingreso"
                            name="ingreso"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      {/* ---------------------------------- */}
                      <div className="p-2 sm:w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Año de cursada
                          </label>
                          <input
                            onChange={(e) => setCursada(e.target.value)}
                            value={cursada}
                            type="text"
                            id="cursada"
                            name="cursada"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 sm:w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Comisión (ej:"01")
                          </label>
                          <input
                            onChange={(e) => setComision(e.target.value)}
                            value={comision}
                            type="text"
                            id="comision"
                            name="comision"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      {/* ---------------------------------- */}
                      <div className="p-2 sm:w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Horario comisión (ej:"Ma 08:00 a 12:00")
                          </label>
                          <input
                            onChange={(e) => setHorarioComision(e.target.value)}
                            value={horarioComision}
                            type="text"
                            id="horarioComision"
                            name="horarioComision"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>

                      <div className="p-2 sm:w-1/2">
                        <button
                          onClick={handleCreate}
                          className="flex mx-auto text-white bg-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {actualizarVisible ? (
              <>
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                      Actualizar datos
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                      Actualizar los datos de un alumno que ya esta en la lista
                    </p>
                  </div>
                  <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                      <div className="p-2 w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Apellido
                          </label>
                          <input
                            onChange={(e) => setApellido(e.target.value)}
                            value={apellido}
                            type="text"
                            id="name"
                            name="name"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Nombres
                          </label>
                          <input
                            onChange={(e) => setNombres(e.target.value)}
                            value={nombres}
                            type="text"
                            id="text"
                            name="text"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      {/* ---------------------------------- */}
                      <div className="p-2 w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            DNI
                          </label>
                          <input
                            onChange={(e) => setDni(e.target.value)}
                            value={dni}
                            type="text"
                            id="dni"
                            name="dni"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Ingreso a la carrera
                          </label>
                          <input
                            onChange={(e) => setIngreso(e.target.value)}
                            value={ingreso}
                            type="text"
                            id="ingreso"
                            name="ingreso"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      {/* ---------------------------------- */}
                      <div className="p-2 w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Año de cursada
                          </label>
                          <input
                            onChange={(e) => setCursada(e.target.value)}
                            value={cursada}
                            type="text"
                            id="cursada"
                            name="cursada"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Comisión (ej:"01")
                          </label>
                          <input
                            onChange={(e) => setComision(e.target.value)}
                            value={comision}
                            type="text"
                            id="comision"
                            name="comision"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      {/* ---------------------------------- */}
                      <div className="p-2 w-1/2">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Horario comisión (ej:"Ma 08:00 a 12:00")
                          </label>
                          <input
                            onChange={(e) => setHorarioComision(e.target.value)}
                            value={horarioComision}
                            type="text"
                            id="horarioComision"
                            name="horarioComision"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>

                      <div className="p-2 w-full">
                        <button
                          onClick={handleCreate}
                          className="flex mx-auto text-white bg-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                        >
                          Button
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {/* -------------ELIMINAR------------------ */}
            {eliminarVisible ? (
              <>
                <div className="container px-5  mx-auto">
                  <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                      Eliminar un alumno
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                      La opción de busqueda es por DNI
                    </p>
                  </div>
                  <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                      {/* ---------------------------------- */}
                      <div className="p-2 ">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            DNI
                          </label>
                          <input
                            onChange={(e) => setDni(e.target.value)}
                            value={dni}
                            type="text"
                            id="dni"
                            name="dni"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 ">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Apellido
                          </label>

                          {/* ************************************* */}
                          <input
                            onChange={(e) => setApellido(e.target.value)}
                            value={apellido}
                            type="text"
                            id="apellido"
                            name="apellido"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>

                      <div className="p-2 w-full">
                        <button
                          onClick={handleSearch}
                          className="flex mx-auto text-white bg-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                        >
                          Buscar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {alumnoEliminarVisible ? (
                  <>
                    <div className="datosAlumnoEliminarContainer">
                      <h3>DNI: {dni}</h3>
                      <h3>Apellido: {apellido}</h3>
                      <h3>Nombres: {nombres}</h3>
                      <h3>Comisión: {comision}</h3>
                      <h3>Año de cursada: {cursada}</h3>
                    </div>
                    <button
                      onClick={handleDelete}
                      className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                    >
                      Eliminar alumno
                    </button>
                  </>
                ) : null}
              </>
            ) : null}
          </section>
        </>
      )}
    </>
  );
};

export default CrearAlumno;
