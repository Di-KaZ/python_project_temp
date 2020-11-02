import React from "react";
import LoginSignUp from "./LoginSignUp";
import Profile from "./Profile";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import bg from "./img/bg.jpg";
import useLogin from "./useLogin";
import Home from "./Home";
import Search from "./Search";

const Bg = styled.img`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  const [, isLogged, setIsLogged] = useLogin();
  return (
    <>
      {!isLogged && <LoginSignUp setLogged={setIsLogged} />}
      <Navbar />
      <Bg src={bg} alt="bg" />
      <Switch>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
      </Switch>
    </>
  );
};

export default App;
