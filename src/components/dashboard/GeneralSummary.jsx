// TableComponent.js

import React, { useEffect } from "react";
import "./GeneralSummary.css";
import { getAllStudents } from "../../services/studentsServices";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const GeneralSummary = () => {
  const [studentsObj, setStudentsOBJ] = useState([
    { name: "general", regulares: [], libres: [], totales: [] },
    { name: "01", regulares: [], libres: [], totales: [] },
    { name: "02", regulares: [], libres: [], totales: [] },
    { name: "03", regulares: [], libres: [], totales: [] },
    { name: "04", regulares: [], libres: [], totales: [] },
    { name: "05", regulares: [], libres: [], totales: [] },
    { name: "06", regulares: [], libres: [], totales: [] },
    { name: "07", regulares: [], libres: [], totales: [] },
    { name: "08", regulares: [], libres: [], totales: [] },
    { name: "09", regulares: [], libres: [], totales: [] },
    { name: "10", regulares: [], libres: [], totales: [] },
  ]);
  const [totalesRegulares, setTotalesRegulares] = useState(0);
  const [totalesLibres, setTotalesLibres] = useState(0);
  const [totales, setTotales] = useState(0);
  const [loading, setLoading] = useState(false);
  const distribution = async () => {
    try {
      setLoading(true);
      const students = await getAllStudents();
      if (students) {
        // -----------------1---------------------
        const com1Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "01"
        );

        const com1Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "01"
        );
        const com1Totales = students.filter((el) => el.comision === "01");

        // -----------------2---------------------
        const com2Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "02"
        );

        const com2Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "02"
        );
        const com2Totales = students.filter((el) => el.comision === "02");

        // ------------3-------------
        const com3Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "03"
        );

        const com3Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "03"
        );
        const com3Totales = students.filter((el) => el.comision === "03");

        // ------------4-------------
        const com4Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "04"
        );

        const com4Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "04"
        );
        const com4Totales = students.filter((el) => el.comision === "04");
        // ------------5-------------

        const com5Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "05"
        );

        const com5Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "05"
        );
        const com5Totales = students.filter((el) => el.comision === "05");
        // ------------6-------------
        const com6Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "06"
        );
        6;
        const com6Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "06"
        );
        const com6Totales = students.filter((el) => el.comision === "06");
        // ------------7-------------
        const com7Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "07"
        );

        const com7Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "07"
        );
        const com7Totales = students.filter((el) => el.comision === "07");
        // ------------8-------------
        const com8Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "08"
        );

        const com8Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "08"
        );
        const com8Totales = students.filter((el) => el.comision === "08");
        // ------------9-------------
        const com9Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "09"
        );
        10;
        const com9Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "09"
        );
        const com9Totales = students.filter((el) => el.comision === "09");
        // ------------10-------------
        const com10Regulares = students.filter(
          (el) => el.roles === "student" && el.comision === "10"
        );

        const com10Libres = students.filter(
          (el) => el.roles !== "student" && el.comision === "10"
        );
        const com10Totales = students.filter((el) => el.comision === "10");
        setStudentsOBJ([
          //   { name: "general", regulares: [], libres: [], totales: [] },
          {
            name: "01",
            regulares: com1Regulares,
            libres: com1Libres,
            totales: com1Totales,
          },
          {
            name: "02",
            regulares: com2Regulares,
            libres: com2Libres,
            totales: com2Totales,
          },
          {
            name: "03",
            regulares: com3Regulares,
            libres: com3Libres,
            totales: com3Totales,
          },
          {
            name: "04",
            regulares: com4Regulares,
            libres: com4Libres,
            totales: com4Totales,
          },
          {
            name: "05",
            regulares: com5Regulares,
            libres: com5Libres,
            totales: com5Totales,
          },
          {
            name: "06",
            regulares: com6Regulares,
            libres: com6Libres,
            totales: com6Totales,
          },
          {
            name: "07",
            regulares: com7Regulares,
            libres: com7Libres,
            totales: com7Totales,
          },
          {
            name: "08",
            regulares: com8Regulares,
            libres: com8Libres,
            totales: com8Totales,
          },
          {
            name: "09",
            regulares: com9Regulares,
            libres: com9Libres,
            totales: com9Totales,
          },
          {
            name: "10",
            regulares: com10Regulares,
            libres: com10Libres,
            totales: com10Totales,
          },
        ]);
        setTotalesRegulares(
          com1Regulares.length +
            com2Regulares.length +
            com3Regulares.length +
            com4Regulares.length +
            com5Regulares.length +
            com6Regulares.length +
            com7Regulares.length +
            com8Regulares.length +
            com9Regulares.length +
            com10Regulares.length
        );
        setTotalesLibres(
          com1Libres.length +
            com2Libres.length +
            com3Libres.length +
            com4Libres.length +
            com5Libres.length +
            com6Libres.length +
            com7Libres.length +
            com8Libres.length +
            com9Libres.length +
            com10Libres.length
        );
        setTotales(students.length);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    distribution();
  }, []);
  return (
    <div className="table-container">
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
        <>
          <table>
            <caption>Visión general</caption>
            <thead>
              <tr>
                <th>Com.</th>
                <th>Reg.</th>
                <th>Lib.</th>
                <th>Tot.</th>
              </tr>
            </thead>
            <tbody>
              {studentsObj.map((student, index) => {
                return (
                  <tr key={index}>
                    <td className="small-cell">{student.name}</td>
                    <td>{student.regulares.length}</td>
                    <td>{student.libres.length}</td>
                    <td>{student.totales.length}</td>
                  </tr>
                );
              })}

              {/* Add more rows as needed */}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>{totalesRegulares}</td>
                <td>{totalesLibres}</td>
                <td>{totales}</td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
};

export default GeneralSummary;
