import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Students from "./pages/students/Students";
import CrearAlumno from "./pages/CrearAlumno";
import CambioDeComision from "./pages/CambioDeComision";
import ImprimirLista from "./pages/ImprimirLista";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { Link, useNavigate } from "react-router-dom";
import login from "./services/login";
import logout from "./services/logout";
import ProtectedAdminRoute from "./components/utils/ProtectedAdminRoute";
import AdminPanel from "./pages/AdminPanel";
import client from "./api/client";
import ClipLoader from "react-spinners/ClipLoader";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState({});
  const [canActivate, setCanActivate] = useState(false);
  const [adminRoute, setAdminRoute] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const loggedUser = window.localStorage.getItem("user");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      if (user.user.roles === "reader") {
        setCanActivate(true);
      }
      if (user.user.roles === "admin") {
        setAdminRoute(true);
      }

      const fetchUser = async () => {
        setLoading(true);
        if (user.token !== null) {
          const res = await client.get("/api/anato-user/profile", {
            headers: {
              Authorization: `JWT ${user.token}`,
            },
          });

          if (!res.data.verified) {
            setLoading(false);
            console.log("perfil no verificado");
            return;
          }
          if (res.data.success) {
            setLoading(false);
            if (res.data.roles === "admin") {
              navigate("/home");
            }

            if (res.data.roles === "reader") {
              navigate("/home");
            }
          }
        }
      };
      fetchUser();
    } else {
      navigate("/");
      setLoading(false);
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const data = await login({
        email,
        password,
      });

      if (data) {
        // setProfile(data);
        if (data.user.roles === "admin") {
          navigate("/home");
          // setLoading(false);
        }
        if (data.user.roles === "reader") {
          setCanActivate(true);
          navigate("/home");
          // setLoading(false);
        }

        setPassword("");
        setEmail("");
        // setLoading(false);
      } else {
        alert("Email o password incorrectos");
        setPassword("");
        setEmail("");
        // setLoading(false);
      }
    } catch (error) {
      alert("ocurrió un error, vuelva a intentarlo mas tarde");
      // setLoading(false);
      console.log(error);
    }
  };

  const handleHome = () => {
    navigate("/Home");
  };
  const handleLogout = () => {
    setLoading(true);
    setCanActivate(false);
    logout();
    setLoading(false);
  };
  return (
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
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  email={email}
                  password={password}
                  handleOnchangeEmail={(e) => setEmail(e.target.value)}
                  handleOnchangePassword={(e) => setPassword(e.target.value)}
                  handleSubmit={handleSubmit}
                />
              }
            />
            <Route element={<ProtectedRoute canActivate={canActivate} />}>
              <Route
                path="/home/*"
                element={<Home handleLogout={handleLogout} />}
              />
              <Route path="/listas" element={<Students />} />
              <Route path="/crear-alumno" element={<CrearAlumno />} />
              <Route
                path="/cambio-de-comision"
                element={<CambioDeComision />}
              />
              <Route path="/imprimir-lista" element={<ImprimirLista />} />
              <Route element={<ProtectedAdminRoute canActivate={adminRoute} />}>
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
