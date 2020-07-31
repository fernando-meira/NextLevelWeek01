import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();

  const [items, setItems] = useState<Item[]>([]);
  const [places, setPlaces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState<string>("0");
  const [selectedCity, setSelectedCity] = useState<string>("0");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

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
    setInitialPosition([event.latlng.lat, event.latlng.lng]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSelectItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const uf = selectedUF;
    const items = selectedItems;
    const city = selectedCity;
    const { name, email, whatsapp } = formData;
    const [latitude, longitude] = initialPosition;

    const data = {
      uf,
      items,
      city,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
    };

    await api.post("points", data);

    alert("Ponto criado com sucesso!");

    history.push("/");
  }

  return (
    <Container>
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to={"/"}>
          <FiArrowLeft size={20} color={colors.primaryColor} />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
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

            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </Field>

          <div className="field-group">
            <Field>
              <label htmlFor="email">E-mail</label>

              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
              />
            </Field>

            <Field>
              <label htmlFor="whatsapp">Whatsapp</label>

              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                onChange={handleInputChange}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>

            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={initialPosition} />
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
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
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
