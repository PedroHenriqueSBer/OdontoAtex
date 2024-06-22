import styled from "styled-components";

export const Container = styled.div`

`

export const Content = styled.li<{
  marginX: string
  marginY: string
}>`
  position: absolute;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 0.3rem;
  box-shadow: 0 0 1rem #00000017;
  margin-left: ${({marginX}) => marginX};
  margin-top: ${({marginY}) => marginY};
  display: flex;
  flex-direction: column;
  z-index: 20;
`;

export const Button = styled.button`
  width: fit-content;
  height: fit-content;
`;

export const MenuItemButton = styled.button<{variant: 'warning' | 'default'}>`
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
`;