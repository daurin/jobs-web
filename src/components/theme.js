import {createMuiTheme } from '@material-ui/core/styles';  

export default createMuiTheme({
    palette: {
      primary: {
        main: '#26c6da',
        light: '#6ff9ff',
        dark: '#0095a8'
      },
      secondary: {
        main: '#1de9b6',
        light: '#6effe8',
        dark: '#00b686'
      },
    },
    typography: { 
      useNextVariants: true
    },
    //shadows: ["none"]
});