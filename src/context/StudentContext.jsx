import React, { useState, useEffect, createContext } from "react";
import { getAllStudents } from "../services/studentsServices";
import { initialStudent } from "../services/initialStudent";
import { initialUser } from "../services/initialUser";
import client from "../api/client";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
export const studentContext = createContext([initialStudent]);

export const AnatoContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canActivate, setCanActivate] = useState(false);
  const [adminRoute, setAdminRoute] = useState(false);
  const [user, setUser] = useState(initialUser);

  const fetchUser = async (user) => {
    setIsLoading(true);
    if (user.token !== null) {
      const res = await client.get("/api/anato-user/profile", {
        headers: {
          Authorization: `JWT ${user.token}`,
        },
      });

      if (!res.data.verified) {
        setIsLoading(false);

        return;
      }
      if (res.data.success) {
        setUser(res.data.user);
        setIsLoading(false);
        if (res.data.roles === "admin") {
          navigate("/home");
        }

        if (res.data.roles === "reader") {
          navigate("/home");
        }
      }
    } else {
      navigate("/");
      setIsLoading(false);
    }
  };

  //

  const fetchData = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const loggedUser = window.localStorage.getItem("user");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      if (user.user.roles === "reader") {
        setCanActivate(true);
      }
      if (user.user.roles === "admin") {
        setAdminRoute(true);
      }
      fetchUser(user);
    }

    fetchData();
  }, []);

  return (
    <studentContext.Provider
      value={{
        students,
        isLoading,
        canActivate,
        setCanActivate,
        setIsLoading,
        error,
        setError,
        user,
      }}
    >
      {isLoading ? (
        <>
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
        </>
      ) : (
        <> {children}</>
      )}
    </studentContext.Provider>
  );
};
