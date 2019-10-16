import React,{useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import './signIn.css';
import FormSubmit from '../../highOrder/formSubmit';
import TextField from '../../presentational/textField';
import Button from '../../presentational/button';
import ValidateField from '../../../utils/ValidateField';
import {setTokenls} from '../../../utils/token';
import axios from 'axios';

export default (props)=>{

    // State
    const [userEmail,setUserEmail]=useState(false);
    const [password,setPassword]=useState(false);
    const [messageForm,setMessageForm]=useState('');
    const [loading,setLoading]=useState(false);

    // Ref
    const userEmailRef=useRef(null);
    const passwordRef=useRef(null);

    const validate=async(field='')=>{
        if(field==='userEmail'||field===''){
            let err=await new ValidateField(userEmailRef.current.value).empty(false).validate().
               then(()=>true).catch(err=>err[0]);
            setUserEmail(err);
        }
        if(field==='password'||field===''){
            let err=await new ValidateField(passwordRef.current.value).empty(false).validate().
                then(()=>true).catch(err=>false);
            setPassword(err);
        }
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        if(!(userEmail && password))return;

        setLoading(true);
        axios.post(process.env.REACT_APP_API_URL+'/users/tokens',{
            user_email:userEmailRef.current.value,
            password:passwordRef.current.value,
        },{
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((res)=>{
                setLoading(false);
                if(res.status===200){
                    setTokenls(res.data.token);
                    props.history.push('/');
                }
            })
            .catch(err=>{
                if(!err.response){
                }
                else if(err.response.status=401){
                    setMessageForm(err.response.data.message);
                    passwordRef.current.value='';
                    validate();
                }
                setLoading(false);
            })
    }

    return(
        <div className='sign-in'>
            <FormSubmit onSubmit={onSubmit} title='Iniciar sesión' 
                message={loading?'':messageForm}
                buttonSubmit={
                    <React.Fragment>
                        <Link to='/signup' className='sign-up-link'><span>¿No tienes una cuenta?</span></Link>
                        <Button text='Iniciar sesión' loading={loading} enable={userEmail && password}/>
                    </React.Fragment>
                }>
                <h2>Bienvenido</h2>

                <TextField 
                    label='Usuario o Correo'
                    name='user_email'
                    refComponent={userEmailRef}
                    maxLength={31}
                    autoFocus
                    onChange={(e)=>validate()}/>

                <TextField 
                    label='Contraseña'
                    name='password'
                    type='password'
                    refComponent={passwordRef}
                    maxLength={100}
                    onChange={(e)=>validate()}/>
            </FormSubmit>
        </div>
    );
}