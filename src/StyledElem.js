import styled from "styled-components";

const Button = styled.button`
  margin-top: 2rem;
  background-color: #d41717;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 0;
  height: fit-content;
  align-self: center;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export { Button };
