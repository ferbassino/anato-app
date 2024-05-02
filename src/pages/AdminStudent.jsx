import React from "react";
import StudentNavbar from "../components/StudentNavbar";
import Navbar from "../components/Navbar";
import Title from "../components/Title";

const AdminStudent = () => {
  return (
    <div className="app-container">
      <header>
        <Title />
        <Navbar />
      </header>
      <StudentNavbar />
    </div>
  );
};

export default AdminStudent;
