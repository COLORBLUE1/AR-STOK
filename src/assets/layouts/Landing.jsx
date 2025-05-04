import React from "react";
import styled from "styled-components";
import AppBar from "../components/AppBar";
import Header from "../components/Header";
import { LugaresCards } from "../components/LugaresCards";

const SectionHeader = styled.header`
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 80vh;

  div {
    backdrop-filter: blur(3px);
    height: 100%;
    width: 100%;

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
