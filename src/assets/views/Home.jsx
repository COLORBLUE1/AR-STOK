import React from "react";
import styled from "styled-components";
import { ProductosCards } from "../components/ProductosCards";
import { HomeLayouts } from "../layouts/HomeLayouts";


const Sectiontwe = styled.section`
margin-top: 300px;
  height: 100vh;
  display: grid;
  justify-items: center;
`;

const Filtros = styled.div`
  height: 100vh;
  display: grid;
  justify-items: center;
  align-content: center;
  padding: 10px;
  gap: 50px;
  //background-color: yellow;

  strong{
    text-align: center;
  }
  div{
    height: 300px;
    width: 100%;
    border-radius: 15px;
    border: solid 1px #3a3a3a6e;
    background-color: white;
    box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.18);
  }
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
  return (
    <HomeLayouts>
      <Filtros>
        <strong>FIltra para encontrar lo que deseas</strong>
        <div>
        </div>
      </Filtros>
      <Productos>
        <div>
          <h2>MIra estos filetes</h2>
          <ProductosCards tipo={"Filete"} />
        </div>
        <div>
          <h2>Pescados completos</h2>
          <ProductosCards tipo={"Pescado entero"} />
        </div>
        <div>
          <h2>Mariscos</h2>
          <ProductosCards tipo={"Marisco"} />
        </div>
        <div>
          <h2>Lomos</h2>
          <ProductosCards tipo={"Lomo"} />
        </div>
        <div>
          <h2>Posta</h2>
          <ProductosCards tipo={"Posta"} />
        </div>
      </Productos>
    </HomeLayouts>
  );
}