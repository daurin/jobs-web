import { makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    signInContainer:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding:20
    },
    avatar:{
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    btnSubmit: {
        margin: theme.spacing(2, 0, 2),
        color:'white'
    },
    btnSubmitProgress:{
        color: theme.palette.primary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    },
    linkSignUp:{
        float:'right'
    }
}));