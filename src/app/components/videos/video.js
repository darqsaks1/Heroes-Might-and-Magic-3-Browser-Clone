import React from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { Player } from "video-react";
import buttonPlay from "../../assets/images/button.svg";
import People from "../../assets/images/people.jpg";
import Battle from "../../assets/images/battle.jpg";
import orc from "../../assets/images/orc.png";
import gameVideo from "../../assets/video/game.mp4";
import battleVideo from "../../assets/video/battle.mp4";
const VideoBlock = styled.div`
  height: 650px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-image: url(${orc});
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 35%;
  background-color: white;
  overflow: hidden;
`;
const FlexColunm = styled.div`
  position: relative;
  left: 100px;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 850px) {
    justify-content: flex-start;
    align-items: flex-start;
    left: 0px;
  }
`;

const WorldPortret = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url(${People});
    border-top: 2px solid #60aaf6;

    background-size: cover;
    width: 275px;
    height: 430px;
    margin: 20px;
    background-position: center top;
    background-repeat: no-repeat;
    border-radius: 3%;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      width: 305px;
      height: 480px;
      transition: 0.5s;
      opacity: 0.7;
      border: 2px solid #60aaf6;
      align-items: center;
       div {

        transition: 0.5s;
          margin-top: 200px;
      }
       }
      @media (max-width:600px) {
        width: 255px;
      height: 420px;

    }
    }
        @media (max-width:850px) {
          margin: 10px;
        }
    @media (max-width:600px) {
    width: 225px;
    height: 380px;

    }
      img {
        top: 200px;
        transition: 0.5s;
        margin-bottom: 0px;
      }

      div {
        transition: 0.5s;
          background-color:#60aaf6 ;
      }
    }

    img {
      transition: 0.5s;
      width: 50%;
      height: 50%;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 100%;
      height: 30%;
      font-family: "Trajan";
      font-size: 30px;
      color: white;
      background: rgba(0, 170, 238, 0.5);

      border-radius: 3%;

      @media (max-width:600px) {
        font-size: 15px;

    }
`;
const BattlePortret = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: url(${Battle});
border-top: 2px solid #e85340;
width: 275px;
height: 430px;
margin: 20px;
background-size: cover;
background-position: center top;
background-repeat: no-repeat;
border-radius: 3%;
transition: 0.5s;
cursor: pointer;
&:hover {
  width: 305px;
  height: 480px;
  transition: 0.5s;
  opacity: 0.7;
  border: 2px solid #e85340;
  div {

transition: 0.5s;
  margin-top: 200px;
}
  @media (max-width:600px) {
        width: 255px;
      height: 420px;
  }
    }
    @media (max-width:850px) {
          margin: 10px;
        }
    @media (max-width:600px) {
    width: 225px;
    height: 380px;

    }

  img {
    top: 200px;
    transition: 0.5s;

  }
  div {
      background-color:#e85340 ;
  }
}
img {
  transition: 0.5s;
  width: 50%;
  height: 50%;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 30%;
  font-family: "Trajan";
  font-size: 30px;
  color: white;
  background: rgba(232,85,66, 0.5);
  border-radius: 3%;
  transition: 0.5s;
  @media (max-width:600px) {
        font-size: 15px;

    }
}
`;
const Video = () => {
  return (
    <VideoBlock>
      <FlexColunm
        className="wow fadeIn "
        data-wow-delay="0.3s"
        data-wow-duration="1s"
      >
        <Popup
          trigger={
            <WorldPortret>
              <img src={buttonPlay} />
              <div>Исследуй мир</div>
            </WorldPortret>
          }
          modal
          closeOnDocumentClick
        >
          <Player playsInline src={gameVideo} />
        </Popup>
        <Popup
          trigger={
            <BattlePortret>
              <img src={buttonPlay} />
              <div>Сражайся</div>
            </BattlePortret>
          }
          modal
          closeOnDocumentClick
        >
        <Player playsInline src={battleVideo} />
        </Popup>
      </FlexColunm>
    </VideoBlock>
  );
};

export default Video;
