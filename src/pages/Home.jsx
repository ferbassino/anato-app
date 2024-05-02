import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import logout from "../services/logout";
import { useNavigate } from "react-router-dom";
import { studentContext } from "../context/StudentContext";
import Title from "../components/Title";
import "./Home.css";
import { getAllStudents } from "../services/studentsServices";
import GeneralSummary from "../components/dashboard/GeneralSummary";
import { ClipLoader } from "react-spinners";
const Home = () => {
  const { setCanActivate, setIsLoading, user } = useContext(studentContext);
  const navigate = useNavigate();
  const [alumnosActivos, setAlumnosActivos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClic = () => {
    setIsLoading(true);
    setCanActivate(false);
    logout();
    setIsLoading(false);
    navigate(`/`);
  };

  const getActivesStudents = async () => {
    try {
      // setLoading(true);
      const students = await getAllStudents();
      if (students) {
        const activeStudents = students.filter((el) => el.roles === "student");
        // setLoading(false);
        return activeStudents;
      } else {
        alert("error al buscar alumnos");
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getActivesStudents();
  }, []);

  return (
    <div className="app-container">
      <header>
        <Title />
        <Navbar />
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
            <GeneralSummary />
          </>
        )}

        <button onClick={handleClic}>logout</button>
      </header>
    </div>
  );
};

export default Home;
