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
      {Array(20)
        .fill()
        .map((_, i) => (
          //:face_vomiting:  :lying_face:  :rolling_eyes:  :cowboy:
          <Pearl
            key={i}
            data={{
              pearl_id: i,
              user: "qwerty",
              message:
                "of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour",
              smileys: [
                { icon: "🤮", num: 13 },
                { icon: "🤥", num: 200 },
                { icon: "🙄", num: 69 },
                { icon: "🤠", num: 78 },
              ],
              comments: [
                { comment_id: 1, user: "Celestine", message: "hahaha !" },
                { comment_id: 2, user: "Roblox", message: "that sounds fake" },
                { comment_id: 3, user: "Helene", message: "dam..." },
              ],
            }}
          />
        ))}
    </CenterContainer>
  );
}

export default Home;
