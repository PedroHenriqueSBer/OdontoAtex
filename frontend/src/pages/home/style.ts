import styled from "styled-components";

export const Containter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 900px) {
    gap: 1rem;
  }
`

export const HomeImage = styled.div`
  div{
    background: ${({theme}) => theme.colors.white};
    width: fit-content;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    box-shadow: 0 0 5px #25252533;
    position: relative;
    top: 5rem;
    left: 1rem;
    @media (min-width: 900px) {
      padding: 1rem 2rem;
      top: 8rem;
      left: 5rem;
    }
  }
  height: 40rem;
  background-size: cover;
  background-image: url('/assets/backgroundHomeMobile.png');
  @media (min-width: 900px) {
    background-image: url('/assets/backgroundHome.png');
  }
  h1{
    color: ${({theme}) => theme.colors.primary};
    font-size: 1.4rem;
    @media (min-width: 900px) {
      font-size: 1.7rem;
    }
  }
`

export const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  h1{
    color: ${({theme}) => theme.colors.primary};
    font-size: 1.4rem;
    margin: 0;
    @media (min-width: 900px) {
      font-size: 2rem;
    }
  }
  span{
    text-align: center;
    font-size: 0.9rem;
    @media (min-width: 900px) {
      font-size: 1.2rem;
    }
    color: ${({theme}) => theme.colors.text};
  }
  button{
    font-size: 1.4rem;
    padding: 1rem 2rem;
    border-radius: 2rem;
    display: none;
    @media (min-width: 900px) {
      display: block;
    }
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
  h1{
    color: ${({theme}) => theme.colors.primary};
    font-size: 1.4rem;
    margin: 0;
    @media (min-width: 900px) {
      font-size: 2rem;
    }
  }
`
