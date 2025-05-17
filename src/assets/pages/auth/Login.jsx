import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

export const Contenedormain = styled.div`
  font-family: sans-serif;
  position: relative;
  top: 50px;
  height: 100vh;
  width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
  overflow-y: auto;
  margin: auto;
  border-radius: 40px;
  height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const Contenedoricon = styled.div`
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
  width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);

  a {
    color: #ffffff7d;
    text-decoration: none;
    font-size: 10px;
  }

  h3 {
    color: #fff;
    font-family: Raleway;
    font-weight: 400;
    font-size: 15px;

    //animacion

    animation: fadeInUp;
    animation-duration: 1s;
  }
`;

export const Contenedortwe = styled.div`
  color: #ff0000;
`;

export const Img = styled.img`
  position: relative;
  height: 250px;
  width: 250px;
  margin: auto;
  background: #ffffff;
  padding: 5px;
  border-radius: 50%;
  margin: 30px;
  //animacion de imagen

  animation: bounceIn;
  animation-duration: 1s;
`;

export const TextField = styled.input`
  background: #ffffff;
  border: none;
  width: clamp(18.75rem, 14.286rem + 11.905vw, 25rem);
  height: 40px;
  box-sizing: border-box;
  border-radius: 10px;
  padding-left: 30px;
  font-family: sans-serif;

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: gray;
    font-family: sans-serif;
  }
`;

export const Contenedorinput = styled.section`
  position: relative;
  display: grid;
  gap: 20px;
  margin-top: 50px;
  justify-items: center;

  span {
    font-family: sans-serif;
    color: #ffffff;
    padding: 15px;
    a {
      color: #0300c2;
      text-decoration: none;
      text-decoration: underline;
      font-size: 1rem;
      margin-left: 5px;
      font-weight: bold;
    }
  }
`;

export const Boton = styled.button`
  width: 100px;
  height: 35px;
  font-size: 15px;
  text-align: center;
  font-family: sans-serif;
  text-transform: uppercase;
  padding: 10px;
  background-color: #2e5a0a89;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin: 20px 50px;
  transition: all 0.3s ease-in-out;
  color: white;

  &:hover {
    background-color: #2e5a0a;
    transform: scale(1.05);
  }
`;

export const LogoImg = styled.img`
  width: clamp(6.25rem, 1.786rem + 11.905vw, 12.5rem);
  height: clamp(6.25rem, 1.786rem + 11.905vw, 12.5rem);

  //animacion de imagen

  animation: rubberBand;
  animation-duration: 2s;
`;

//sections del home

export const Sectionhome = styled.section`
  position: relative;
  top: 50px;
  background-color: transparent;
  height: 100vh;
  width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
  overflow-y: auto;
  margin: auto;
  border-radius: 40px;
  height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    width: 0;
  }
`;

// Estilos del contenedor del login
export const Contenedorlogin = styled.div`
  border: 1px solid #ffffff83;
  backdrop-filter: blur(10px);
  display: grid;
  justify-items: center;
  font-family: Roboto;
  border-radius: 20px;
  color: #ffffff7d;
  margin: auto;
  height: auto;
  overflow-y: auto;
  width: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Correo incorrecto")
    .required("Correo es requerido"),
  password: Yup.string()
    .min(3, "La contraseña debe tener mínimo 3 caracteres")
    .required("Contraseña es requerida"),
});

export function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Manejo del envío del formulario para inicio de sesión
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si el login es exitoso, procesar el rol
        const { rol } = data;
 // Guarda el estado de login en localStorage
  localStorage.setItem("isLoggedIn", "true");

        toast.success("¡Inicio de sesión exitoso!");

        if (rol === "admin") {
          navigate("/admin-dashboard");
        } else if (rol === "user") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        setErrorMessage(data.message || "Error en el inicio de sesión");
        setErrors({ email: "Correo o contraseña incorrectos" });
      }
    } catch (error) {
      setErrorMessage("Error en la conexión con el servidor");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        background:
          "url(https://img.freepik.com/fotos-premium/sobremesa-madera-vacia-fondo-borroso-abstracto-restaurante-cafe-puede-ser-utilizado-exhibir-o-montar-sus-productos_7191-916.jpg) no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <Contenedorlogin>
        <Contenedoricon>
          <Contenedorinput>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    as={TextField}
                    style={{ margin: 10 }}
                    type="email"
                    name="email"
                    placeholder="Correo"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "#570000", fontFamily: "sans-serif" }}
                  />
                  <Field
                    as={TextField}
                    style={{ margin: 10 }}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "#a00000", fontFamily: "sans-serif" }}
                  />
                  {errorMessage && (
                    <div style={{ color: "white" }}>{errorMessage}</div>
                  )}
                  <Boton type="submit" disabled={isSubmitting}>
                    Ingresar
                  </Boton>
                </Form>
              )}
            </Formik>

            <span>
              ¿Aún no tienes una cuenta?
              <Link to="/">Registrarse</Link>
            </span>
          </Contenedorinput>
        </Contenedoricon>
        <ToastContainer />
      </Contenedorlogin>
    </div>
  );
}
