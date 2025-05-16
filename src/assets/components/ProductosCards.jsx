import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom"; // Correcto: 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Styled Components
const SectionService = styled.section`
  padding: 10px 20px;
  text-align: center;
`;

// Styled Components
const Slidercont = styled.section`
  display: flex;
  gap: 30px;
`;



const CarouselWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Card = styled.div`
  box-shadow: 0 0 4px 4px rgb(0 0 0 / 25%);
  background-color: #fff;
  border-radius: 10px;
  width: 200px !important;
  height: 250px !important;
  padding: 20px;
  margin: 10px auto;
  text-align: center;



  h3 {
    margin: 15px 0;
    font-size: 1.2rem;
  }

  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }

  button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.1s ;

    img{
      width: 15px;
      height: 15;
    }

    &:active{
      background-color: red;
    }
  }



  a {
  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 10px;
    transition: all 1s ;
    &:hover {
     scale: 1.1;
   }
  }
  }
 transition: all 1s ;
 
    &:hover {
     scale: 1.1;
   }
`;

export function ProductosCards({tipo}) {
  const [tiposPescados, setTiposPescados] = useState([]);

  useEffect(() => {
    AOS.init();
    fetchTiposPescados();
  }, []);

  const fetchTiposPescados = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pescados");
      const data = await response.json();
      // Filtrar solo los que son tipo "Filete"
      const filetes = data.filter((item) => item.tipo === tipo
      );
      setTiposPescados(filetes);
    } catch (error) {
      console.error("Error al obtener pescados:", error);
    }
  };

  const settings = {
    dots: false, // Eliminado los dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <SectionService>
      <CarouselWrapper>
        <Slidercont  {...settings}>
          {tiposPescados.map((pescado) => (
            <Card key={pescado.id}>
                <Link to={`/pescados/${pescado.id}`}>
              <img src={pescado.imagen} alt={pescado.nombre} />
                </Link>
              <h3>{pescado.nombre}</h3>
              <p>{pescado.descripcion_corta}</p>
             
              
               <button to={`/pescados/${pescado.id}`}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5UlEQVR4nO2bu2tUQRSHz2piEHwgCoKISMSAnWCholj6aGKh/gEWgo1CCgkiPkHciC+wUrNrZeNfIKiNhRALCxVE0WiioOimERED6idDJpuTdRfj3nO9dzL3g4HLsMyZ89uzM+fM3BUpKCgoKJgA6AGOAP0NzfX1yGwHeE1rXknkAiCzHWAtcBwoqxaPAM0oBJhOf2DtALBSDAUIkR/AeWBurAJMctVCgHJAbQB4oOb+C1ifSAAJDGAOcEe5cDoqARzAYeXCNYlQgKpy4VhUAgCdwJhyYVNsAuxS0x8FSrEJUFXTv9DuIHUk7PDfGJsAOxOHf+ACVNTULyYZqI6EFf61RKv/JIEKYBP+AQtgE/4hCmAa/oEKsENN+V2i8A9UgEE15UsWA9aRnAN0AJ+mZszm2ATYbhr+AQpwwzT8QxIglfAPTAD78HcA437QcckxwHUlwBXLgcvAV+Cc5Dv8PysBtkhMMD3837vTYIkJ4J4S4LLEBLC/4fJjncQAMB84CvxUAlTSNFgCtgF9Gd/4ngFuAx/0Fg08ARal5Xw38Ij88hBYnpbzy4AR8smov/rqSMV5hztRUQa/+3Izy1vfk8BBd8zd9p3/vwC8UQLskdhgKhV2LJDYYHoE7JXY4M81oPIftrpD7jAzFykt2e4CT4GtWWsgPg8YykgEtwb1Zq2BNGSCaW91t4AvSgT3vEJiAlgNDCe+3w8ZoFcJ8DxPP4E+/1xK2eZiX+I6vqVpq91iyPV1iwGumPEp7qqG/vve1l0LO2lsgyPuMwbf9As/3lsdWUAXsAGYZ+KQUTE06J9NFijglBrrYy4SoL8VQy4tVv3DkgB/mNE03fZvertT6YEkNsyLIWChjoyENmotbHQp++61986k/pgVQ8A+wwh4NgMbY0l9sSyGqsZrwNkZ2Lhp55X9LrA0oY0lfvVvRa1xe8xLMTRkmAesAR43sfGyrT86hJgJMvEHB3fNdcJvjbvTXvh+A3MqXsKiTzAtAAAAAElFTkSuQmCC" alt="shopping-cart--v1"/> Añadir a carrito</button>
         
            </Card>
          ))}
        </Slidercont>
      </CarouselWrapper>
    </SectionService>
  );
}
