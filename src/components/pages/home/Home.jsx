import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton,Typography,Divider,List,ListItem,ListItemText,ListItemIcon,Hidden,
SwipeableDrawer,Button} from '@material-ui/core';
import {Menu as MenuIcon,ChevronLeft as ChevronLeftIcon,ArrowBack as ArrowBackIcon} from '@material-ui/icons';
import useStyles from './style.js';
import PageNotFound from '../PageNotFound';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useDispatch,useSelector} from 'react-redux';
import {logOut} from '../../../redux/actions/userActions';

export default (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const isMovil=!useMediaQuery(theme.breakpoints.up('sm'));

  // State
  const [drawerOpen, setDrawerOpen] = useState(true);

  // Redux
  const dispatch=useDispatch();
  const logOutDispatch=()=>dispatch(logOut());

  // Effect
  useEffect(()=>{
    setDrawerOpen(!isMovil);
  },[isMovil]);

  let main=null;
  switch(props.location.pathname){
    case '/':main='Home';break;
    case '/warehouses':main='Almacenes';break;
    case '/articles':main='Aticulos';break;
    case '/providers':main='Proveedores';break;
    case '/clients':main='Clientes';break;
    default: main=null;break;
  }

  // partials
  const drawerContainer = (
    <div>
      <div className={classes.drawerHeader}>
        
      </div>
      <Divider />
      <List>
        {[
          {
            title:'Inicio',
            route:'/'
          },
          {
            title:'Articulos',
            route:'/articles'
          },
          {
            title:'Almacen',
            route:'/warehouses'
          },
          {
            title:'Proveedores',
            route:'/providers'
          },
          {
            title:'Clientes',
            route:'/clients'
          },
        ].map((v,i) => (
          <Link style={{textDecoration:'none',color:'inherit'}} to={v.route}>
            <ListItem selected={v.route===props.location.pathname} button key={i}
              onClick={()=>{
                if(isMovil)setDrawerOpen(false);
              }}>
              <ListItemText primary={v.title}/>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  if(main===null)return <PageNotFound/>
  return (
    <div className={classes.root}>
      <AppBar className={clsx(classes.appBar,{[classes.appBarShift]: drawerOpen})} >
        <Toolbar>
          <IconButton
            className={clsx(classes.menuButton)}
            aria-label="open drawer"
            edge="start"
            onClick={()=>setDrawerOpen(!drawerOpen)}>
            {false? <ArrowBackIcon/>:<MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap className={classes.appBarTitle}>
            WMS
          </Typography>
          <Button style={{color:'white'}} size='large' 
            onClick={()=>{
              logOutDispatch();
              window.location.reload(true);
            }}>Salir</Button>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        className={clsx(classes.drawer)}
        classes={{paper: classes.drawerPaper}}
        variant={isMovil?'temporary':'persistent'}
        open={drawerOpen}
        onOpen={()=>setDrawerOpen(true)}
        onClose={()=>setDrawerOpen(false)}
        swipeAreaWidth={17}
        ModalProps={{
          keepMounted: false, // Better open performance on mobile.
        }}>
        {drawerContainer}
      </SwipeableDrawer>
      <main className={clsx(classes.content,{[classes.contentShift]: drawerOpen})}>
        <div className={classes.drawerHeader} />
          {main}
      </main>
    </div>
  );
}