import React, { useState, useEffect } from "react";
import LoginSignUp from "./LoginSignUp";
import Profile from "./Profile";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import bg from "./img/bg.jpg";

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
  return (
    <>
      <Navbar />
      <Bg src={bg} alt="bg" />
      <Switch>
        <Route exact path="/login">
          <LoginSignUp />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </>
  );
};

export default App;
