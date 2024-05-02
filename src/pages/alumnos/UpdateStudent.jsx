import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import StudentNavbar from "../../components/StudentNavbar";
import { useNavigate } from "react-router-dom";
import client from "../../api/client";
import Title from "../../components/Title";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [apellido, setApellido] = useState("");
  const [nombres, setNombres] = useState("");
  const [dni, setDni] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [cursada, setCursada] = useState("");
  const [comision, setComision] = useState("");
  const [horarioComision, setHorarioComision] = useState("");
  const [roles, setRoles] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateAlumnoVisible, setUpdateAlumnoVisible] = useState(false);

  const handleReset = () => {
    setStudent({});
    setDni("");
    setApellido("");
    setNombres("");
    setCursada("");
    setComision("");
    setHorarioComision("");
    setUpdateAlumnoVisible(false);
  };
  const handleSearchAlumno = async () => {
    if (dni.length !== 8) {
      alert("el DNI debe tener 8 números");
      return;
    }
    const arrayDni = [];
    let student;
    try {
      setLoading(true);
      const getAllStudents = async () => {
        const response = await client.get("/api/student");
        if (response.data.success) {
          const students = response.data.students;
          students.map((student) => {
            if (student.dni === dni) {
              arrayDni.push(student);
            }
          });

          student = arrayDni[0];
          if (arrayDni.length < 1) {
            alert("El DNI no se encontró entre los alumnos");
            setDni("");
            setLoading(false);
            return;
          } else {
            setStudent(student);
            setLoading(false);
            setUpdateAlumnoVisible(true);
            setApellido(student.apellido);
            setNombres(student.nombres);
            setCursada(student.cursada);
            setComision(student.comision);
            setHorarioComision(student.horarioComision);
          }
        }

        if (arrayDni.length < 1) {
          alert("El DNI no se encontró entre los alumnos");
          setLoading(false);
          return;
        }

        return student;
      };
      getAllStudents();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const modificarDatosAlumno = async () => {
    setLoading(true);
    try {
      const response = await client.put(`api/student/${student._id}`, {
        comision: comision,
        dni: student.dni,
        ingreso: student.ingreso,
        apellido: student.apellido,
        nombres: student.nombres,
        horarioComision: horarioComision,
        cursada: student.curdada,
        roles: roles,
      });
      if (response.data.success) {
        setStudent({});
        setApellido("");
        setNombres("");
        setDni("");
        setIngreso("");
        setCursada("");
        setComision("");
        setHorarioComision("");
        setLoading(false);
        alert(
          `Bien ahí!!! se actualizó la información de  ${student.apellido}, ${student.nombres}.`
        );
      }
    } catch (error) {
      alert(`Ocurrió un error, vuelva a intentarlo mas tarde`);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <Title />
        <Navbar />
      </header>
      <StudentNavbar />
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
            {updateAlumnoVisible ? (
              <>
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
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Condición
                      </label>
                      <input
                        onChange={(e) => setRoles(e.target.value)}
                        value={roles}
                        type="text"
                        id="horarioComision"
                        name="horarioComision"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={modificarDatosAlumno}
                  className="mt-3 flex mx-auto text-white bg-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  Actualizar
                </button>
                <button
                  onClick={handleReset}
                  className="mt-3 flex mx-auto text-white bg-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  Nueva Búsqueda
                </button>
              </>
            ) : (
              <>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Ingresar el DNI del alumno
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
                  <button
                    onClick={handleSearchAlumno}
                    className="mt-3 flex mx-auto text-white bg-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  >
                    Buscar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default UpdateStudent;
