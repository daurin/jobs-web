import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Box, Toolbar, InputBase, IconButton, Typography, Divider, List, ListItem, ListItemText,
  ListItemIcon, Hidden, InputAdornment,Avatar,
  SwipeableDrawer, Button, ListSubheader
} from '@material-ui/core';
import { Menu as MenuIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style.js';
import PageNotFound from '../PageNotFound';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../redux/actions/userActions';
import Home from '../../fragments/home';
import Footer from '../../others/Footer/index.js';

export default (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const isMovil = !useMediaQuery(theme.breakpoints.up('sm'));

  // State
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const logOutDispatch = () => dispatch(logOut());

  // Effect
  useEffect(() => {
    //setDrawerOpen(!isMovil);
  }, [isMovil]);

  let main = null;
  switch (props.location.pathname) {
    case '/': main = (<Home/>); break;
    case '/warehouses': main = 'Almacenes'; break;
    case '/articles': main = 'Aticulos'; break;
    case '/providers': main = 'Proveedores'; break;
    case '/clients': main = 'Clientes'; break;
    default: main = null; break;
  }

  if (main === null) return <PageNotFound />
  return (
    <div className={classes.root}>
      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: drawerOpen })} >
        <Toolbar>
          <IconButton
            className={clsx(classes.menuButton)}
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}>
            {false ? <ArrowBackIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap className={classes.appBarTitle}>
            Empleos.do
            </Typography>
          <Box className={classes.ActionContainer}>
            <Button style={{ color: 'white' }}
              onClick={() => {

              }}>Publicar Empleo</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        className={clsx(classes.drawer)}
        classes={{ paper: classes.drawerPaper }}
        variant={isMovil ? 'temporary' : 'persistent'}
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        swipeAreaWidth={17}
        ModalProps={{
          keepMounted: false, // Better open performance on mobile.
        }}>
        <div>
          <div className={classes.drawerHeader}>
            <Avatar>I</Avatar>
            <Typography variant="h6">
              Invitado
            </Typography>
          </div>
          <Divider />
          <List >
            {[
              {
                title: 'Inicio',
                route: '/'
              },
              {
                title: 'Lista de Empleos',
                route: '/jobs'
              },
              {
                title: 'Agradecimientos',
                route: '/credits'
              },
            ].map((v, i) => (
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to={v.route} key={i}>
                <ListItem selected={v.route === props.location.pathname} button
                  onClick={() => {
                    if (isMovil) setDrawerOpen(false);
                  }}>
                  <ListItemText primary={v.title} />
                </ListItem>
              </Link>
            ))}
            <Divider />
            <ListItem button
                  onClick={() => {
                    
                  }}>
                  <ListItemText primary={'Salir'} />
                </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
      <main className={clsx(classes.content, { [classes.contentShift]: drawerOpen })}>
        <div className={classes.drawerHeader} />
        {main}
        <h1></h1>
      </main>
    </div>
  );
}