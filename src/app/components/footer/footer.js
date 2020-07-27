import React from "react";
import styled from "styled-components";
import link from "../../assets/images/sites/link.png";
import git from "../../assets/images/sites/svg.png";

const FooterBlock = styled.div`
  font-family: "Trajan";
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  color: black;
  opacity: 0.9;
  background-color: inerhit;
  opacity: 0.8;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  @media (max-width: 600px) {
    font-size: 10px;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const NickDarqsaks = styled.div`
  margin-left: 20px;
  &:hover {
    color: red;
    cursor: pointer;
  }
  a {
    margin-left: 10px;
  }
`;

const NickBozorgVlad = styled.div`
  margin-right: 20px;
  &:hover {
    color: red;
    cursor: pointer;
  }
  a {
    margin-right: 10px;
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <NickDarqsaks>
        <div> Darqsaks1 </div>
        <a href="https://www.linkedin.com/in/darqsaks1/">
          <img src={link} width="20px" height="20px" alt="link" />
        </a>
        <a href="https://github.com/darqsaks1">
          <img src={git} width="20px" height="20px" alt="link" />
        </a>
      </NickDarqsaks>
      <NickBozorgVlad>
        <a href="https://www.linkedin.com/in/uladzislau-laisha-196a1b1b1/">
          <img src={link} width="20px" height="20px" alt="link" />
        </a>
        <a href="https://github.com/BozorgVlad">
          <img src={git} width="20px" height="20px" alt="link" />
        </a>
        <div>BozorgVlad </div>
      </NickBozorgVlad>
    </FooterBlock>
  );
};

export default Footer;
