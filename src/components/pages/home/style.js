import { makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    color:'white',
    position: 'fixed',
    transitionDuration:1000*2,
    boxShadow:'none',
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
  appBarTitle:{
    flexGrow:1
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
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end'
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
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  }
}));