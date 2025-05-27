import React from 'react'
import styled from 'styled-components'

const FooterSecton = styled.section`
  background-color: #02c5fb;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  position: relative;
  bottom: 0;
  width: 100%;
  h2{
    color: white;
    font-size: 80px;
    font-family: tc;
    letter-spacing: 5px;
  }
` ;

const Footer = () => {
  return (
    <FooterSecton>
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADCElEQVR4nO2aS2xOQRTHp/VulIR6hQ2pDaEJQWxULBoqJLW1EEFEYt/GI6oIiQUSEiKxaL0WNlSLeGxEohILQUmTCjs78WjU8ycnnSbX+G6/+/zMvd/8tjOTe+Z835xz5n9GKYfD4XA4HA6Hw1FKgHHAKFVuAFXAFWAQ+Ab0AueBzcBslXeAi4zMc2AvMFflDWAV8JtgyLy7wAagQmUdoFL/ulF4CjSoLMPQGY+L/CPqSm34JPkoMC3i+pnASeAryfAdOAiMTX63HoCJwAXgp+dM3gBqVQCAMUALMEA6PANmqDQAKoD7Ph/+AuwaKTABK3R6S5OjqWxeABoDGHALqFEepLAB9gM/Ut58u0oT4HBAQ94By/WaqTpIpc0rYIJh727gamJxAWgLYdCg/tX7SR+JQ/WGrTs8492mc6I6oAE76TLsrNNZwctNCcBxHTAaeI991BuBusdnXnvs6hE4gV30ezcFrC8yvzWuA5ZgF8cN+zqLzP8FbIzrhD7sodGoToOk2o/AvDgOOIM9TA9ZpwzzMLLwAmzCDj4YdjUb44+BbcA5n/XNUR2wEDvoNew66xmTNDjFM3bbp1apjeKAydjBE8Ouy56xAW/eBy4llhWAaux3APrWKv/WrQUKo1gOWID9RyAIIr7Oj+KAJrIRBIuxJ/TmBeA0dqbBdSHWPYqTBvuwsxCqHuGse/kUKfpnpBQWea7Y1blJ5egy9Ma4DBWrBg/l+jos6AqwEJImK1UOBZFuw87FOsX9NScJQaQthFFSZh4A3vJ/JLHtnnEpg6tibT6CKLpMr6kBHpA+r31E0WvScldJQLDrZpcowQViR2sJZPGORDbqh9bb7vl8/DOws0hjZKWWr9PkmCpBa6xDS0voFllnUIVFNHopQVNsjb0AZqXqBEGaosBSswsUFDESOKWDZRLI8TqS2HnPWHv8DrBIleEDiR5grco6wJoQmx6OOatVnuBfNccsdOQ5zD5gjsojDOmM13V2kVcjL7VTtshrElUuAONz8frL4XA4HA6Hw+FQmeQPVl7qeGvRrzkAAAAASUVORK5CYII=" alt="fish"></img><h2>El mejor pescado que encontraras </h2>

    </FooterSecton>
  )
}

export default Footer