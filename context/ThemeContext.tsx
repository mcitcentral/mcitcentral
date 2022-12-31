import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue, red, grey } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: red[300],
    },
    text: {
      primary: grey[900],
      secondary: grey[500],
    },
  },
  overrides: {
    MuiButton: {
      text: {
        color: "white",
      },
    },
  },
});

export const ThemeLayout: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
