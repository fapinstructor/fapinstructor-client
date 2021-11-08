import styled from "styled-components/macro";

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: var(--space, 1.5rem);
  }

  & > .stack-skip {
    --space: 0;
    align-self: flex-start;
  }
`;
