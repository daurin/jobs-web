import { fade, makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    root: {
        //minWidth:'200px',
        padding: theme.spacing(0, 1, 0, 2),
        backgroundColor: fade(theme.palette.common.white, 0.20),
        color:'white',
        borderRadius: theme.shape.borderRadius,
        minHeight: '55px',
    },
    inputSearchfocus:{
        backgroundColor: theme.palette.common.white,
        color:fade(theme.palette.common.black, 0.85),
    },
    inputSearchInput: {
        height: 45,
    },
}));