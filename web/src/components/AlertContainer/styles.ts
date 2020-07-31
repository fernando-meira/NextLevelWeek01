import styled from "styled-components";

import colors from "../../themes/colors";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  background: rgba(50, 33, 83, 0.8);

  > svg {
    color: ${colors.green};
  }

  > h1 {
    color: ${colors.white};
  }
`;
