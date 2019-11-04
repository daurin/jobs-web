import {  makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    root:{
        boxShadow:'none',
        backgroundColor:'#f1f1f1',
        borderRadius:'0',
        "&:hover": {
            backgroundColor: '#e9e9e9',
            cursor:'pointer'
        },
    },
    cardContent:{
        height:'120px',
        minHeight:'120px',
        maxHeight:'120px',
        maxWidth:'80vw',
    },
    description:{
        [theme.breakpoints.down('xs')]: {
            
        }, 
    },
    link:{
        textDecoration: 'inherit',
        color: 'inherit'
    }
}));