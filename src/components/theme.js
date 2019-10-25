import {createMuiTheme } from '@material-ui/core/styles';  

export default createMuiTheme({
    palette: {
      primary: {
        main: '#2196f3',
        light: '#6ec6ff',
        dark: '#0069c0'
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