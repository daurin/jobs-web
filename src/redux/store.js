import {createStore} from 'redux';
import reducer from './reducers/index';
import userReducer from './reducers/userReducer';

const intialState={};

const store=createStore(
    reducer,
    intialState
);

export default store;