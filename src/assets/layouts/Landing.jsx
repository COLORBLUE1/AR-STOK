import React from "react";
import styled from "styled-components";
import AppBar from "../components/AppBar";
import Header from "../components/Header";
import { LugaresCards } from "../components/LugaresCards";

const SectionHeader = styled.header`
  background: url(https://img.freepik.com/foto-gratis/mitad-espacio-copia-pescado_23-2148708639.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  height: 100vh;

  div {
    backdrop-filter: blur(4px);
    height: 100%;
    h1 {
      text-align: center;
    }
  }
`;

const Sectiontwe = styled.section`
margin-top: 300px;
  height: 100vh;
  display: grid;
  justify-items: center;

`;
export function Landing() {
  return (
    <>
      <SectionHeader>
        <div>
          <AppBar />
          <Header />
        </div>
      </SectionHeader>
      <Sectiontwe>
        <h2>LUGARES TURISTICOS DE CALI</h2>
        <LugaresCards />
      </Sectiontwe>
    </>
  );
}
