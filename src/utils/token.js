import axios from 'axios';

export const verifyTokenls=async(token=getTokenls())=>{
    if(token){
        return axios.get(process.env.REACT_APP_API_URL+'/users/tokens/verify',{
            headers:{Authorization:`Basic ${token}`}
        })
        .then(res=>{
            if(res.status===200)return Promise.resolve();
            else return Promise.reject();  
        })
        .catch(err=>Promise.reject(err));
    }
    else{
        clearTokenls();
        return Promise.reject();
    }
}

export const setTokenls=(token)=>{
    localStorage.setItem('token',token);
}

export const getTokenls=()=>{
    const token = localStorage.getItem('token');
    return token||'';
}

export const clearTokenls=()=>{
    localStorage.removeItem('token');
}