import {  makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    root:{
        padding:theme.spacing(5,2,5,2),
    },
    container:{
        margin:'auto',
        maxWidth:'1100px'
    },
    title:{
        
    },
    jobMetadata:{
        display:'inline-block',
        padding:'10px',
        marginBottom:'15px'
    },
    jobMetadataItem:{
        display:'inline-block',
        marginRight:'20px',
        color:theme.palette.secondary.dark,
    }
}));