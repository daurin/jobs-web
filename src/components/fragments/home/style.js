import { fade, makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    containerSearch: {
        backgroundColor: theme.palette.primary.main,
        padding:theme.spacing(5,3,5,3),
    },
    inputSearch: {
        padding: theme.spacing(0, 1, 0, 2),
        backgroundColor: fade(theme.palette.common.white, 0.20),
        color:'white',
        //backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        height: '55px',
        width:'100%',
        maxWidth:'650px',
        //color:'white',
        marginBottom:35,
        [theme.breakpoints.down('xs')]: {
            //padding:theme.spacing(0),
            //margin: theme.spacing(0, 0, 2, 0)
        },
    },
    inputSearchfocus:{
        backgroundColor: theme.palette.common.white,
        color:fade(theme.palette.common.black, 0.85),
    },
    inputSearchInput: {
        height: 45,
    },
    filterPanel:{
        maxWidth:'650px',
        color:theme.palette.common.white,
        backgroundColor: fade(theme.palette.common.white, 0.20),
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
    },
    filterPanelExpanded:{
        margin:'0 !important',
    },
    filterPanelSummary:{
        height:'56px !mportant',
        '&$expanded': {
            height:'56px !important',
        },
    },
    filterPanelSummaryExpanded:{
        height:'56px !mportant',
    },
    main:{
        display:'flex',
        width:'100%',
        maxWidth:'1180px',
        //padding:'45px 9%',
        padding:theme.spacing(5,3,5,3),
        
    }
}));