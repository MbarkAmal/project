import React, { useState } from "react";
import styled from "styled-components";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f5e9e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease-in-out;
  transform: translateX(${(props) => props.SlideIndex * -100}vw);
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #${(props) => props.bg};
`;
const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
`;
const Image = styled.div`
  height: 80%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;
const Slider = () => {
  const [SlideIndex, SetSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      SetSlideIndex(SlideIndex > 0 ? SlideIndex - 1 : 2);
    } else if (direction === "right") {
      SetSlideIndex(SlideIndex < 2 ? SlideIndex + 1 : 0);
    }
  };

  return (
    <div>
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <WestIcon />
        </Arrow>
        <Wrapper SlideIndex={SlideIndex}>
          {sliderItems.map((item) => {
            return (
              <Slide bg={item.bg} key={item.id}>
                <ImageContainer>
                  <Image src={item.img} />
                </ImageContainer>
                <InfoContainer>
                  <Title>{item.title}</Title>
                  <Desc>{item.desc}</Desc>
                  <Button>SHOP NOW </Button>
                </InfoContainer>
              </Slide>
            );
          })}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <EastIcon />
        </Arrow>
      </Container>
    </div>
  );
};

export default Slider;
