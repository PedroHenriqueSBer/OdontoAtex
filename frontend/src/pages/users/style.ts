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
  padding: 1rem;
  background: ${({theme}) => theme.colors.white};
  border-radius: 0.3rem;
  box-shadow: 0 0 5px #0233734d;
  overflow: auto;
`

export const CardUser = styled.div`
  box-shadow: 0 0 5px #00000044;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h4{
    margin: 0;
    color: ${({theme})=>theme.colors.primary};
    font-weight: 600;
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 10rem;
    @media (min-width: 1200px) {
      max-width: 12rem;
    }
    @media (min-width: 1300px) {
      max-width: 15rem;
    }
    @media (min-width: 1500px) {
      max-width: 19rem;
    }
    @media (min-width: 4000px) {
      max-width: 24rem;
    }
  }
  h5{
    margin: 0;
    color: ${({theme})=>theme.colors.text};
  }
  .content{
    display: flex;
    align-items: center;
    gap: 0.4rem;
    div{
      display: flex;
      flex-direction: column;
    }
  }
`

export const InfoContent = styled.div`
  overflow: auto;
  padding: 1rem;
  max-height: 35vh;
`