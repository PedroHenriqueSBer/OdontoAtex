import styled from "styled-components";

export const Container = styled.div<{error?: boolean}>`
  width: fit-content;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: 0 0 20px #00000038;
  min-width: 14rem;
  h1{
    margin: 0;
    font-size: 1.3rem;
    align-items: center;
    color: ${({theme, error}) => error? theme.colors.red : theme.colors.text};
    display: flex;
    gap: 0.3rem;
  }
`

export const Content = styled.div`
  padding: 1rem 0.5rem;
`

export const ButtonContent = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  gap: 0.3rem;
`