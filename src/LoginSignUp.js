import React, { useState } from "react";
import styled from "styled-components";
import bg from "./img/bg.jpg";
import logo from "./img/logo.png";
import { motion } from "framer-motion";

const CenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(12px);
`;

const Bg = styled.img`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
`;

const Logo = styled.img`
  margin-top: -120px;
  position: relative;
  width: 100%;
`;

const Form = styled(motion.form)`
  width: 400px;
  height: max-content;
  color: white;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 50px;
  background-color: #2d4059e6;
`;

const FormContainer = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-evenly;
  flex-direction: column;
  width: 80%;
`;

const TextField = styled.input`
  color: white;
  border: none;
  font-size: 2rem;
  border-bottom: 1px solid white;
  background-color: rgba(0, 0, 0, 0);
  &:focus {
    outline: none;
  }
  width: 100%;
`;

const LoginNavList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: space-between;
`;

const LoginLi = styled.li`
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
  padding-bottom: 5px;
  cursor: pointer;
`;

const LogButton = styled.button`
  margin-top: 2rem;
  background-color: #d41717;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 0;
  width: 200px;
  height: fit-content;
  align-self: center;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
`;

const Label = styled.h4`
  text-transform: uppercase;
  font-weight: 300;
  margin: 0;
`;

const LoginNavItem = ({ status, setStatus, children, value }) => {
  return (
    <LoginLi
      onClick={() => status !== value && setStatus(value)}
      style={{ borderBottom: status === value && "2px solid #d41717" }}
    >
      {children}
    </LoginLi>
  );
};

const FormField = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const LoginSignUp = ({ datas: [data, setData] }) => {
  const [status, setStatus] = useState("LOGIN");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordBis, setPasswordBis] = useState("");

  const LoginFromFlask = (event) => {
    event.preventDefault();
    console.log(data?.username);
    if (!data.username) setData({ ...data, username: username });
    if (status === "SIGNUP") {
      fetch("/register", {
        method: "post",
        credentials: "include",
        cache: "no-cache",
        body: JSON.stringify({
          userName: userName,
          password: password,
          passwordBis: passwordBis,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        response
          .json()
          .then((json) => window.alert(json.error || json.message));
      });
    } else {
      fetch("/login", {
        method: "post",
        credentials: "include",
        cache: "no-cache",
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        response
          .json()
          .then((json) => window.alert(json.error || json.message));
      });
    }
  };

  return (
    <>
      <Bg src={bg} alt="bg" />
      <CenterContainer>
        <Form
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Logo src={logo} alt="lol" />
          <LoginNavList>
            <LoginNavItem status={status} setStatus={setStatus} value="LOGIN">
              Connection
            </LoginNavItem>
            <LoginNavItem status={status} setStatus={setStatus} value="SIGNUP">
              Nouveau ?
            </LoginNavItem>
          </LoginNavList>
          <FormContainer>
            <FormField>
              <Label>Nom d'utilisateur</Label>
              <TextField
                type="userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </FormField>
            <FormField>
              <Label>Mot de passe</Label>
              <TextField
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>
            {status === "SIGNUP" && (
              <FormField>
                <Label>Confirmer</Label>
                <TextField
                  type="password"
                  value={passwordBis}
                  onChange={(event) => setPasswordBis(event.target.value)}
                />
              </FormField>
            )}
            <LogButton onClick={(e) => LoginFromFlask(e)}>
              {status === "SIGNUP" ? "J'ai fini !" : "connection"}
            </LogButton>
          </FormContainer>
        </Form>
      </CenterContainer>
    </>
  );
};

export default LoginSignUp;
