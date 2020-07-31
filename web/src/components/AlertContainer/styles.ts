import styled from "styled-components";

import colors from "../../themes/colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  background: rgba(50, 33, 83, 0.8);

  > svg {
    color: ${colors.green};
  }
`;
