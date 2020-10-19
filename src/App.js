import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginSignUp from "./LoginSignUp";

const App = () => {
  // useEffect(() => {
  //   fetch("/hey")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setHey(data.hey); // Request to get route from flask api
  //     });
  // }, []);

  return <LoginSignUp />;
};

export default App;
