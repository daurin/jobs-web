import {SET_USER_BY_ID_ACTION,LOGOUT_ACTION} from '../actions/userActions';

const initialState={
    id:null,
    user_name:'',
    name:'',
    email:'',
    token:'',
    authenticated:false
}

export default function(state=initialState,action){
    switch(action.type){
        case SET_USER_BY_ID_ACTION:return action.payload;
        case LOGOUT_ACTION:return action.payload;
        default: return state;
    }
}