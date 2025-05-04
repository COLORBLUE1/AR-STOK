import { useNavigate } from "react-router";
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
    font-size: 25px;

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
  padding: 20px;

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: gray;
    font-family: Raleway;
  }
`;

export const Contenedorinput = styled.section`
  position: relative;
  display: grid;
  gap: 20px;
  margin-top: 50px;
  justify-items: center;
`;

export const Boton = styled.button`
  width: 350px;
  height: 50px;
  font-size: clamp(1.25rem, 0.804rem + 1.19vw, 1.875rem);
  text-align: center;
  font-family: sans-serif;
  padding: 10px;
  background-color: #a5a5a5;
  border: none;
  border-radius: 50px;
  color: black;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
  color: white;
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
  background: #2af1ff;
  display: grid;
  justify-items: center;
  width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
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

        toast.success("¡Inicio de sesión exitoso!");

  
        if (rol === "admin") {
          navigate("/admin-dashboard"); 
        } else if (rol === "guia") {
          navigate("/Lugar-dashboard"); 
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
        background: "rgb(238,174,206)",
        background: "radial-gradient(circle, rgba(238,174,206,1) 0%, rgba(132,101,247,1) 100%)"
            }}
    >
      <Contenedorlogin>
        <Contenedoricon>
          <p
            style={{
              fontSize: "20px",
              color: "#000000",
              fontFamily: "arial",
              fontWeight: 400,
            }}>VIVE UNA NUEVA EXPERIENCIUA EN CALI</p>
          <Contenedorinput>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "#fff" }}
                  />
                  <Field
                    as={TextField}
                    style={{ margin: 10 }}
                    type="email"
                    name="email"
                    placeholder="correo"
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "#fff" }}
                  />
                  <Field
                    as={TextField}
                    style={{ margin: 10 }}
                    type="password"
                    name="password"
                    placeholder="contraseña"
                  />

                  {errorMessage && (
                    <div style={{ color: "white" }}>{errorMessage}</div>
                  )}
                  <Boton type="submit" disabled={isSubmitting}>
                    ¡Iniciar sesión!
                  </Boton>
                </Form>
              )}
            </Formik>
          </Contenedorinput>
        </Contenedoricon>
        <ToastContainer />
      </Contenedorlogin>
    </div>
  );
}
