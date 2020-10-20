import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginSignUp from "./LoginSignUp";

const App = () => {
  const [data, setData] = useState({
    username: "",
  });
  return <LoginSignUp datas={[data, setData]} />;
};

export default App;
