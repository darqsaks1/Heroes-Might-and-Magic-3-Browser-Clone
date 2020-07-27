import React from "react";
import styled from "styled-components";
import about from "../../assets/text/about";
import Knight from "../../assets/images/warrior.png";
import Orc from "../../assets/images/org.png";

const AboutContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 600px;
  overflow: hidden;
  z-index: -1;
  background-color: white;
`;

const KnightImage = styled.img`
  position: relative;
  top: 20px;
  left: -120px;
  width: 450px;
  height: 400px;
  @media (max-width: 500px) {
  display:none;
  }
`;

const BlockText = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Trajan";
  line-height: normal;
  text-align: center;
  font-size: 18px;
  position: relative;
  top: 0px;
  @media (max-width: 1260px) {
    font-size: 14px;
  }
  @media (max-width: 1100px) {
    font-size: 11px;
  }
  h2 {
    position: relative;
    top: -40px;
    font-size: 38px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;
const OgrImage = styled.img`
  position: relative;
  top: 110px;
  left: 100px;
  z-index: 2;
  width: 400px;
  height: 500px;
  @media (max-width: 500px) {
  display:none;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <KnightImage
        src={Knight}
        className="wow fadeInLeft"
        data-wow-delay="0.3s"
      />
      <BlockText>
        <h2>Вступай в бой !</h2>
        <div>{about}</div>
      </BlockText>
      <OgrImage src={Orc} className="wow fadeInRight" data-wow-delay="0.3s" />
    </AboutContainer>
  );
};

export default About;
