import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../api/client";
import "./CrearAlumno.css";
import ClipLoader from "react-spinners/ClipLoader";

import Navbar from "../../components/Navbar";
import StudentNavbar from "../../components/StudentNavbar";
import Title from "../../components/Title";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [condicion, setCondicion] = useState("");
  const [student, setStudent] = useState({});
  const [apellido, setApellido] = useState("");
  const [nombres, setNombres] = useState("");
  const [dni, setDni] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [cursada, setCursada] = useState("");
  const [comision, setComision] = useState("");
  const [horarioComision, setHorarioComision] = useState("");
  const [roles, setRoles] = useState("");
  const [crearVisible, setCrearVisible] = useState(false);
  const [actualizarVisible, setActualizarVisible] = useState(false);
  const [eliminarVisible, setEliminarVisible] = useState(false);
  const [alumnoEliminarVisible, setAlumnoEliminarVisible] = useState(false);
  const [studenId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [updateAlumnoVisible, setUpdateAlumnoVisible] = useState(false);

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
            <header>
              <Title />
              <Navbar />
            </header>
            <StudentNavbar />

            <>
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                    Agregar un alumno a la lista
                  </h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                    Ingresar los datos requeridos para agregar un alumno que no
                    se encuentra en la lista
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

            {/* -------------ELIMINAR------------------ */}
          </section>
        </>
      )}
    </>
  );
};

export default CreateStudent;
