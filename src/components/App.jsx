import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import './app.css';
import store from '../redux/store';
import {Provider} from 'react-redux';
import SignUp from './pages/signUp';
import SignIn from './pages/SignIn';
import SignIn2 from './pages/signIn2';
import Home from './pages/home';
import Loading from './pages/loadingPage';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './highOrder/ProtectedRoute';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme.js';

function App() {

  return (  
      <BrowserRouter>
        <Provider store={store}>
          <MuiThemeProvider theme = { theme }>
            <Switch>
              <Route exact path='/signinold' component={SignIn}/>
              <Route exact path='/signin' component={SignIn2}/>
              <Route exact path='/signup' component={SignUp}/>
              <ProtectedRoute path='/' component={Home}/>
              <Route exact path='/loading' component={Loading}/>
              <Route component={PageNotFound}/>
            </Switch>
          </MuiThemeProvider>
        </Provider>
      </BrowserRouter>
  );

}

export default App;
