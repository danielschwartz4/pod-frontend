import styled from "styled-components";

export const LandingDivider = styled.hr`
  display: flex;
  justify-content: center;
  height: 1px;
  width: 80%;
  background-color: #ffdc93;
  margin: 75px 0px 25px 0px;
  outline: none;
`;

export const LandingBox = styled.div`
  text-align: center;
  max-width: 1200px;
  width: 100%;
`;

export const CenteredContainer = styled.div`
  display: flex;
  width: 400px;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background-color: #2d3748;
  border: 2px solid #ffdc93;
  border-radius: 15px;
  padding: 30px;
  margin: 0px;
  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

export const Font = styled.p`
  color: gainsboro;
  /* color: #FFDC93; // gold */
  font-family: "ubuntu";
  font-size: 24px;
  margin: 5px;
`;
