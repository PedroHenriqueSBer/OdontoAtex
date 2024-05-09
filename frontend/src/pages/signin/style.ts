import styled from "styled-components";

export const Container = styled.div`
  width: 100vp;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Content = styled.div`
  @media (min-width: 800px) {
    display: flex;
    box-shadow: 0 0 20px #00000038;
    height: fit-content;
    border-radius: 1rem;
    background-color: ${({theme: {colors: {white}}}) => white};
  }
`

export const Sidebar = styled.div`
  display: none;
  @media (min-width: 800px) {
    background-color: #E9F2F1;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 4rem 2rem;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    h1{
      margin: 0;
      padding: 0;
      color: ${({theme: {colors: {primary}}}) => primary};
    }
    h2{
      padding: 0;
      margin: 0;
      color: ${({theme: {colors: {primary}}}) => primary};
      span{
        border-bottom: 2px solid;
      }
    }
  }
`

export const Main = styled.form`
  padding: 2rem 1rem;
  @media (min-width: 800px) {
    padding: 2rem 6rem;
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h1{
    margin: 0;
    margin-bottom: 2rem;
    font-weight: 300;
    letter-spacing: 0.3rem;
    color: ${({theme: {colors: {primary}}}) => primary};
    @media (max-width: 800px) {
      font-size: 1.7rem;
    }
  }
  .content{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .btnContent{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`

export const Helpertext = styled.span`
  font-size: 0.8rem;
  color: ${({theme}) => theme.colors.red};
  margin-left: 1rem;
`

export const Button = styled.button<{primary?: boolean}>`
  box-shadow: 0 0 5px #00000038;
  padding: 0.8rem 2rem;
  width: fit-content;
  font-size: 1rem;
  border-radius: 2rem;
  color: ${({theme, primary}) => primary? theme.colors.white : theme.colors.primary};
  background-color: ${({theme, primary}) => primary? theme.colors.primary : theme.colors.white};
  align-self: center;
  &:hover{
    box-shadow: 0 0 5px #00000060;
    filter: brightness(0.99);
  }
`

export const Fieldset = styled.fieldset<{error?: boolean}>`
  background-color: ${({theme: {colors: {white}}}) => white};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 3rem;
  border: none;
  color: ${({error, theme}) => error === true? theme.colors.red : theme.colors.text};
  box-shadow: 0 0 5px ${({error}) => error === true? '#fc000067' : '#00000038'} ;
  div{
    padding: 0.3rem 0.6rem;
    border-right: 1.4px solid ${({error, theme}) => error === true? theme.colors.red : theme.colors.text};
  }
  input{
    width: 100%;
    border: none;
    font-size: 0.8rem;
    background: none;
  }
`

export const ButtonLink = styled.button`
  align-self: flex-end;
  font-size: 0.7rem;
  color: ${({theme})=> theme.colors.primary};
  border-bottom: 1.4px solid;
`