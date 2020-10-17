import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HelloP = styled.p`
  font-size: 3rem;
  font-weight: bold;
`;

const App = () => {
  const [hey, setHey] = useState("🙃 Run flask api 🙃"); // create variable to stock response from flask api

  useEffect(() => {
    fetch("/hey")
      .then((res) => res.json())
      .then((data) => {
        setHey(data.hey); // Request to get route from flask api
      });
  }, []);

  return (
    <CenterContainer>
      <HelloP>{hey}</HelloP>
    </CenterContainer>
  );
};

export default App;
