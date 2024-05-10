import styled from "styled-components";

export const Containter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const HomeImage = styled.div`
  div{
    background: ${({theme}) => theme.colors.white};
    width: fit-content;
    padding: 1rem 2rem;
    border-radius: 2rem;
    box-shadow: 0 0 5px #25252533;
    position: relative;
    top: 8rem;
    left: 5rem;
  }
  height: 40rem;
  background-size: cover;
  background-image: url('https://github.com/PedroHenriqueSBer/OdontoAtex/blob/HomePage/frontend/src/assets/backgroundHome.png?raw=true');
`

export const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  span{
    text-align: center;
    font-size: 1.2rem;
    color: ${({theme}) => theme.colors.text};
  }
  button{
    font-size: 1.2rem;
    padding: 1rem 2rem;
    border-radius: 2rem;
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.white};
  }
  img{
    width: 5rem;
    height: 5rem;
  }
`

export const HomeFooter = styled.div`
  padding: 1rem 2rem;
  background-color: ${({theme}) => theme.colors.white};
`
