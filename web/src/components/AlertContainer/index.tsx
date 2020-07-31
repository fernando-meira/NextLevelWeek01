import React from "react";
import { FiCheckCircle } from "react-icons/fi";

import { Container } from "./styles";

const AlertContainer: React.FC = () => {
  return (
    <Container>
      <FiCheckCircle size={40} />

      <h1>Cadastro concluído!</h1>
    </Container>
  );
};

export default AlertContainer;
