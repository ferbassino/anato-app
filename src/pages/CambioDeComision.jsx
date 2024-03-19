import React, { useEffect, useState } from "react";
import client from "../api/client";
import "./CambioDeComision.css";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
const CambioDeComision = () => {
  const [dNI1, setDNI1] = useState("");
  const [dNI2, setDNI2] = useState("");
  const [alumno1, setAlumno1] = useState("");
  const [alumno1Visible, setAlumno1Visible] = useState(false);
  const [alumno2, setAlumno2] = useState("");
  const [alumno2Visible, setAlumno2Visible] = useState(false);
  const [currentsStudents, setCurrentsStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const encontrarAlumno = async () => {
      try {
        setLoading(true);
        const students = await client.get("api/student");
        setCurrentsStudents(students.data.students);
        // console.log(students.data.students);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      setLoading(false);
    };
    encontrarAlumno();
  }, []);
  // 46294413 ABBONIZIO comisión 1
  // 46556790 AILLOUD comisión 2
  const handleAlumno1 = (e) => {
    e.preventDefault();
    if (dNI1.length !== 8) {
      alert("el DNI debe tener 8 números");
    }
    currentsStudents.map((el) => {
      if (el.dni === dNI1) {
        setAlumno1(el);
        setAlumno1Visible(true);
      }
    });
  };
  const handleAlumno2 = (e) => {
    e.preventDefault();
    currentsStudents.map((el) => {
      if (el.dni === dNI2) {
        setAlumno2(el);
        setAlumno2Visible(true);
      }
    });
  };

  const cambiarComision = () => {
    setLoading(true);
    // id alumno 1, comision de alumno 2
    client
      .put(`api/student/${alumno1._id}`, {
        comision: alumno2.comision,
      })
      .then((response) => {
        if (response.data.success) {
          setLoading(false);
          alert(
            `${response.data.student.apellido}, ${response.data.student.nombres} paso a la comisión ${response.data.student.comision} con exito`
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    // id alumno 2, comision de alumno 1
    client
      .put(`api/student/${alumno2._id}`, {
        comision: alumno1.comision,
      })
      .then((response) => {
        if (response.data.success) {
          setLoading(false);
          alert(
            `${response.data.student.apellido}, ${response.data.student.nombres} paso a la comisión ${response.data.student.comision} con exito`
          );
          setDNI1("");
          setDNI2("");
          setAlumno1("");
          setAlumno1Visible(false);
          setAlumno2("");
          setAlumno2Visible(false);
        }
      })
      .catch((err) => {
        setLoading;
        console.log(err);
      });

    setDNI1("");
    setDNI2("");
    setAlumno1("");
    setAlumno1Visible(false);
    setAlumno2("");
    setAlumno2Visible(false);
    setLoading(false);
  };
  const cancelar = () => {
    setDNI1("");
    setDNI2("");
    setAlumno1("");
    setAlumno1Visible(false);
    setAlumno2("");
    setAlumno2Visible(false);
  };

  return (
    <>
      <>
        {loading ? (
          <div className="spinner-container">
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
            <h2>Cambio de comisión</h2>
            <p>
              Para realizar el cambio de comisión se debe contar con los dni de
              los dos alumnos interesados en el cambio
            </p>
            <p>
              1. Ingresar el DNI del primer alumno y hacer clik en enviar para
              buscarlo
            </p>
            <form onSubmit={handleAlumno1}>
              <div className="dni1">
                <label>
                  DNI:{" "}
                  <input
                    value={dNI1}
                    type="number"
                    onChange={(e) => setDNI1(e.target.value)}
                  />
                </label>

                <input className="input-dni1" type="submit" value="Enviar" />
              </div>
            </form>
            <div>
              {alumno1Visible ? (
                <>
                  <div>
                    <p>Datos del alumno 1</p>
                    <table>
                      <colgroup span="4" className="columns"></colgroup>
                      <thead>
                        <tr>
                          <th>Apellido</th>
                          <th>Nombres</th>
                          <th>Comisión</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{alumno1.apellido}</td>
                          <td>{alumno1.nombres}</td>
                          <td>{alumno1.comision}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>
                    2. Ingrese el dni del segundo alumno y hacer clik en enviar
                    para buscarlo
                  </p>
                  <form onSubmit={handleAlumno2}>
                    <div className="dni1">
                      <label>
                        DNI:{" "}
                        <input
                          value={dNI2}
                          type="number"
                          onChange={(e) => setDNI2(e.target.value)}
                        />
                      </label>
                      <input type="submit" value="Enviar" />
                    </div>
                  </form>
                  {alumno2Visible ? (
                    <>
                      <p>Datos del alumno 2</p>
                      <table>
                        <colgroup span="4" className="columns"></colgroup>
                        <thead>
                          <tr>
                            <th>Apellido</th>
                            <th>Nombres</th>
                            <th>Comisión</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{alumno2.apellido}</td>
                            <td>{alumno2.nombres}</td>
                            <td>{alumno2.comision}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="advertencia_Container">
                        <h1>Confirme los datos:</h1>
                        <h3>
                          {alumno1.apellido}, {alumno1.nombres} de la comisión{" "}
                          {alumno1.comision} va a pasar a la comisión{" "}
                          {alumno2.comision}
                        </h3>
                        <h3>
                          Y {alumno2.apellido}, {alumno2.nombres} de la comisión{" "}
                          {alumno2.comision} va a pasar a la comisión{" "}
                          {alumno1.comision}
                        </h3>
                      </div>
                      <p>
                        3. Una vez confirmado los datos hacer clik en "cambiar"
                        para realizar el cambio de comisión o "cancelar para
                        resetear el formulario"
                      </p>
                      <div className="button-container">
                        <button
                          className="button"
                          type="button"
                          onClick={cambiarComision}
                        >
                          cambiar
                        </button>
                        <button
                          className="button"
                          type="button"
                          onClick={cancelar}
                        >
                          cancelar
                        </button>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </div>{" "}
          </>
        )}
      </>
    </>
  );
};

export default CambioDeComision;
