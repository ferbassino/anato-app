import { useForm } from "react-hook-form";
import { useRef } from "react";
import "./login.css";
const Login = () => {
  const password = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  password.current = watch("password", "");

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
    reset();
  });

  return (
    <div className="form-container">
      <form className="form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="userName">Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            id="userName"
            {...register("userName", {
              required: {
                value: true,
                message: "El nombre de usuario es requerido...",
              },
              minLength: {
                value: 3,
                message:
                  "El nombre de usuario debe tener 3 caracteres como mínimo",
              },
              maxLength: {
                value: 30,
                message:
                  "El nombre de usuario debe tener 30 caracteres como máximo",
              },
            })}
          />
          <p> {errors.userName?.message}</p>
        </div>
        <div>
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
        <div>
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
        <div>
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "La confirmación de la contraseña es requerida...",
              },
              validate: (value) => {
                return (
                  value === password.current ||
                  "Las contraseñas deben ser iguales"
                );
              },
            })}
          />
          <p> {errors.confirmPassword?.message}</p>
        </div>
        <input id="submit" type="submit" name="enviar" />
      </form>
    </div>
  );
};

export default Login;
