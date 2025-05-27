import styled from 'styled-components'
import Footer from '../../components/Footer';
import AppBar from '../../components/AppBar';

const Header = styled.header`
  width: 100%;
  height: 100vh;
  background: url(https://i.etsystatic.com/5295659/r/il/61ac12/4620316717/il_fullxfull.4620316717_50nu.jpg) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  h2{
    color: white;
    font-size: 3rem;
    text-align: center;
  }

`;


const Content = styled.section`
  width: 100%;
  height: 190vh;
  img{
    text-align: center;
    display: block;
    margin: 100px auto;
    width: 60%;
    height: 70%;
    object-fit: cover;
    border-radius: 40px;
  }
  p{
    color: #3b3b3b;
    font-size: 1.5rem;
    text-align: center;
    max-width: 900px;
    margin: 20px auto;
  }
`;

const Nosotros = () => {
  return (
    <>
    <AppBar/>
      <Header>
        <h2>Sobre nosotros</h2>
      </Header>

      <Content>
        <p>Bienvenidos a GRanja de do;a B, su destino de confianza para los pescados más frescos y de la más alta calidad. Desde nuestra apertura, nos hemos comprometido a ofrecer a nuestros clientes una experiencia única y satisfactoria en cada visita.

          Ubicados en el corazón de Cali, nuestra tienda se especializa en la venta de pescados y mariscos frescos, seleccionados cuidadosamente de los mejores proveedores locales y sostenibles. Creemos en la importancia de ofrecer productos que no solo sean deliciosos, sino también responsables con el medio ambiente.

          Nuestro equipo está formado por apasionados del mar y expertos en la selección de pescados. Nos enorgullece compartir nuestro conocimiento y ayudar a nuestros clientes a elegir los mejores productos para sus necesidades, ya sea para una cena especial, un evento familiar o simplemente para disfrutar de una comida saludable en casa.</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Odesa_bazaar%2C_Prussian_Carps.jpg/1200px-Odesa_bazaar%2C_Prussian_Carps.jpg" alt="" />
      </Content>
      <Footer />
    </>
  )
}

export default Nosotros