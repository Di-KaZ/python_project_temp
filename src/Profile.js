import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";
import useLogin from "./useLogin";

const CenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Profile = () => {
  const token = useLogin();
  useEffect(() => {
    fetch("/profile", {
      method: "post",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify({
        token: token,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      /* TODO SHOW USER INFO */
    });
  }, []);
  return (
    <CenterContainer>
      <p style={{ color: "white" }}></p>
    </CenterContainer>
  );
};

export default Profile;
