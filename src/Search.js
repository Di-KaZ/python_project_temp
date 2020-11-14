import React, { useState, useEffect } from "react";
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

const SearchBar = ({ setPearls }) => {
  const [query, setQuery] = useState("");
  const fetchPearls = (e) => {
    fetch("/search", {
      method: "post",
      cache: "no-cache",
      body: JSON.stringify({ search: e.target.value }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((json) => {
        setPearls(json);
        console.log(json);
      });
    });
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
  const [pearls, setPearls] = useState([]);
  return (
    <CenterContainer>
      <SearchBar setPearls={setPearls} />
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
    </CenterContainer>
  );
}

export default Search;
