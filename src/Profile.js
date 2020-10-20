import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";

const CenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Profile = () => {
  const history = useHistory();
  const [username, setUsername] = useState(Cookies.get("session"));
  useEffect(() => {
    if (username === undefined || !username) history.push("/login");
  }, []);
  return (
    <CenterContainer>
      <p style={{ color: "white" }}>{username}</p>
    </CenterContainer>
  );
};

export default Profile;
