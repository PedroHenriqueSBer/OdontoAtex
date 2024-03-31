import styled from "styled-components";

export const Header = styled.header`
  width: calc(100% - 2rem);
  padding: 1rem;
  background-color: ${({theme}) => theme.colors.white};
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px #00000027;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .logo{
    width: 10rem;
  }
`

export const ButtonHeader = styled.button`
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  transition: 300ms ease-in-out;
  &:hover{
    background-color: #5a7497;
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
`

export const MenuItemButton = styled.button<{warning?: boolean}>`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  gap: 0.5rem;
  justify-content: flex-start;
  width: 100%;
  color: ${({warning, theme})=> warning? '#b329298c' : theme.colors.text};
  &:hover{
    background: ${({warning, theme})=> warning? '#ff20200a' : theme.colors.background};
  }
  &.first{
    border-radius: 0.3rem 0.3rem 0 0;
  }
  &.last{
    border-radius: 0 0 0.3rem 0.3rem;

  }
`