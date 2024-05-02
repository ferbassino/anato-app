import React from "react";

const VistaExamen = () => {
  return (
    <div>
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
              {students.map((el, index) => (
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
    </div>
  );
};

export default VistaExamen;
