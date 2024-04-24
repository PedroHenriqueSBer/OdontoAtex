import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string,
    colors: {
      primary: string, 
      primaryDark: string, 
      secondary: string, 
      secondaryDark: string, 
      white: string, 
      background: string, 
      text: string, 
      red: string, 
      yellow: string, 
      green: string, 
    },
  }
}
