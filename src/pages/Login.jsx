import { useContext } from "react";
import { useForm } from "react-hook-form";
import "./login.css";
import login from "../services/login";
import { useNavigate } from "react-router-dom";
import { studentContext } from "../context/StudentContext";
const Login = () => {
  const { canActivate, adminRoute, setCanActivate, setIsLoading, user } =
    useContext(studentContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      setIsLoading(true);
      const { email, password } = data;
      const getUser = async () => {
        const res = await login({
          email,
          password,
        });
        console.log("respuesta", res.user.roles);
        if (res.user.roles === "reader") {
          console.log("respuesta en reader", res);
          setCanActivate(true);
          navigate("/home");
        }
      };
      getUser();
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="form-container">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "El email es requerido...",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "El formato del email no es válido",
              },
            })}
          />
          <p> {errors.email?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="text"
            name="password"
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "La contraseña es requerida...",
              },
              minLength: {
                value: 8,
                message: "La contraseña debe tener 8 caracteres",
              },
              maxLength: {
                value: 8,
                message: "La contraseña debe tener 8 caracteres",
              },
            })}
          />
          <p> {errors.password?.message}</p>
        </div>

        <input id="submit" type="submit" name="enviar" />
      </form>
    </div>
  );
};

export default Login;
