import styled from "styled-components";

export const Header = styled.header<{position?: 'fixed' | 'absolute'}>`
  z-index: 1;
  position: ${({position}) => position ?? 'auto'};
  padding: 1rem;
  background-color: ${({theme}) => theme.colors.white};
  display: flex;
  align-items: center;
  width: calc(100% - 2rem);
  box-shadow: 0 0 10px #00000027;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .logo{
    width: 10rem;
    @media (max-width: 899px) {
      width: 2rem;
    }
  }
  .mobile{
    @media (min-width: 900px) {
      display: None;
    }
  }
  .desktop{
    @media (max-width: 899px) {
      display: None;
    }
  }
`

export const ButtonHeader = styled.button`
  gap: 0.5rem;
  padding: 0.6rem;
  border-radius: 0.3rem;
  font-size: 0.83rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  transition: 400ms ease-in-out;
  &:hover{
    box-shadow: 0 0 1rem #0000002f;
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }
`