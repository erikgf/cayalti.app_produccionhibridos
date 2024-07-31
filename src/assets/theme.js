import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32"
    },
    secondary: {
      main:"#00902f"
    },
    terciary : {
      main: "#ce6b01",
      contrastText: "white"
    },
    pale: {
     main: '#FCF4D9',
     contrastText: '#383838',
    }
  },
});
