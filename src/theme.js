import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  textColor: "#1a1a1a",
  backgroundColor: "#f3f4f6",
  cardBackgroundColor: "#ffffff",
  primaryColor: "#800080",
  secondaryColor: "#9932cc",
};

export const darkTheme = {
  textColor: "#ffffff",
  backgroundColor: "#1a1a1a",
  cardBackgroundColor: "#2d2d2d",
  primaryColor: "#800080",
  secondaryColor: "#9932cc",
};

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
  }
`;
