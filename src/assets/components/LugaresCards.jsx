import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router"; // Asegúrate de usar 'react-router-dom' en vez de 'react-router'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Styled Components
const Header = styled.section`
  background: rgb(238, 174, 223);
  background: radial-gradient(
    circle,
    rgba(238, 174, 223, 1) 0%,
    rgba(148, 228, 233, 1) 100%
  );
  background-size: cover;
  background-repeat: no-repeat;
  height: 600px;
  width: 70%;
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border-radius: 20px;
`;

const SectionService = styled.section`
  padding: 100px 20px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #ffffff;
    margin-bottom: 40px;
  }
`;

const CarouselWrapper = styled.div`
  width: 70%;
  margin: auto;

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Card = styled.div`
  box-shadow: 0 0 4px 4px rgb(0 0 0 / 25%);
  background-color: #fffdfd;
  border-radius: 10px;
  width: 300px !important;
  height: 350px !important;
  padding: 20px;
  margin: 10px;
  text-align: center;
  z-index: 99;

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
  }

  h3 {
    margin: 15px 0;
    font-size: 1.2rem;
  }

  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #008cba;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
  }

  .btn:hover {
    background-color: #005f7f;
  }
`;

const SectionMain = styled.header`
  background: url("https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/03/05/65e7754a37250.jpeg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  padding: 2rem;

  div {
    backdrop-filter: blur(3px);
    height: 70%;
    width: 100%;
    color: #000000;
  }
`;
const ContairnerCards = styled.section`
margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

// Component
export function ParapenteCards() {
  const [tiposParapente, setTiposParapente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parapenteData, setParapenteData] = useState([]);

  useEffect(() => {
    // Inicializar AOS para animaciones
    AOS.init();

    // Obtener tipos de parapente
    fetchTiposParapente();
  }, []);

  // Obtener todos los tipos de parapente
  const fetchTiposParapente = async () => {
    const response = await fetch(
      "http://localhost:3000/api/tipos-de-parapente"
    );
    const data = await response.json();
    setTiposParapente(data);
  };

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
      <Header>
        <CarouselWrapper>
          <Slider {...settings}>
            {tiposParapente.map((parapente) => (
              <Card data-aos="zoom-in" key={parapente.id}>
                <img src={parapente.imagen} alt={parapente.nombre} />
                <h3>{parapente.nombre}</h3>
                <p>{parapente.descripcion}</p>
                <Link to={`/parapente/${parapente.id}`} className="btn">
                  Ver más
                </Link>
              </Card>
            ))}
          </Slider>
        </CarouselWrapper>
      </Header>
    </SectionService>
  );
}

export function LugaresCards() {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/lugares-turisticos")
      .then((response) => response.json())
      .then((data) => setLugares(data));
  }, []);

  return (
    <ContairnerCards>

      {lugares.map((lugar) => (
        <Card key={lugar.id}>
          <img src={lugar.imagen} alt={lugar.nombre} />
          <h3>{lugar.nombre}</h3>
          <p>{lugar.descripcion}</p>
          <Link to={`/lugar/${lugar.id}`}>Ver más</Link>
        </Card>
      ))}
    </ContairnerCards>
  );
}
