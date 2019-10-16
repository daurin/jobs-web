import jwtDecode from 'jwt-decode';
import {clearTokenls} from '../../utils/token';

export const SET_USER_BY_ID_ACTION='setToken';
export const LOGOUT_ACTION='LOGOUTACTION';

export const setUserByToken=(token)=>{
    let payload=null;
    try
    {
        localStorage.setItem('token',token);
        payload=jwtDecode(token);
    }
    catch(err){
        payload={};
    }

    return{
        type:SET_USER_BY_ID_ACTION,
        payload:{
            id:payload.id,
            user_name:payload.user_name,
            email:payload.email,
            name:payload.name,
            token
        }
    }
}

export const logOut=()=>{
    clearTokenls();
    return{
        type:LOGOUT_ACTION,
        payload:{
            id:null,
            user_name:'',
            email:'',
            name:'',
            token:'',
            authenticated:false
        }
    }
}