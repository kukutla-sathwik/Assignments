import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: dark;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: inherit;
  }

  input, button {
    font-family: inherit;
  }
`;

export const theme = {
  colors: {
    background: "#0d1117",
    surface: "#161b22",
    surfaceSoft: "#1f2430",
    text: "#e6edf3",
    textMuted: "#8b949e",
    accent: "#238636",
    accentHover: "#2ea043",
    border: "#30363d",
    dangerBg: "#2f1517",
    dangerBorder: "#6a1a21",
  },
  radius: {
    md: "8px",
    lg: "12px",
    full: "999px",
  },
  shadow: {
    soft: "0 4px 12px rgba(0,0,0,0.4)",
  },
};
