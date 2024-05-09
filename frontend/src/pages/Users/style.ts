import styled from "styled-components";

export const Containter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  .center{
    width: 95%;
  }
`

export const Content = styled.div`
  height: fit-content;
  padding: 1rem;
  background: ${({theme}) => theme.colors.white};
  border-radius: 0.3rem;
  box-shadow: 0 0 5px #0233734d;
`