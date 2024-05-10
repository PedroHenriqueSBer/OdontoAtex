import styled from "styled-components";

export const Containter = styled.div`
`

export const HomeImage = styled.div`
  div{
    background: ${({theme}) => theme.colors.white};
    width: fit-content;
    padding: 1rem 2rem;
    border-radius: 2rem;
    background-attachment: fixed;
    box-shadow: 0 0 5px #25252533;
    position: absolute;
    top: 8rem;
    left: 5rem;
  }
  height: 40rem;
  background-size: cover;
  background-image: url('https://github.com/PedroHenriqueSBer/OdontoAtex/blob/HomePage/frontend/src/assets/backgroundHome.png?raw=true');
`

export const HomeContent = styled.div`

`