import React, { useEffect, useState } from "react";
import Pearl from "./Pearl";
import styled from "styled-components";
import NewPearl from "./NewPearl";
import { Button } from "./StyledElem";

const CenterContainer = styled.div`
  padding-top: 100px;
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  overflow-y: scroll;
  backdrop-filter: blur(10px);
  --webkit-backdrop-filter: blur(10px);
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

function Home() {
  const [pearls, setPearls] = useState([]);
  const [onChange, setOnChange] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/get_pearl", {
      method: "post",
      cache: "no-cache",
      body: JSON.stringify({ page: page }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((json) => {
        setPearls(json);
      });
    });
  }, [onChange, page]);

  return (
    <>
      <NewPearl
        setOnChange={setOnChange}
        onChange={onChange}
        setPage={setPage}
      />
      <CenterContainer>
        {pearls.map((pearl) => (
          <Pearl
            key={pearl.id}
            data={{
              pearl_id: pearl.id,
              user: pearl.username,
              message: pearl.content,
              smileys: [
                { icon: "🤮", num: 13 },
                { icon: "🤥", num: 200 },
                { icon: "🙄", num: 69 },
                { icon: "🤠", num: 78 },
              ],
            }}
          />
        ))}
        <Button onClick={() => setPage(page + 1)}>Charge m'en plus !</Button>
      </CenterContainer>
    </>
  );
}

export default Home;
