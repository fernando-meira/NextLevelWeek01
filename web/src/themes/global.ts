import { createGlobalStyle } from "styled-components";

import colors from "./colors";

export default createGlobalStyle`

  *{
    margin: 0;
    outline: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #f0f0f5;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${colors.titleColor};
    font-family: Ubuntu;
  }

  button {
    cursor: pointer;
  }
`;
