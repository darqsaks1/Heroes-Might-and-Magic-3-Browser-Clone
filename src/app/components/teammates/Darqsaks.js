import React from "react";
import styled from "styled-components";
import DarqImg from "../../assets/images/team/artem.png";
import link from "../../assets/images/sites/link.png";
import git from "../../assets/images/sites/svg.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 10px;
  @media (max-width: 677px) {
    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  width: 80%;
  height: 90%;
`;
const Photo = styled.div`
      display:block;
      background: url('${DarqImg}');
      background-size:cover;
      background-position: center;
      width: 245px;
      height: 205px;
      border-radius: 5px;

      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`;
const Social = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-family: "Trajan";
    font-size: 30px;
  }
`;
const About = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  @media (max-width: 677px) {
    flex-direction: column;
  }
`;

const Link = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  a {
    padding: 10px;
    font-family: "Trajan";
    font-size: 20px;
    text-decoration: none;
    color: black;

    &:hover {
      color: red;
      cursor: pointer;
    }
  }
`;

const Darqsaks = () => {
  return (
    <Container>
      <Wrapper>
        <About>
          <Photo />
          <Social>
            <h2> Артем статута </h2>
            <Link>
              <a href="https://www.linkedin.com/in/darqsaks1/">
                <img src={link} width="30px" height="30px" alt="link" />
              </a>
              <a href="https://github.com/darqsaks1">
                <img src={git} width="30px" height="30px" alt="link" />
              </a>
              <a href="https://www.linkedin.com/in/darqsaks1/">darqsaks1</a>
            </Link>
          </Social>
        </About>
      </Wrapper>
    </Container>
  );
};

export default Darqsaks;
