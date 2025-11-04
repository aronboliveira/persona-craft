import { GlobalStyles } from "@mui/material";

<GlobalStyles
  styles={{
    "html, body": {
      backgroundColor: "#090909",
      backgroundImage: `
          radial-gradient(1200px 800px at 10% -20%, rgba(108,242,255,.07), transparent 60%),
          radial-gradient(1000px 600px at 90% -30%, rgba(255,105,212,.06), transparent 55%)
        `,
    },
    "body::before": {
      content: '""',
      position: "fixed",
      inset: 0,
      background: "linear-gradient(rgba(255,255,255,.03), rgba(0,0,0,0) 60%)",
      pointerEvents: "none",
      mixBlendMode: "overlay",
    },
  }}
></GlobalStyles>;
