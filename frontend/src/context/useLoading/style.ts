import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Containter = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #0000004f;
  z-index: 100000;
  span{
    width: 40px;
    height: 40px;
    border: 5px solid ${({ theme })=> theme.colors.secondaryDark};
    border-left-color: ${({ theme })=> theme.colors.primary};
    border-radius: 50%;
    animation: ${spinAnimation} 0.8s linear infinite;
  }
`