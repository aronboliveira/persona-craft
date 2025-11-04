import { createTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6cf2ff" }, // cyan neon
    secondary: { main: "#ff69d4" }, // magenta neon
    warning: { main: "#ffcc33" },
    info: { main: "#5aa9ff" },
    background: {
      default: "#090909",
      paper: alpha("#0e0f14", 0.8),
    },
    divider: alpha("#6cf2ff", 0.24),
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "Avenir",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    h6: { letterSpacing: 0.4, fontWeight: 800 },
    body2: { letterSpacing: 0.2 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "saturate(140%) blur(6px)",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.00))",
          border: "1px solid rgba(108,242,255,.18)",
          boxShadow:
            "0 0 0 1px rgba(108,242,255,.08) inset, 0 10px 30px rgba(0,0,0,.4)",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          position: "relative",
          overflow: "hidden",
          borderWidth: 2,
          "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(80% 220% at 50% -20%, rgba(255,255,255,.12) 0%, rgba(255,255,255,0) 60%)",
            pointerEvents: "none",
          },
          "&:after": {
            content: '""',
            position: "absolute",
            inset: -2,
            borderRadius: 12,
            background:
              "linear-gradient(90deg, #6cf2ff55, #ff69d455, #ffd16655)",
            filter: "blur(10px)",
            opacity: 0,
            transition: "opacity .25s ease",
            pointerEvents: "none",
          },
          "&:hover:after, &:focus-visible:after": { opacity: 1 },
        },
        containedPrimary: {
          background: "linear-gradient(180deg, #1a2a3b 0%, #0f1722 100%)",
          borderColor: "#6cf2ff88",
        },
        outlinedInfo: {
          borderColor: alpha("#5aa9ff", 0.65),
          "&:hover": { borderColor: "#5aa9ff" },
        },
        outlinedWarning: {
          borderColor: alpha("#ffcc33", 0.65),
          "&:hover": { borderColor: "#ffcc33" },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(108,242,255,.18)",
          "&::before, &::after": { borderColor: "inherit" },
        },
      },
    },
  },
});
