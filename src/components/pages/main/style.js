import { fade,makeStyles} from "@material-ui/core/styles";
const drawerWidth = 240;

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    height:'100%',
    minHeight:'100%'
  },
  appBar: {
    color:'white',
    position: 'fixed',
    transitionDuration:1000*2,
    //boxShadow:'none'
  },
  appBarTitle:{
    flexGrow:2
  },
  search:{
    flexGrow:5,
    flexShrink:0,
    [theme.breakpoints.down('xs')]: {
      
    },    
  },
  ActionContainer:{
    display:'flex',
    justifyContent:'flex-end',
    flexGrow:3
  },
  appBarShift:{
    [theme.breakpoints.up('sm')]: {
      
    },
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.leavingScreen,
    // })
  },
  menuButton: {
    color:'white',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      
    },
  },
  drawer: {
    zIndex:0
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    anchor: 'left',
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - 64px)`,
      marginTop:64,
      flexShrink: 0,
    },
  },
  content: {
    backgroundColor:'#FAFAFA',
    flexGrow: 1,
    //padding: theme.spacing(5,12,0,12),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]:{
      //padding: theme.spacing(2,2,0,2),
    }
  },
  contentShift: {
    [theme.breakpoints.up('sm')]:{  
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: drawerWidth,
    }
  },
  hide: {
    display:'none'
  },
  footer:{
    position:'relative',
  }
}));