import React from "react";
import styled from "styled-components";

const Card = styled.div`
  margin-top: 50px;
  background-color: #2d4059;
  min-height: 300px;
  width: 80%;
  color: white;
  text-transform: capitalize;
`;

const Top = styled.div`
  background-color: #d41717;
  min-height: 100px;
`;

const Pearl = ({ data }) => {
  return (
    <Card>
      <Top>{data.message}</Top>
    </Card>
  );
};

export default Pearl;
