import React, { useContext, useState } from "react";
import "./SearchStudent.css";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import StudentNavbar from "../../components/StudentNavbar";
import { studentContext } from "../../context/StudentContext";

const SearchStudent = () => {
  const { students } = useContext(studentContext);
  const [dni, setDni] = useState("");
  const [student, setStudent] = useState({});
  const [apellido, setApellido] = useState("");
  const [vistaDNIVisible, setVistaDNIVisible] = useState(false);
  const [vistaApellidoVisible, setVistaApellidoVisible] = useState(false);
  const [vistaAlumnoVisible, setVistaAlumnoVisible] = useState(false);
  const [busquedaVisible, setBusquedaVisible] = useState(false);
  const [studentApellidoArray, setStudentApellidoArray] = useState({});
  const [coincidencias, setCoincidencias] = useState(0);
  const [vistaTablaAlumnosVisible, setVistaTablaAlumnosVisible] =
    useState(false);
  const [optionsVisible, setOptionsVisible] = useState(true);

  const handleDNI = () => {
    if (dni.length !== 8) {
      alert("el DNI debe tener 8 números");
      return;
    }
    let countDNI = 0;

    students.map((student) => {
      if (student.dni === dni) {
        countDNI += 1;
        setStudent(student);
      }

      setVistaAlumnoVisible(true);
      setVistaDNIVisible(false);
    });
    // 42246562;

    if (countDNI < 1) {
      alert("El DNI no se encontró entre los alumnos");
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
      setStudent({});

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
        setVistaTablaAlumnosVisible(true);
        setVistaApellidoVisible(false);
        // setStudentApellidoVisible(true);
        // setInputBusquedaVisible(false);
      }
    });
    if (array < 1) {
      alert("No se encontraron alumnos con ese apellido");
    }
  };

  const handleVistaDNI = () => {
    setVistaDNIVisible(true);
    setBusquedaVisible(true);
    setVistaApellidoVisible(false);
    setOptionsVisible(false);
  };
  const handleVistaApellido = () => {
    setOptionsVisible(false);
    setVistaApellidoVisible(true);
    setVistaDNIVisible(false);
    setBusquedaVisible(true);
    setVistaTablaAlumnosVisible(false);
    setVistaAlumnoVisible(false);
  };
  const handleReset = () => {
    setOptionsVisible(true);
    setVistaAlumnoVisible(false);
    setVistaApellidoVisible(false);
    setVistaDNIVisible(false);
    setBusquedaVisible(false);
    setDni("");
    setStudent({});
    setStudentApellidoArray({});
    setCoincidencias(0);
    setVistaTablaAlumnosVisible(false);
  };
  // 46294413;
  return (
    <div className="app-container">
      <header>
        <Title />
        <Navbar />
      </header>
      <StudentNavbar />
      {/* Title and subtitle */}
      <div className="title">
        <h3>Buscar Alumno</h3>
      </div>
      {optionsVisible ? (
        <>
          <div className="button-container">
            <button className="blue-button" onClick={handleVistaDNI}>
              por DNI
            </button>
            <button className="blue-button" onClick={handleVistaApellido}>
              por apellido
            </button>
          </div>
        </>
      ) : null}

      {/* Search bar */}
      {vistaDNIVisible ? (
        <>
          <div className="search-container">
            <label htmlFor="search">Buscar:</label>
            <input
              type="text"
              id="search"
              placeholder="Ingresar DNI"
              onChange={(e) => setDni(e.target.value)}
            />
            <button className="submit-button" onClick={handleDNI}>
              Enviar
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      {vistaApellidoVisible ? (
        <>
          <div className="search-container">
            <label htmlFor="search">Buscar:</label>
            <input
              type="text"
              id="search"
              placeholder="Ingresar Apellido"
              onChange={(e) => setApellido(e.target.value)}
            />
            <button className="submit-button" onClick={handleApellido}>
              Enviar
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      {vistaAlumnoVisible ? (
        <>
          <div className="title">
            <p>Apellido: {student.apellido}</p>
            <p>Nombres: {student.nombres}</p>
            <p>Comisión: {student.comision}</p>
            {student.roles === "student" ? (
              <>
                <p>Condición: Regular</p>
              </>
            ) : null}
            {student.roles === "libre" ? (
              <>
                <p>Condición: libre</p>
              </>
            ) : null}

            {/* <p>Subtitle 3</p>
        <p>Subtitle 4</p>
        <p>Subtitle 5</p> */}
          </div>
        </>
      ) : (
        ""
      )}
      {vistaTablaAlumnosVisible ? (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Apellido</th>
                  <th>Nombres</th>
                  <th>DNI</th>
                  <th>Comisión</th>
                </tr>
              </thead>
              <tbody>
                {studentApellidoArray.map((item, index) => (
                  <tr key={index}>
                    <td>{item.apellido}</td>
                    <td>{item.nombres}</td>
                    <td>{item.dni}</td>
                    <td>{item.comision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ""
      )}

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
  );
};

export default SearchStudent;
