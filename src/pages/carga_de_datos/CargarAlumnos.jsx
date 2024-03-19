import React from "react";
import ReactFileReader from "react-file-reader";
import client from "../../api/client";
const CargarAlumnos = () => {
  // const getStudents = async () => {
  //   const students = await client.get("api/student");
  // };
  // getStudents();
  const uploadVerticalFile = (file) => {
    let read = new FileReader();
    read.onload = function (e) {
      const rawData = read.result;

      const data = rawData.split("\n");
      const rows = data.map((el) => el.split(","));

      const studentData = rows.map((el, index) => {
        return el[4]
          .split(" / ")
          .concat(el[3].slice(4).replace("-", ""))
          .concat(el[5].replace('"', ""))
          .concat(el[6].replace('"', ""))
          .concat(el[7]);
      });

      try {
        studentData.map(async (el) => {
          const response = await client.post("api/student", {
            dni: el[0],
            ingreso: el[1],
            apellido: el[3],
            nombres: el[4],
            comision: el[2],
            horarioComision: el[5],
            roles: "student",
          });
          console.log(response);
        });
      } catch (error) {
        console.log(error);
      }
    };
    read.readAsText(file[0]);
  };
  return (
    <>
      <ReactFileReader handleFiles={uploadVerticalFile} fileTypes={".csv"}>
        <button className="flex mx-auto mt-10 text-white bg-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg">
          cargar
        </button>
      </ReactFileReader>
    </>
  );
};

export default CargarAlumnos;
