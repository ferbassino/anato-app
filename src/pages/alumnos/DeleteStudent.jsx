import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import StudentNavbar from "../../components/StudentNavbar";
import { useNavigate } from "react-router-dom";
import client from "../../api/client";
import Title from "../../components/Title";

import "./DeleteStudent.css";
import { getAllStudents } from "../../services/studentsServices";

import { ClipLoader } from "react-spinners";
import Card from "../../components/Card";
const DeleteStudent = () => {
  const [student, setStudent] = useState({});
  const [dni, setDni] = useState("");
  const [alumnoVisible, setAlumnoVisible] = useState(false);
  const [busquedaVisible, setBusquedaVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [buscarAlumnoVisible, setBuscarAlumnoVisible] = useState(true);
  const [nuevaBusquedaVisible, setNuevaBusquedaVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  // 46294413;
  const handleSearch = async () => {
    if (dni.length !== 8) {
      alert("el DNI debe tener 8 números");
      return;
    }
    try {
      setLoading(true);
      const students = await getAllStudents();
      if (students.length > 0) {
        const currentStudent = students.find((student) => student.dni === dni);
        setStudent(currentStudent);
        setStudentId(currentStudent._id);
        setBuscarAlumnoVisible(false);
        setNuevaBusquedaVisible(true);
        setLoading(false);
        setAlumnoVisible(true);
      } else {
        setLoading(false);
        alert("no existen alumnos con ese DNI");
      }
    } catch (error) {
      alert("ocurrió un error vuelva a intentarlo mas tarde");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await client.put(`api/student/${studentId}`, {
        roles: "libre",
      });
      if (response.data.success) {
        const response = await client.get(`api/student/${studentId}`);
        setLoading(false);
        setStudent(response.data.student);
        setStudentId(response.data.student._id);
        setMessageVisible(true);
        setMessage(
          `${student.apellido}- ${student.nombres} pasó a la condición de "LIBRE" con éxito`
        );
        setTimeout(() => {
          setMessage("");
          setMessageVisible(false);
        }, 5000);
      }
    } catch (error) {
      alert("ocurrió un error vuelva a intentarlo mas tarde");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleComeBack = async () => {
    try {
      setLoading(true);
      const response = await client.put(`api/student/${studentId}`, {
        roles: "student",
      });
      if (response.data.success) {
        const response = await client.get(`api/student/${studentId}`);
        setLoading(false);
        setStudent(response.data.student);
        setStudentId(response.data.student._id);
        setMessageVisible(true);
        setMessage(
          `${student.apellido}- ${student.nombres} pasó a la condición de "REGULAR" con éxito`
        );
        setTimeout(() => {
          setMessage("");
          setMessageVisible(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDni("");
    setStudent({});
    setAlumnoVisible("");
  };

  const handleNuevaBusqueda = () => {
    setBuscarAlumnoVisible(true);
    setNuevaBusquedaVisible(false);
    handleReset();
  };
  return (
    <div className="app-container">
      <header>
        <Title />
        <Navbar />
      </header>
      <StudentNavbar />
      <>
        {loading ? (
          <div id="hashLoader">
            <ClipLoader
              color="#81a1fc"
              loading={loading}
              // cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            {messageVisible ? (
              <>
                <Card text={message} />
              </>
            ) : (
              <>
                <div className="container">
                  {buscarAlumnoVisible ? (
                    <>
                      <div className="header">
                        <h1>Desactivar Alumno</h1>
                        <h2>
                          Función para cambiar el estado de un alumno de regular
                          a libre.
                        </h2>
                        <p>También se podrá restaurar a regular.</p>
                      </div>
                      <div className="form">
                        <div className="form-group">
                          <label htmlFor="input1">Ingresar DNI</label>
                          <input
                            type="text"
                            id="input1"
                            onChange={(e) => setDni(e.target.value)}
                          />
                        </div>

                        <input
                          type="submit"
                          value="Buscar alumno"
                          className="submit-btn"
                          onClick={handleSearch}
                        />
                      </div>
                    </>
                  ) : null}
                  {nuevaBusquedaVisible ? (
                    <div id="nuevaBusqueda">
                      <input
                        type="submit"
                        value="Nueva Búsqueda"
                        className="submit-btn"
                        onClick={handleNuevaBusqueda}
                      />
                    </div>
                  ) : null}

                  {alumnoVisible ? (
                    <>
                      <div className="cardDelete">
                        <h3>Datos del alumno</h3>
                        <ul>
                          <li>DNI: {student.dni}</li>
                          <li>Apellido: {student.apellido}</li>
                          <li>Nombres: {student.nombres}</li>
                          <li>Comisión: {student.comision}</li>
                          <li>Horarios: {student.horarioComision}</li>
                          <li>Año de cursada: {student.cursada}</li>
                          {student.roles === "student" ? (
                            <li>
                              Condición
                              <span
                                style={{ color: "green", fontWeight: "bold" }}
                              >
                                Regular
                              </span>
                            </li>
                          ) : null}
                          {student.roles === "libre" ? (
                            <li>
                              Condición
                              <span
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                Libre
                              </span>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                      <div className="footer">
                        {student.roles === "student" ? (
                          <>
                            <input
                              type="submit"
                              value="Desactivar"
                              className="submit-btn"
                              onClick={handleDelete}
                            />
                          </>
                        ) : null}
                        {student.roles === "libre" ? (
                          <>
                            <input
                              type="submit"
                              value="Reestablecer"
                              className="submit-btn"
                              onClick={handleComeBack}
                            />
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                  {/* Button below */}
                  {busquedaVisible ? (
                    <>
                      <div className="button-container">
                        <button onClick={handleReset} className="blue-button">
                          Nueva búsqueda
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default DeleteStudent;
