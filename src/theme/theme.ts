import { createTheme } from '@mui/material/styles';

const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#7B1FA2',
      light: '#AE52D4',
      dark: '#4A0072',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFC107',
      light: '#FFF350',
      dark: '#C79100',
      contrastText: '#000000',
    },
    background: {
      default: '#F3E5F5',
      paper: '#EDE7F6',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },
  },
});

export default purpleTheme;
