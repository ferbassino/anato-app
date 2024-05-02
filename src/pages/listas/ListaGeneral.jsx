import React, { useContext, useState } from "react";
import "./ListaGeneral.css";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import { studentContext } from "../../context/StudentContext";
import VistaLista from "./VistaLista";

const Listageneral = () => {
  const [listaVisible, setVistaVisible] = useState(false);
  const [comision, setComision] = useState("");
  const [alumnosLibresVisible, setAlumnosLibresVisible] = useState(true);

  const handleClick = (e) => {
    setComision(e.target.name);
    setVistaVisible(true);
  };
  const handleListaVisible = () => {
    setVistaVisible(false);
    setComision("");
  };

  const handleLibres = () => {
    setAlumnosLibresVisible(true);
    setVistaVisible(false);
  };

  return (
    <div className="app-container">
      <header>
        <Title />
        <Navbar />
      </header>
      {listaVisible ? (
        <>
          <VistaLista
            comision={comision}
            handleListaVisible={handleListaVisible}
          />
        </>
      ) : (
        <div className="button-grid">
          {/* Primer fila */}
          <div className="row">
            <button
              className="full-width-button"
              name="general"
              onClick={handleClick}
            >
              Lista General
            </button>
          </div>
          {/* Segunda, tercera y cuarta fila */}
          <div className="row">
            <button name="01" onClick={handleClick}>
              COM 1
            </button>
            <button name="02" onClick={handleClick}>
              COM 2
            </button>
            <button name="03" onClick={handleClick}>
              COM 3
            </button>
          </div>
          <div className="row">
            <button name="04" onClick={handleClick}>
              COM 4
            </button>
            <button name="05" onClick={handleClick}>
              COM 5
            </button>
            <button name="06" onClick={handleClick}>
              COM 6
            </button>
          </div>
          <div className="row">
            <button name="07" onClick={handleClick}>
              COM 7
            </button>
            <button name="08" onClick={handleClick}>
              COM 8
            </button>
            <button name="09" onClick={handleClick}>
              COM 9
            </button>
          </div>
          {/* Quinta fila */}
          <div className="row">
            <button name="10" onClick={handleClick}>
              COM 10
            </button>
          </div>
        </div>
      )}
      {/* <div className="search-container">
        <button className="submit-button" onClick={handleLibres}>
          ver alumnos libres
        </button>
      </div> */}
    </div>
  );
};

export default Listageneral;
