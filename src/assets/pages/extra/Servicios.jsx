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
  }`;


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

  ul{
    padding-left: 20px;
    max-width: 900px;
    margin: 20px auto;
    text-align: center;

    li {
    list-style-type: disc;
      margin-bottom: 10px;
      font-size: 1.3rem;
      color: #3b3b3b;
      margin: auto;
    }
  }
`;

const Servicios = () => {
  return (
    <>
      <AppBar />
      <Header>
        <h2>Servicios</h2>
      </Header>
      <Content>
        <p>Entre los servicios que ofrecemos tenemos:</p>
        <ul>
          <li>Venta de pescados frescos</li>
          <li>Asesoramiento personalizado</li>
          <li>Entrega a domicilio</li>
        </ul>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Odesa_bazaar%2C_Prussian_Carps.jpg/1200px-Odesa_bazaar%2C_Prussian_Carps.jpg" alt="" />
      </Content>
      <Footer />
    </>
  )
}

export default Servicios