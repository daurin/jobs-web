import React, {useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import './signUp.css';
import FormSubmit from '../../highOrder/formSubmit';
import TextField, { MessageType } from '../../presentational/textField';
import Button from '../../presentational/button';
import ValidateField from '../../../utils/ValidateField';
import axios from 'axios';


export default (props)=>{
    // State
    const [name,setName]=useState({message:''});
    const [userName,setUserName]=useState({message:''});
    const [email,setEmail]=useState({message:''});
    const [password,setPassword]=useState({message:''});
    const [confPassword,setConfPassword]=useState({message:''});
    const [formValid,setFormValid]=useState(false);
    const [loading,setLoading]=useState({validating:false,fetch:false});

    // Ref
    const nameRef=useRef(null);
    const userNameRef=useRef(null);
    const emailRef=useRef(null);
    const passwordRef=useRef(null);
    const confPasswordRef=useRef(null);

    const validate=async(field='')=>{
        setLoading(prev=>({...prev,validating:true}));
        if(field==='name'||field===''){
            let err=await new ValidateField(nameRef.current.value).empty('¿Cómo te llamas?').minLength(2).maxLenght(15)
                .validate().catch(err=>err[0])||'';
            setName({message:err});
        }
        if(field==='userName'||field===''){
            let err=await new ValidateField(userNameRef.current.value).empty().minLength(2).maxLenght(15)
                .validate().catch(err=>err[0])||'';
            setUserName({message:err});
        }
        if(field==='email'||field===''){
            let err=await new ValidateField(emailRef.current.value).empty().email().maxLenght(31).validate().catch(err=>err[0])||'';
            setEmail({message:err});
        }
        if(field==='password'||field===''){
            let err=await new ValidateField(passwordRef.current.value).empty().minLength(6).maxLenght(100).validate().catch(err=>err[0])||'';
            setPassword({message:err});
        }
        if(field==='confPassword'||field===''){
            let err=await new ValidateField(confPasswordRef.current.value).empty().custom(()=>{
                if(passwordRef.current.value!==confPasswordRef.current.value)return Promise.reject('Las contraseñas no coinciden');
                else return Promise.resolve();
            }).validate().catch(err=>err[0])||'';
            setConfPassword({message:err});
        }
        setLoading(prev=>({...prev,validating:false}));
    }

    useEffect(()=>{
        let mount=true;
        if(mount){
            if(name.message.length>0||
                userName.message.length>0||
                email.message.length>0||
                password.message.length>0||
                confPassword.message.length>0)setFormValid(false);
            else setFormValid(true);
        }
        return ()=>mount=false;
    },[name.message,userName.message,email.message,password.message,confPassword.message]);

    const onSubmit=async(e)=>{
        e.preventDefault();
        if(loading.validating || loading.fetch)return;
        await validate();
        if(!formValid)return;


        setLoading((prev)=>({...prev,fetch:true}));
        axios.post(process.env.REACT_APP_API_URL+'/users',{
            user_name:userNameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            name:nameRef.current.value
        },{
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((res)=>{
                setTimeout(()=>{
                    setLoading((prev)=>({...prev,fetch:false}));
                    if(res.status===201)props.history.push('/');
                },1000);
            })
            .catch(err=>{
                console.log(err);
                if(err.response.status===400){
                    const data=err.response.data;
                    if(data.user_name)setUserName({message:data.user_name[0]});
                    if(data.email)setEmail({message:data.email[0]});
                    if(data.password)setPassword({message:data.password[0]});
                    if(data.name)setName({message:data.name[0]});
                }
                setTimeout(()=>setLoading((prev)=>({...prev,fetch:false})),1000)
            })
    }

    return (
        <div className='sign-up'>
            <FormSubmit onSubmit={onSubmit} title='Registrarse'
                buttonSubmit={
                    <React.Fragment>
                        <Link to='/signin' className='sign-in-link'><span>¿Ya tienes una cuenta?</span></Link>
                        <Button text='Registrar' loading={loading.fetch} />
                    </React.Fragment>
                }>
                <TextField 
                    label='Nombre y apellido *' 
                    className='name' 
                    name='name'
                    placeHolder='Firulais'
                    autoFocus
                    refComponent={nameRef}
                    maxLength={15}
                    message={name.message}
                    messageType={name.message.length>0?MessageType.Error:MessageType.None}
                    onChange={(e)=>{
                        validate('name');
                    }}
                    onBlur={(e)=>{
                        if(name.message==='')validate('name');
                    }}/>
                <TextField 
                    label='Nombre de usuario *'
                    className='user_name' 
                    name='user_name'
                    placeHolder='Misifus64'
                    refComponent={userNameRef}
                    maxLength={15}
                    message={userName.message}
                    messageType={userName.message.length>0?MessageType.Error:MessageType.None}
                    onChange={(e)=>{
                        validate('userName');
                    }}
                    onBlur={(e)=>{
                        if(userName.message==='')validate('userName');
                    }}/>
                <TextField 
                    label='Correo'
                    className='email'
                    name='email'
                    type='email'
                    refComponent={emailRef}
                    maxLength={31}
                    message={email.message}
                    messageType={email.message.length>0?MessageType.Error:MessageType.None}
                    onChange={(e)=>{
                        validate('email');
                    }}
                    onBlur={(e)=>{
                        if(email.message==='')validate('email');
                    }} />
                <TextField 
                    label='Contraseña *'
                    className='pass'
                    name='pass'
                    type='password'
                    refComponent={passwordRef}
                    maxLength={100}
                    message={password.message}
                    messageType={password.message.length>0?MessageType.Error:MessageType.None}
                    onChange={(e)=>{
                        validate('password');
                        if(confPasswordRef.current.value.length>0)validate('confPassword');
                    }}
                    onBlur={(e)=>{
                        if(password.message===''){
                            validate('password');
                            if(confPasswordRef.current.value.length>0)validate('confPassword');
                        }
                    }}/>
                <TextField
                    label='Confirmar contraseña *' 
                    className='conf-pass'
                    name='conf-pass'
                    type='password'
                    refComponent={confPasswordRef}
                    maxLength={100}
                    message={confPassword.message}
                    messageType={confPassword.message.length>0?MessageType.Error:MessageType.None}
                    onChange={(e)=>{
                        e.persist();
                        validate('confPassword');
                    }}
                    onBlur={(e)=>{
                        e.persist();
                        if(confPassword.message==='')validate('confPassword');
                    }} />
            </FormSubmit>
        </div>
    )
};