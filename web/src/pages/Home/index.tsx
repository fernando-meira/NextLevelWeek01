import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

import logo from "../../themes/assets/logo.svg";

import { Container, Content } from "./styles";

const Home = () => {
  return (
    <Container>
      <Content>
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>

          <p>
            Ajudamos pessoas a encontrar pontos de coleta de forma eficiente.
          </p>

          <Link to="/cadastro">
            <span>
              <FiLogIn size={20} color="#fff" />
            </span>

            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </Content>
    </Container>
  );
};

export default Home;
