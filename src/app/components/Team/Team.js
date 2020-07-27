import React from "react";
import styled from "styled-components";
import DarqSaks from "../teammates/Darqsaks";
import BozorgVlad from "../teammates/BozorgVlad";
import TeamHeader from "../team-header/TeamHeader";
import TeamBg from "../../assets/images/war.png";

const TeamBlock = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1203px) {
    flex-direction: column;
  }
`;
const Quote = styled.div`
  width: 60%;
  font-family: "Trajan";
  margin: 0 auto;
  position: relative;
  top: 100px;
  font-weight: bold;
  font-size: 20px;
  span {
    font-size: 40px;
    color: black;
  }
`;

const TeamBlockBackground = styled.div`
  background: url("${TeamBg}");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
   @media (max-width: 827px) {
     height: 1000px;
  }
  @media (max-width: 680px) {
     height: 1200px;
  }
  @media (max-width: 429px) {
     height: 1400px;
  }
`;
const VideoPlayer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: auto;
  font-family: "Trajan";
  margin: 0 auto;
  position: relative;
  top: 150px;
  padding: 30px;
  font-weight: bold;
  font-size: 20px;
  iframe {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    border-radius: 20px;
    @media (max-width: 429px) {
      width: 270px;
      height: 150px;
    }
  }
`;

const Team = () => {
  return (
    <div>
      <TeamHeader />
      <TeamBlockBackground>
        <TeamBlock>
          <DarqSaks />
          <BozorgVlad />
        </TeamBlock>
        <Quote>
          <span>“</span>Если бы наш проект был тайота камри, то Артем отвечал бы
          за то, что это Тайота Камри, а Влад за то, что у нее 1000 сил
          <span>”</span>{" "}
        </Quote>
        <VideoPlayer>
          <iframe
            width="400px"
            height="230px"
            src="https://www.youtube.com/embed/mexNMz8P_-A"
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <iframe
            width="400"
            height="230"
            src="https://www.youtube.com/embed/QNgw35lnlII"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoPlayer>
      </TeamBlockBackground>
    </div>
  );
};

export default Team;
