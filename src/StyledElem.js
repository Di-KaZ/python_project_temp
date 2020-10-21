import styled from "styled-components";

const Button = styled.button`
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

export { Button };
