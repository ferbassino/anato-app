import "./App.css";
import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateStudent from "./pages/alumnos/CreateStudent";
import CambioDeComision from "./pages/alumnos/CambioDeComision";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import ProtectedAdminRoute from "./components/utils/ProtectedAdminRoute";
import AdminPanel from "./pages/admin/AdminPanel";
import StudentView from "./components/StudentView";
import UpdateStudent from "./pages/alumnos/UpdateStudent";
import DeleteStudent from "./pages/alumnos/DeleteStudent";
import AdminStudent from "./pages/AdminStudent";
import ListaGeneral from "./pages/listas/ListaGeneral";
import SearchStudent from "./pages/alumnos/SearchStudent";
import { studentContext } from "./context/StudentContext";

function App() {
  const { canActivate, adminRoute } = useContext(studentContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute canActivate={canActivate} />}>
        <Route path="/home/*" element={<Home />} />
        <Route path="/listas" element={<ListaGeneral />} />
        <Route path="/crear-alumno" element={<CreateStudent />} />
        <Route path="/admin-student" element={<AdminStudent />} />
        <Route path="/update-student" element={<UpdateStudent />} />
        <Route path="/search-student" element={<SearchStudent />} />
        <Route path="/delete-student" element={<DeleteStudent />} />
        <Route path="/vista-alumno/:id" element={<StudentView />} />
        <Route path="/cambio-de-comision" element={<CambioDeComision />} />
        <Route element={<ProtectedAdminRoute canActivate={adminRoute} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
