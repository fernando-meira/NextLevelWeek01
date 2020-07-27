import styled from "styled-components";

import colors from "../../themes/colors";

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  header {
    margin-top: 48px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    > a {
      color: ${colors.titleColor};
      font-weight: bold;
      text-decoration: none;

      display: flex;
      align-items: center;

      > svg {
        margin-right: 1rem;
      }
    }
  }

  form {
    padding: 64px;
    max-width: 730px;
    margin: 80px auto;
    border-radius: 8px;

    display: flex;
    flex-direction: column;

    background: #fff;

    > h1 {
      font-size: 36px;
    }

    > fieldset {
      border: 0;
      margin-top: 64px;

      min-inline-size: auto;

      > legend {
        width: 100%;
        margin-bottom: 40px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        > h2 {
          font-size: 24px;
        }

        > span {
          font-size: 14px;
          font-weight: normal;
          color: ${colors.textColor};
        }
      }
    }

    .field-group {
      flex: 1;
      display: flex;

      margin-left: 0;
    }
  }
`;

export const Field = styled.div`
  margin-bottom: 24px;

  flex: 1;
  display: flex;
  flex-direction: column;

  & + div {
    margin-left: 24px;
  }

  > input {
    border: 0;
    border-radius: 8px;
    padding: 16px 24px;

    flex: 1;

    font-size: 16px;
    color: ${colors.purple};
    background: ${colors.whiteIce};

    ::placeholder {
      color: ${colors.lightPurple};
    }
  }

  > label {
    font-size: 14px;
    margin-bottom: 8px;
  }

  > select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex: 1;
    background: #f0f0f5;
    border-radius: 8px;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
    color: #6c6c80;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export const ListItem = styled.ul`
  gap: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  list-style: none;

  li {
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;
    border: 2px solid ${colors.whiteIce};

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    text-align: center;
    background: ${colors.whiteIce};

    > span {
      flex: 1;
      margin-top: 12px;

      display: flex;
      align-items: center;
      color: ${colors.titleColor};
    }
  }
`;

export const Button = styled.button`
  border: 0;
  width: 260px;
  height: 56px;
  margin-top: 40px;
  border-radius: 8px;

  color: #fff;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
  transition: background-color 0.2s;
  background: ${colors.primaryColor};

  :hover {
    background: ${colors.green};
  }
`;
