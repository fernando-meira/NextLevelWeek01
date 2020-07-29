import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { TileLayer, Marker } from "react-leaflet";
import axios from "axios";

import api from "../../services/api";

import colors from "../../themes/colors";
import logo from "../../themes/assets/logo.svg";

import { Container, Field, ListItem, Button, Map } from "./styles";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [places, setPlaces] = useState<string[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await api.get("/items");

      setItems(data);
    }

    fetchItems();
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setPlaces(ufInitials);
      });
  }, []);

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

          <Map center={[-23.6074648, -48.043701]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-23.6074648, -48.043701]} />
          </Map>

          <div className="field-group">
            <Field>
              <label htmlFor="uf">Estado (UF)</label>

              <select name="uf" id="uf">
                <option valur="0">Selecione uma UF</option>
                {places.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
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
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />

                <span>{item.title}</span>
              </li>
            ))}
          </ListItem>
        </fieldset>

        <Button type="submit">Cadastrar ponto de coleta</Button>
      </form>
    </Container>
  );
};

export default CreatePoint;
