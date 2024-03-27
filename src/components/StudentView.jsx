import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

const StudentView = () => {
  const { id } = useParams();
  const [alumno, setAlumno] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getStudent = async () => {
      const response = await client.get(`/api/student/${id}`);
      setAlumno(response.data.student);
    };
    getStudent();
  }, []);
  const handleHome = () => {
    navigate("/home");
  };

  return (
    <section className="text-gray-600 body-font">
      <button
        onClick={handleHome}
        className="flex mx-auto text-white bg-blue-900 border-0 py-2 my-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"
      >
        Home
      </button>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            {alumno.apellido}, {alumno.nombres}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
            Comisión: {alumno.comision}
          </p>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-xl">
            {alumno.horarioComision}
          </p>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-xl">
            DNI: {alumno.dni}
          </p>
        </div>
        {/* <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Plan
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Speed
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Storage
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Price
                </th>
                <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3">Start</td>
                <td className="px-4 py-3">5 Mb/s</td>
                <td className="px-4 py-3">15 GB</td>
                <td className="px-4 py-3 text-lg text-gray-900">Free</td>
                <td className="w-10 text-center">
                  <input name="plan" type="radio" />
                </td>
              </tr>
              <tr>
                <td className="border-t-2 border-gray-200 px-4 py-3">Pro</td>
                <td className="border-t-2 border-gray-200 px-4 py-3">
                  25 Mb/s
                </td>
                <td className="border-t-2 border-gray-200 px-4 py-3">25 GB</td>
                <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                  $24
                </td>
                <td className="border-t-2 border-gray-200 w-10 text-center">
                  <input name="plan" type="radio" />
                </td>
              </tr>
              <tr>
                <td className="border-t-2 border-gray-200 px-4 py-3">
                  Business
                </td>
                <td className="border-t-2 border-gray-200 px-4 py-3">
                  36 Mb/s
                </td>
                <td className="border-t-2 border-gray-200 px-4 py-3">40 GB</td>
                <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                  $50
                </td>
                <td className="border-t-2 border-gray-200 w-10 text-center">
                  <input name="plan" type="radio" />
                </td>
              </tr>
              <tr>
                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                  Exclusive
                </td>
                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                  48 Mb/s
                </td>
                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                  120 GB
                </td>
                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                  $72
                </td>
                <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center">
                  <input name="plan" type="radio" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
          <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            Button
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default StudentView;
