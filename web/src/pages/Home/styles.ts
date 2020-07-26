import styled from "styled-components";
import media from "styled-media-query";

import logo from "../../assets/home-background.svg";
import colors from "../../assets/colors";

export const Container = styled.div`
  height: 100vh;

  background: url(${logo}) no-repeat 600px bottom;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1100px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  header {
    margin: 48px 0 0;
  }

  main {
    flex: 1;
    max-width: 560px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    > h1 {
      font-size: 54px;
      color: ${colors.titleColor};
    }

    > p {
      margin-top: 24px;

      font-size: 24px;
      line-height: 38px;
    }

    > a {
      height: 72px;
      width: 100% auto;
      overflow: hidden;
      max-width: 360px;
      margin-top: 40px;
      border-radius: 8px;

      display: flex;
      align-items: center;

      text-decoration: none;
      background: ${colors.primaryColor};
      transition: background-color 0.2s;

      :hover {
        background: #2fb86e;
      }

      > span {
        width: 72px;
        height: 72px;

        display: flex;
        align-items: center;
        justify-content: center;

        background: rgba(0, 0, 0, 0.08);
      }

      > strong {
        flex: 1;

        color: #fff;
        text-align: center;
      }
    }
  }

  ${media.lessThan("medium")`
    align-items: center;
    text-align: center;

    header {
      margin: 48px auto 0;
    }

    main {
      align-items: center;

      > h1 {
        font-size: 42px;
      }

      > p {
        font-size: 24px;
      }
    }
  `}
`;
