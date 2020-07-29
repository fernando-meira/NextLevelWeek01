import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { TileLayer, Marker } from "react-leaflet";
import axios from "axios";
import { LeafletMouseEvent } from "leaflet";

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

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [places, setPlaces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUF, setSelectedUF] = useState<string>("0");
  const [selectedCity, setSelectedCity] = useState<string>("0");

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(event.target.value);
    },
    []
  );

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

  useEffect(() => {
    if (selectedUF === "0") {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUF]);

  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUF(event.target.value);
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    console.log(event.latlng);
  };

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

          <Map center={[-23.6067988, -48.047176]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-23.6067988, -48.047176]} />
          </Map>

          <div className="field-group">
            <Field>
              <label htmlFor="uf">Estado (UF)</label>

              <select
                name="uf"
                id="uf"
                value={selectedUF}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione uma UF</option>
                {places.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <label htmlFor="city">Cidade</label>

              <select
                value={selectedCity}
                name="city"
                id="city"
                onChange={handleSelectCity}
              >
                <option value="0">Selecione uma Cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
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
