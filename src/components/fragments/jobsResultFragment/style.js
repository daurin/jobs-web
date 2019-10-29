import { fade, makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    containerSearch: {
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor: theme.palette.primary.main,
        padding:theme.spacing(5,1,5,1)
    },
    inputSearch: {
        flexGrow:5,
        flexShrink:1,
        minWidth:'300px',
        maxWidth:'550px',
        margin:'8px',
        height:'55px'
    },
    filterPanel:{
        flexGrow:5,
        flexShrink:1,
        //flexBasis:'50%',
        minWidth:'300px',
        maxWidth:'550px',
        minHeight:'55px',
        margin:'8px',
        color:theme.palette.common.white,
        backgroundColor: fade(theme.palette.common.white, 0.20),
        boxShadow: 'none',
        borderRadius: theme.shape.borderRadius,
        '&:before': {
            display: 'none',
        },
    },
    filterPanelExpanded:{
        margin:'8px !important',
    },
    filterPanelSummary:{
        minHeight:'55px',
    },
    filterPanelSummaryExpanded:{
        margin:'0 !important',
    },
    main:{
        display:'flex',
        minHeight:'400px',
        width:'100%',
        maxWidth:'1180px',
        //padding:'45px 9%',
        padding:theme.spacing(5,2,5,2)
        
    }
}));