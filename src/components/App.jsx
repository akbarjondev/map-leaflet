import React from "react";
import Map from "./Map";
import Controller from "./Controller";
import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
  height: 100vh;
`;

const App = () => {
  return (
    <StyledApp>
      <Map />
      <Controller />
    </StyledApp>
  );
};

export default App;
