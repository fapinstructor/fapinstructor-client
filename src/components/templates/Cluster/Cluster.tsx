import styled from "styled-components/macro";

const Cluster = styled.div`
  & > * {
    margin-left: 0;
    margin-right: 0;
  }

  & > * + * {
    margin-left: var(--space, 1rem);
  }
`;

export default Cluster;
