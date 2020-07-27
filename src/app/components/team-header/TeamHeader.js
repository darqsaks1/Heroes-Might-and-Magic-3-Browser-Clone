import React from "react";
import styled from "styled-components";

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: auto;
  font-size: 25px;
  font-family: "Trajan";
  color: black;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
    -23px 0 20px -23px rgba(0, 0, 0, 0.8), 23px 0 20px -23px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(0, 0, 0, 0.1) inset;
  background: rgb(255, 245, 238, 0.5);
  animation: rainbow 1s ease infinite;
  a {
    text-decoration: none;
    color: black;
    div {
      padding: 20px;
      &:hover {
        color: red;
        cursor: pointer;
      }
      @media (max-width: 450px) {
        font-size: 12px;
      }
    }
  }
`;

const TeamHeader = () => {
  return (
    <HeaderBlock className="sticky">
      <a href="/">
        <div>Главная</div>
      </a>
      <a href="/project">
        <div>Проект</div>
      </a>
      <a href="/team">
        <div>О команде</div>
      </a>
    </HeaderBlock>
  );
};

export default TeamHeader;
