import styled from "styled-components";
import AppBar from "../components/AppBar"
import Header from "../components/Header";
import Footer from "../components/Footer";


const Section = styled.section`
`;

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

const Sectionmain = styled.section`
display: grid;
grid-template-columns: 20% 80%;
height: 100vh;

`;

export function HomeLayouts({ children }) {
  return (
    <Section>
      <AppBar />
      <SectionHeader>
        <div>
          <Header />
        </div>
      </SectionHeader>
      <Sectionmain>
        {children}
      </Sectionmain>
    </Section>
  );
}
