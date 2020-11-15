import React from "react";
import styled from "styled-components";
import logo from "./img/logo.png";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NavContainer = styled(motion.div)`
  background-color: #2d4059;
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
`;

const Logo = styled.img`
  margin-left: 15px;
  height: 100%;
`;

const NavList = styled.ul`
  flex-grow: 1;
  display: flex;
  list-style: none;
  justify-content: space-evenly;
  cursor: pointer;
  height: 100%;
  margin: 0;
`;

const NavItem = styled.li`
  padding: auto;
  align-self: center;
  font-size: 1.3rem;
  color: white;
  text-transform: uppercase;
`;

const Navbar = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <NavContainer animate={{ opacity: location.pathname === "/login" ? 0 : 1 }}>
      <Logo src={logo} alt="logo" />
      <NavList>
        <NavItem
          style={{
            borderBottom: location.pathname === "/" && "2px solid #d41717",
          }}
          onClick={() => history.push("/")}
        >
          Accueil
        </NavItem>
        <NavItem
          style={{
            borderBottom:
              location.pathname === "/search" && "2px solid #d41717",
          }}
          onClick={() => history.push("/search")}
        >
          Recherche
        </NavItem>
        <NavItem
          style={{
            borderBottom:
              location.pathname === "/profile" && "2px solid #d41717",
          }}
          onClick={() => history.push("/profile")}
        >
          Profil
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navbar;
