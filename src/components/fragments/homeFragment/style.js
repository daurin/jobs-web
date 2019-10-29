import { fade, makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    containerSearch:{
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',    
        backgroundColor: theme.palette.primary.main,
        padding:theme.spacing(8,2,8,2),
    },
    titleSearch:{
        maxWidth:'500px',
        textAlign:'center',
        color:'white',
        //marginTop:'65px',
        marginBottom:'40px',
        
    },
    inputSearch: {
        width:'100%',
        maxWidth:'670px',
        //marginBottom:'45px'
    },
    main:{
        display:'flex',
        minHeight:'400px',
        //width:'100%',
        maxWidth:'1180px',
        //padding:'45px 9%',
        padding:theme.spacing(5,2,5,2)
        
    }
}));