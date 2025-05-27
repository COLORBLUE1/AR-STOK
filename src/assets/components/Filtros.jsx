import React from "react";
import styled from "styled-components";

const FiltrosContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 10px;
  strong {
    display: block;
    margin-bottom: 1rem;
    color: #00bcd4;
  }
  select, input {
    margin-right: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #757575;
  }
`;

const Filtros = ({ onFilter }) => {
  const handleChange = (e) => {
    if (onFilter) onFilter(e.target.value);
  };

  return (
    <FiltrosContainer>
      <strong>Filtra para encontrar lo que deseas</strong>
      <div>
        <select onChange={handleChange}>
          <option value="">Todas las categorías</option>
          <option value="Marisco">Mariscos</option>
          <option value="Lomo">Lomos</option>
          <option value="Posta">Postas</option>
          <option value="Filete">Filetes</option>
          <option value="Pescado entero">Pescado entero</option>
        </select>
      </div>
    </FiltrosContainer>
  );
};

export default Filtros;