import React, { useEffect, useState } from "react";
import Pearl from "./Pearl";
import styled from "styled-components";
import NewPearl from "./NewPearl";
import { set } from "js-cookie";

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
  const [pearls, setPearls] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/get_pearl", {
      method: "post",
      cache: "no-cache",
      body: JSON.stringify({ page: 1 }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((json) => {
        setPearls(json);
        console.log(json);
      });
    });
    setLoaded(true);
  }, []);

  return (
    <>
      <NewPearl />
      <CenterContainer>
        {loaded &&
          pearls.map((pearl) => (
            //:face_vomiting:  :lying_face:  :rolling_eyes:  :cowboy:
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
                comments: [
                  { comment_id: 1, user: "Celestine", message: "hahaha !" },
                  {
                    comment_id: 2,
                    user: "Roblox",
                    message: "that sounds fake",
                  },
                  { comment_id: 3, user: "Helene", message: "dam..." },
                ],
              }}
            />
          ))}
      </CenterContainer>
    </>
  );
}

export default Home;
