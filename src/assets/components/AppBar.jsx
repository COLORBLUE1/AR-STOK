import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router";

const Navbar = styled.nav`
  background: #000000b7;
  height: 0;
  color: #ffffff;
  display: flex;
  padding: 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  justify-content: space-between;
  
  ul {
    display: flex;
    margin: 0;
    gap: 30px;
    justify-content: center;
    align-items: center;
    .ingresar {
      a {
        background: #02c5fb;
        color: #ffffff;
        padding: 0.2rem 0.2rem;
        border-radius: 15px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        width: 100px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn;
        animation-duration: 1s;
        transition: all 0.1s;
        font-family: nunito;

        &:hover {
          background: #00eeff;
          scale: 1.1;
          color: #4e4e4e;
        }
      }
    }
   a {
        color: #ffffff;

     li {
       cursor: pointer;
       font-family: nunito;
       font-size: 1.1rem;
       font-weight: bold;
       text-transform: uppercase;
       transition: color 0.3s;
       
       &:hover {
         color: #5ea4ff;
        }
        
       
      }
    }
     img{
          width: 30px;
          height: 30px;
          
          &:hover {
            scale: 1.1;
            transition: all 0.1s;
          }
        }
    }
`;

const AppBar = () => {
const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(logged);
    console.log("Hola", logged);
  }, []);


  return (
    <Navbar>
      <ul>
        <Link to="/"><li>Inicio</li></Link>
        <Link to="/nosotros"> <li>Sobre nosotros</li></Link>
        <Link to="/nosotros"><li>Servicios</li></Link>
      </ul>
      <ul>
        <li><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5UlEQVR4nO2bu2tUQRSHz2piEHwgCoKISMSAnWCholj6aGKh/gEWgo1CCgkiPkHciC+wUrNrZeNfIKiNhRALCxVE0WiioOimERED6idDJpuTdRfj3nO9dzL3g4HLsMyZ89uzM+fM3BUpKCgoKJgA6AGOAP0NzfX1yGwHeE1rXknkAiCzHWAtcBwoqxaPAM0oBJhOf2DtALBSDAUIkR/AeWBurAJMctVCgHJAbQB4oOb+C1ifSAAJDGAOcEe5cDoqARzAYeXCNYlQgKpy4VhUAgCdwJhyYVNsAuxS0x8FSrEJUFXTv9DuIHUk7PDfGJsAOxOHf+ACVNTULyYZqI6EFf61RKv/JIEKYBP+AQtgE/4hCmAa/oEKsENN+V2i8A9UgEE15UsWA9aRnAN0AJ+mZszm2ATYbhr+AQpwwzT8QxIglfAPTAD78HcA437QcckxwHUlwBXLgcvAV+Cc5Dv8PysBtkhMMD3837vTYIkJ4J4S4LLEBLC/4fJjncQAMB84CvxUAlTSNFgCtgF9Gd/4ngFuAx/0Fg08ARal5Xw38Ij88hBYnpbzy4AR8smov/rqSMV5hztRUQa/+3Izy1vfk8BBd8zd9p3/vwC8UQLskdhgKhV2LJDYYHoE7JXY4M81oPIftrpD7jAzFykt2e4CT4GtWWsgPg8YykgEtwb1Zq2BNGSCaW91t4AvSgT3vEJiAlgNDCe+3w8ZoFcJ8DxPP4E+/1xK2eZiX+I6vqVpq91iyPV1iwGumPEp7qqG/vve1l0LO2lsgyPuMwbf9As/3lsdWUAXsAGYZ+KQUTE06J9NFijglBrrYy4SoL8VQy4tVv3DkgB/mNE03fZvertT6YEkNsyLIWChjoyENmotbHQp++61986k/pgVQ8A+wwh4NgMbY0l9sSyGqsZrwNkZ2Lhp55X9LrA0oY0lfvVvRa1xe8xLMTRkmAesAR43sfGyrT86hJgJMvEHB3fNdcJvjbvTXvh+A3MqXsKiTzAtAAAAAElFTkSuQmCC" alt="shopping-cart--v1" /></li>
        {!isLoggedIn && (
          <li className="ingresar">
            <Link to={"/Login"}>acceder</Link>
          </li>
        )}
      </ul>
    </Navbar>
  );
};

export default AppBar;
