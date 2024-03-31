import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`	
  *{
    font-family: sans-serif;
  }
  html, body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: ${({theme}) => theme.colors.background};
  }

  button{
    background: none;
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
