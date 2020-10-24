import React from "react";
import Pearl from "./Pearl";
import styled from "styled-components";

const CenterContainer = styled.div`
  padding-top: 100px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  overflow-x: scroll;
  backdrop-filter: blur(10px);
  --webkit-backdrop-filter: blur(10px);
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

function Home() {
  return (
    <CenterContainer>
      {Array(100)
        .fill()
        .map((_, i) => (
          <Pearl key={i} data={{ message: "test" }} />
        ))}
    </CenterContainer>
  );
}

export default Home;
