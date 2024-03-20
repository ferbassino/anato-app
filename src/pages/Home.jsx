import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Route, Routes } from "react-router-dom";

import Students from "./students/Students";
import CambioDeComision from "./CambioDeComision";
import CrearAlumno from "./CrearAlumno";
import ImprimirLista from "./ImprimirLista";
import logout from "../services/logout";
import ProtectedRoute from "../components/utils/ProtectedRoute";
import CargarAlumnos from "./carga_de_datos/CargarAlumnos";
import HomeComponent from "../components/HomeComponent";

const Home = ({ handleLogout }) => {
  const [listasVisible, setListasVisible] = useState(false);
  const [crearAlumnoVisible, setCrearAlumnoVisible] = useState(false);
  const [cambioVisible, setCambioVisible] = useState(true);
  const [homeVisible, setHomeVisible] = useState(false);
  const handleLogin = () => {
    setVisible(true);
  };
  const mainNavigation = [
    { name: "Dashboard", to: "#", current: true },
    { name: "Listas", to: "/listas", current: true },
    { name: "Gestionar alumno", to: "/crear-alumno", current: true },
    { name: "Cambio de comisión", to: "/cambio-de-comision", current: true },
    // { name: "Imprimir lista", to: "/imprimir-lista", current: true },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const handleCrear = () => {
    setHomeVisible(false);
    setCrearAlumnoVisible(true);
    setListasVisible(false);
    setCambioVisible(false);
  };
  const handleListas = () => {
    setHomeVisible(false);
    setCrearAlumnoVisible(false);
    setListasVisible(true);
    setCambioVisible(false);
  };
  const handleCambio = () => {
    setHomeVisible(false);
    setCrearAlumnoVisible(false);
    setListasVisible(false);
    setCambioVisible(true);
  };
  const handleHome = () => {
    setHomeVisible(true);
    setCrearAlumnoVisible(false);
    setListasVisible(false);
    setCambioVisible(false);
  };

  return (
    <>
      <div>
        {/************** navbar general ***************/}

        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {/* <button
                          onClick={handleHome}
                          className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
                        >
                          Dashboard
                        </button> */}
                        <button
                          onClick={handleListas}
                          className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
                        >
                          Listas
                        </button>
                        <button
                          disabled
                          onClick={handleCrear}
                          className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
                        >
                          Gestionar Alumno
                        </button>
                        <button
                          onClick={handleCambio}
                          className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
                        >
                          Cambio de comisión
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <span onClick={handleLogout} className="text-white">
                      Logout
                    </span>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {/* <button
                    onClick={handleHome}
                    className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
                  >
                    Dashboard
                  </button> */}
                  <button
                    onClick={handleListas}
                    className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
                  >
                    Listas
                  </button>
                  <button
                    disabled
                    onClick={handleCrear}
                    className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
                  >
                    Gestionar Alumno
                  </button>
                  <button
                    onClick={handleCambio}
                    className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
                  >
                    Cambio de comisión
                  </button>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* ****************fin navbar general ********/}
      </div>
      {/* {homeVisible ? (
        <>
          <HomeComponent />
        </>
      ) : null} */}
      {listasVisible ? (
        <>
          <Students />
        </>
      ) : null}
      {crearAlumnoVisible ? (
        <>
          <CrearAlumno />
        </>
      ) : null}
      {cambioVisible ? (
        <>
          <CambioDeComision />
        </>
      ) : null}
      {/* <CargarAlumnos /> */}
    </>
  );
};

export default Home;
