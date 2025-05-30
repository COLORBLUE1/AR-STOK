import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ProductosCards } from "../components/ProductosCards";
import { HomeLayouts } from "../layouts/HomeLayouts";
import Filtros from "../components/Filtros";



const Filtroscon = styled.section`
  height: 100vh;
  display: grid;
  justify-items: center;
  align-content: center;
  padding: 10px;
  gap: 50px;
`;

const Productos = styled.div`
  height: auto;
  display: grid;
  justify-items: center;
  padding: 10px;
  //background-color: #1b00b4;
  overflow: hidden;
  overflow-y: auto;

  div{
h2{
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 10px;
  font-size:30px;
}
  }
  &::-webkit-scrollbar{
    width:0;
  }
`;

export function Home() {
  const [filter, setFilter] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <HomeLayouts>
      <Filtroscon>
        <Filtros onFilter={setFilter} />
      </Filtroscon>
      <Productos>
        {filter === "" ? (
          <>
            <div>
              <h2>MIra estos filetes</h2>
              <ProductosCards tipo="Filete" />
            </div>
            <div>
              <h2>Pescados completos</h2>
              <ProductosCards tipo="Pescado entero" />
            </div>
            <div>
              <h2>Mariscos</h2>
              <ProductosCards tipo="Marisco" />
            </div>
            <div>
              <h2>Lomos</h2>
              <ProductosCards tipo="Lomo" />
            </div>
            <div>
              <h2>Posta</h2>
              <ProductosCards tipo="Posta" />
            </div>
          </>
        ) : (
          <div>
            <h2>
              {filter === "Filete" && "MIra estos filetes"}
              {filter === "Pescado entero" && "Pescados completos"}
              {filter === "Marisco" && "Mariscos"}
              {filter === "Lomo" && "Lomos"}
              {filter === "Posta" && "Posta"}
            </h2>
            <ProductosCards tipo={filter} />
          </div>
        )}
      </Productos>
    </HomeLayouts>
  );
}