import React, { useEffect, useRef, useState } from "react";
import "./VistaLista.css";
import { useReactToPrint } from "react-to-print";
import { getAllStudents } from "../../services/studentsServices";
import { ClipLoader } from "react-spinners";

const VistaLista = ({ comision, handleListaVisible }) => {
  const [comisionEnVistaGeneralVisible, setComisionEnVistaGeneralVisible] =
    useState(false);
  const [currentStudents, setCurrentStudents] = useState([]);
  const [vistaPdfVisible, setVistaPdfVisible] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
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
          if (comision === el.comision && el.roles === "student") {
            listaActual.push(el);
          } else if (comision === "general" && el.roles === "student") {
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
