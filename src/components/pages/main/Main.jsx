import React, { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import {
  AppBar, Box, Toolbar, InputBase, IconButton, Typography, Divider, List, ListItem, ListItemText,
  ListItemIcon, Hidden, InputAdornment, Avatar,
  SwipeableDrawer, Button
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
import HomeFragment from '../../fragments/homeFragment';
import JobsResultFragment from '../../fragments/jobsResultFragment';
import JobsFragment from '../../fragments/jobFragment';
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

  let main = null;

  // Effect
  useEffect(() => {
    //setDrawerOpen(!isMovil);
  }, [isMovil]);

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
          <Link to='/' className={classes.appBarTitle}>
            <Typography variant="h6" noWrap>
              {'Empleos.do { Alpha }'}
            </Typography>
          </Link>
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
        <Switch>
          <Route exact path='/' component={HomeFragment} />
          <Route exact path='/jobs' component={JobsResultFragment} />
          <Route exact path='/jobs/:id' component={JobsFragment} />
          <Route path='/credits' render={() => <h1>Creditos</h1>} />
        </Switch>
        <Footer />
      </main>
    </div>
  );
}