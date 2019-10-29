import {  makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    root:{
        boxShadow:'none',
        backgroundColor:'#f1f1f1',
        borderRadius:'0',
    },
    cardContent:{
        height:'75px',
        minHeight:'75px',
        maxHeight:'75px',
    },
    description:{
        [theme.breakpoints.down('xs')]: {
            maxWidth:'300px'
        }, 
    }
}));