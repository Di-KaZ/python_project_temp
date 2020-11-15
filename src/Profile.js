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
  margin-top: 50px;
  padding: 50px;
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #2d4059e6;
`;

const Fields = styled.h4`
  color: white;
  text-transform: uppercase;
`;

const Values = styled.h3`
  margin-left: 15px;
  color: #d41717;
  text-transform: uppercase;
  font-weight: bold;
`;

const Title = styled.h2`
  color: #d41717;
  text-transform: uppercase;
  font-weight: bold;
`;

const Profile = () => {
  const [profile, setProfile] = useState();
  const [buttonText, setButtonText] = useState("Supprimer le compte");
  const [token] = useLogin();
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

  const logOut = () => {
    Cookies.remove("token");
    history.push("/");
    window.location.reload(false);
  };

  const deleteAccount = () => {
    fetch("/delete_account", {
      method: "post",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify({
        token: token,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((json) => {
        setButtonText(json.error);
      });
    });
  };

  return (
    <CenterContainer>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Title>Informations</Title>
          <div style={{ display: "flex" }}>
            <Fields>Nom d'utilisateur</Fields>
            <Values>{profile?.username}</Values>
          </div>
          <div style={{ display: "flex" }}>
            <Fields>Date de creation du compte</Fields>
            <Values>{profile?.date_creation}</Values>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Title>Actions</Title>
          <Button onClick={logOut}>Se deconnecter</Button>
          <Button onClick={deleteAccount}>{buttonText}</Button>
        </div>
      </Card>
    </CenterContainer>
  );
};

export default Profile;
