"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#49657e",
      light: "#88a6c0",
      dark: "#1e2f3d",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#656e41",
      light: "#8a9465",
      dark: "#4a522e",
      contrastText: "#ffffff"
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828"
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100"
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b"
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20"
    },
    background: {
      default: "#e5e3e1",
      paper: "#ffffff"
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
      disabled: "#888888"
    }
  }
});
