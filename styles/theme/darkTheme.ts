import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    typography: {
        fontFamily: 'Oswald, sans-serif',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 900,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#312F34',
                    letterSpacing: '2px',
                }
            }
        }
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#CE8F2D',
            light: '#E2B978',
            dark: '#674817',
            contrastText: '#ECCFA2'

        },
        secondary: {
            main: '#312F34',
            light: '#949199',
            dark: '#262529',
            contrastText: '#807D85'
        },
    }
})