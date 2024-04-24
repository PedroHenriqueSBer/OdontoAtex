import styled from "styled-components";

export const Containter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
`

export const Content = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1rem #0000001e;
  background-color: ${({theme})=> theme.colors.white};
  padding: 2rem;
  border-radius: 0.5rem;
  gap: 1rem;
  h2{
    margin: 0;
    color: ${({theme})=> theme.colors.primary};
  }
`