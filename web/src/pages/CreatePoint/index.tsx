import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import colors from "../../themes/colors";
import logo from "../../themes/assets/logo.svg";

import { Container, Field, ListItem, Button } from "./styles";

const CreatePoint = () => {
  return (
    <Container>
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to={"/"}>
          <FiArrowLeft size={20} color={colors.primaryColor} />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do
          <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <Field>
            <label htmlFor="name">Nome da entidade</label>

            <input type="text" id="name" name="name" />
          </Field>

          <div className="field-group">
            <Field>
              <label htmlFor="email">E-mail</label>

              <input type="email" id="email" name="email" />
            </Field>

            <Field>
              <label htmlFor="whatsapp">Whatsapp</label>

              <input type="text" id="whatsapp" name="whatsapp" />
            </Field>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>

            <span>Selecione o endereço no mapa</span>
          </legend>
          <div className="field-group">
            <Field>
              <label htmlFor="uf">Estado (UF)</label>

              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </Field>

            <Field>
              <label htmlFor="city">Cidade</label>

              <select name="city" id="city">
                <option value="0">Selecione uma Cidade</option>
              </select>
            </Field>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítems de Coleta</h2>

            <span>Selecione um ou mais items abaixo</span>
          </legend>

          <ListItem>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="test" />

              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="test" />

              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="test" />

              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="test" />

              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="test" />

              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="test" />

              <span>Óleo de Cozinha</span>
            </li>
          </ListItem>
        </fieldset>

        <Button type="submit">Cadastrar ponto de coleta</Button>
      </form>
    </Container>
  );
};

export default CreatePoint;
