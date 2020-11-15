import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "./StyledElem";
import useLogin from "./useLogin";

const MessageInput = styled.textarea`
  margin-top: 15px;
  background-color: #2d4059;
  border: none;
  color: white;
  width: 500px;
  height: 100px;
  text-align: left;
  font-size: 20px;
  ::placeholder {
    color: white;
    font-size: 20px;
  }
  &:focus {
    outline: none;
  }
  :-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  resize: none;
`;

const Message = ({ open, message, setMessage }) => {
  const writer = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <MessageInput
      style={{ display: !open ? "none" : "block" }}
      maxLength={300}
      placeholder={"Raconte nous ton histoire"}
      onChange={(e) => {
        writer(e);
      }}
      value={message}
    />
  );
};

const NewPearl = ({ setOnChange, onChange, setPage }) => {
  const [open, setOpen] = useState(false);
  const [token] = useLogin();
  const [message, setMessage] = useState("");

  const PostNewPearl = () => {
    fetch("/create_pearl", {
      method: "post",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify({
        token: token,
        content: message,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      setOnChange(!onChange);
      setOpen(!open);
      setPage(1);
    });
  };

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        style={{
          margin: 0,
          padding: 0,
          width: !open ? "100px" : "100px",
          height: !open ? "100px" : "100px",
          borderRadius: "50%",
          position: "fixed",
          right: "10px",
          bottom: "10px",
          zIndex: 11,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "5rem",
          color: "white",
          fontWeight: 10,
          cursor: "pointer",
        }}
      >
        {!open ? (
          <CreateIcon fontSize="large" />
        ) : (
          <CloseIcon fontSize="large" />
        )}
      </div>
      <motion.div
        style={{
          position: "fixed",
          right: "10px",
          bottom: "10px",
          backgroundColor: "#2d4059",
          color: "white",
          zIndex: "10",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        animate={
          open
            ? {
                width: "600px",
                height: "300px",
                borderRadius: "20px",
              }
            : {
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }
        }
      >
        <h3 style={{ display: !open ? "none" : "block" }}>
          Créer une Nouvelle Perle
        </h3>
        <Message open={open} message={message} setMessage={setMessage} />
        <Button
          style={{
            display: !open ? "none" : "block",
            alignSelf: "flex-start",
            marginLeft: "30px",
          }}
          onClick={PostNewPearl}
        >
          Mon oeurve est terminée
        </Button>
      </motion.div>
    </>
  );
};

export default NewPearl;
