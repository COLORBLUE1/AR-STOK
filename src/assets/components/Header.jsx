import React, { useState } from "react";

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
`;

const Header = ({ onSearch }) => {
 
  return (
    <Headecontent>
      <div className="header-content">
        <h2>Disfruta del buen <span>pescado</span></h2>
      </div>
    </Headecontent>
  );
};

export default Header;