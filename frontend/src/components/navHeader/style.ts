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

export const MenuItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 0.3rem;
  box-shadow: 0 0 1rem #00000017;
  margin-right: 0.5rem;
  margin-top: -0.5rem;
`

interface MenuItemButtonProps {
  variant: 'warning' | 'default'
}

export const MenuItemButton = styled.button<MenuItemButtonProps>`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  gap: 0.5rem;
  justify-content: flex-start;
  width: 100%;
  color: ${({variant, theme})=> variant === "warning"? '#b329298c' : theme.colors.text};
  &:hover{
    background: ${({variant, theme})=> variant === "warning"? '#ff20200a' : theme.colors.background};
  }
  &.first{
    border-radius: 0.3rem 0.3rem 0 0;
  }
  &.last{
    border-radius: 0 0 0.3rem 0.3rem;

  }
`