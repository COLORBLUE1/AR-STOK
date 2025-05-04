import React from "react";

import styled from "styled-components";
import "animate.css";

const Headecontent = styled.div`
    display: grid;
    justify-items: center;

  .header-content {
    display: grid;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;

    h2 {
      animation: fadeInUp;
      animation-duration: 1s;
      color: #ffffff;
      font-size: 5em;
      margin: 0;
      font-family: tc;
      letter-spacing: 0.1em;
      span{
        color: #00eeff;
        font-weight: bold;
      }
    }
  }
span{
input{
  width: 300px;
  height: 20px;
  border-radius: 20px;
  padding: 0.5rem;
  border: none;
  outline: none;
  font-size: 1.2rem;
  margin-top: 20px;
}
button {
  background: #bd6500;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.3s ease-in-out;
  width: 100px;

  &:hover {
    background: #ffffff;
    color: #00eeff;
    scale: 1.1;
    font-weight: bold;
    box-shadow: 0px 0px 10px #00eeff;
  }
}
}
`;

const Header = () => {
  return (
    <Headecontent>
      <div className="header-content">
        <h2>Disfruta del buen <span>pescado</span></h2>
      </div>
      <span>
        <input type="text" />
        <button>Buscar</button>
      </span>
    </Headecontent>
  );
};

export default Header;
