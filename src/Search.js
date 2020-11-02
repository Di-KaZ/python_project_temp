import React, { useState } from "react";
import Pearl from "./Pearl";
import styled from "styled-components";
import { white } from "material-ui/styles/colors";
import SearchIcon from "@material-ui/icons/Search";

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

const SearchInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  width: 500px;
  padding: 0;
  margin: 0;
  text-align: left;
  font-size: 20px;
  margin-left: 15px;
  ::placeholder {
    color: white;
    font-size: 20px;
  }
  &:focus {
    outline: none;
  }
  :-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  resize: none;
`;

const Message = (props) => {
  return (
    <SearchInput maxLength={300} placeholder={"Dis nous tout"} {...props} />
  );
};

const SearchI = styled.div`
  cursor: pointer;
  margin-right: 3px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  padding: 5px;
  justify-content: center;
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const fetchPearls = (e) => {
    setQuery(e.target.value);
    // fetch
  };
  return (
    <div
      style={{
        background: "#2d4059",
        color: white,
        borderRadius: "40px",
        display: "flex",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <SearchInput
        style={{}}
        type="text"
        value={query}
        onChange={(e) => fetchPearls(e)}
        placeholder={"Tu cherche un truc ?"}
      ></SearchInput>
      <SearchI>
        <SearchIcon color="error" />
      </SearchI>
    </div>
  );
};

function Search() {
  return (
    <CenterContainer>
      <SearchBar />
      {/* {Array(20)
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
        ))} */}
    </CenterContainer>
  );
}

export default Search;
