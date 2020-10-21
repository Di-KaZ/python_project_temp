import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";
import useLogin from "./useLogin";
import { Button } from "./StyledElem";

const CenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(12px);
  --webkit-backdrop-filter: blur(12px);
`;

const Card = styled.div`
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2d4059e6;
`;

const Fields = styled.h4`
  color: white;
  text-transform: uppercase;
`;

const Values = styled.h3`
  color: white;
  text-transform: uppercase;
  font-weight: 300;
`;

const Profile = () => {
  const [profile, setProfile] = useState();
  const token = useLogin();
  const history = useHistory();

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
      response.json().then((json) => setProfile(json));
    });
  }, []);
  return (
    <CenterContainer>
      <Card>
        <Fields>Nom d'utilisateur</Fields>
        <Values>{profile?.username}</Values>
        <Fields>Date de creation du compte</Fields>
        <Values>{profile?.date_creation}</Values>
        <Button
          onClick={() => {
            Cookies.remove("token");
            history.push("/login");
          }}
        >
          Se deconnecter
        </Button>
      </Card>
    </CenterContainer>
  );
};

export default Profile;
