import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`	
  *{
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    ::-webkit-scrollbar {
      width: 8px;
      background-color: ${({ theme }) => theme.colors.white};
      border-radius: 10px;
    }
    ::-webkit-scrollbar:horizontal {
      height: 5px;
    }
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-track-horizontal {
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-thumb:horizontal {
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 10px;
    }
    font-family: "Futura PT", "Roboto", sans-serif !important;
  }


  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${({theme})=> theme.colors.white} inset;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: ${({theme})=> theme.colors.text} !important;
  }

  html, body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    min-width: 320px;
    overflow: auto;
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

  input:focus{
    outline: 0;
  }
`;
