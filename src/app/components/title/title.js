import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import wrapper from "../../assets/images/fullWrap.jpg";

const TittleBlock = styled.div`
  width: 100%;
  height: 700px;
`;

const FullWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("${wrapper}");
  background-size: cover;
  background-position: left;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 650px) {
    background-position: left;
    }

  img {
    position: relative;
    bottom: 61px;
    width: 400px;
    height: 110px;
    @media (max-width: 450px) {
      width: 200px;
      height: 55px;
    }
`;
const Description = styled.div`
  display: block;
  position: relative;
  top: 20px;
  left: 30px;
  width: auto;
  height: 30px;
  font-family: "Trajan";
  color: white;
  font-size: 30px;
  letter-spacing: 2px;
  @media (max-width: 710px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
    left: 0;
  }
`;

const ButtonPlay = styled.div`
  position: relative;
  top: 60px;
  left: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 355px;
  height: 65px;
  border: 2px solid rgb(135, 149, 57);
  border-radius: 50px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
    -23px 0 20px -23px rgba(0, 0, 0, 0.8), 23px 0 20px -23px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(0, 0, 0, 0.1) inset;
  transition: 1s;
  &:hover {
    box-shadow: inset 55px 1px 5px 1px rgba(0, 0, 0, 0.5),
      inset 0 0 0 2em rgba(255, 255, 255, 0.5);
    transition: 1s;
  }
  div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: 60px;
    background-color: rgb(135, 149, 57);
    border-radius: 50px;
    transition: 1s;
    cursor: pointer;
    @media (max-width: 710px) {
      width: 200px;
    }
  }
  @media (max-width: 710px) {
    width: 200px;
  }
  @media (max-width: 480px) {
    position: relative;
    left: 0;
    bottom: 200px;
  }
`;

const ButtonText = styled.div`
  font-family: "Trajan";
  color: white;
  font-size: 30px;
  margin: 10px;
  @media (max-width: 710px) {
    font-size: 20px;
  }
`;

const Title = () => {
  const history = useHistory();

  const handleStartButtonClick = () => {
    history.push("/game");
  };

  return (
    <TittleBlock>
      <FullWrapper>
        <img src={Logo} />
        <div>
          <Description>Свет звезд укажет путь героям</Description>
          <ButtonPlay
            role="button"
            tabIndex="0"
            onClick={handleStartButtonClick}
          >
            <div>
              <ButtonText>НАЧАТЬ ИГРУ</ButtonText>
            </div>
          </ButtonPlay>
        </div>
      </FullWrapper>
    </TittleBlock>
  );
};

export default Title;
