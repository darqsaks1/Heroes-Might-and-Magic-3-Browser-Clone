import React from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import King from "../../assets/images/knight.jpg.png";
import Elmor from "../../assets/images/elmor.png";
import GamePage from "../../assets/images/swiper/game.png";
import battlePage from "../../assets/images/swiper/battle.png";

const Background = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: url(${King});
  width: auto;
  height: 600px;
  background-position: center;
  background-size: cover;
  z-index: -1;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 715px) {
    justify-content: center;
  }

  @media (max-width: 415px) {
    display: none;
  }
`;

const ElmorBlock = styled.div`
  background: url(${Elmor});
  width: 500px;
  height: 500px;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 715px) {
    display: none;
  }
`;

const SwiperImg = styled.img`
  left: 30px;
  top: 30px;
  background: url(${GamePage});
  width: 600px;
  height: 500px;
  position: relative;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.6), 0px 0px 0px 11px white,
    0px 0px 0px 12px rgba(0, 0, 0, 0.2), 6px 6px 8px 17px #555;
  cursor: pointer;
  @media (max-width: 715px) {
    width: 70%;
    height: 80%;
    left: 0px;
    top: 0px;
    position: relative;
  }
`;

const SwiperBlock = () => {
  return (
    <Background
      className="wow fadeIn "
      data-wow-delay="0.3s"
      data-wow-duration="1s"
    >
      <Popup trigger={<SwiperImg />} modal closeOnDocumentClick>
        <img src={battlePage} alt="battle" width="100%" height="100%" />
      </Popup>
      <ElmorBlock className="wow fadeIn" data-wow-delay="1s" />
    </Background>
  );
};

export default SwiperBlock;
