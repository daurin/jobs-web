import React, { useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    Avatar, Box, Typography, Container, Button, TextField, CssBaseline, Paper, CircularProgress, Snackbar,
    IconButton,Link as LinkUi
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ValidateField from '../../../utils/ValidateField';
import useStyles from './style.js';
import axios from 'axios';
import {verifyTokenls,setTokenls as setTokenUtil,getTokenls} from '../../../utils/token';
import {useDispatch,useSelector} from 'react-redux';
import {setUserByToken} from '../../../redux/actions/userActions';
import LoadingPage from '../loadingPage';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <LinkUi style={{color: 'inherit'}} href='http://mipagina.com' target='_blank'>
                Your Website
            </LinkUi>{' '}
            {new Date().getFullYear()}{'.'}
        </Typography>
    );
}


export default (props) => {
    const classes = useStyles();
    

    // State
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState({login:false,verifyToken:true});
    const [messageForm, setMessageForm] = useState({message:true,show:false});
    const [redirect,setRedirect]=useState('');

    // Redux
    const dispatch=useDispatch();
    const setUserByTokenDispatch=(token)=>dispatch(setUserByToken(token));

    // Effect
    useEffect(()=>{
        let isMount=true;
        verifyTokenls()
            .then(()=>{
                if(isMount)setRedirect('/');
            })
            .catch(()=>{})
            .finally(()=>{
                if(isMount)setLoading(prev=>({...prev,verifyToken:false}));
            });
        return ()=>isMount=false;
    },[]);

    // Handles
    const validate = async (field = '') => {
        if (field === 'email' || field === '') {
            let err = await new ValidateField(email.value).empty(false).validate().
                then(() => true).catch(err => err[0]);
            //setEmail((prev)=>({...prev,error:err}));
        }
        if (field === 'password' || field === '') {
            let err = await new ValidateField(password.value).empty(false).validate().
                then(() => true).catch(err => false);
            //setPassword(err);
        }
    }

    const onSubmit =(e) => {
        e.preventDefault();

        if (loading.login) return;

        setLoading(prev=>({...prev,login:true}));
        axios.post(process.env.REACT_APP_API_URL+'/users/tokens',{
            user_email:email.value,
            password:password.value,
        },{
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((res)=>{
                if(res.status===200){
                    setTimeout(()=>{
                        setLoading(prev=>({...prev,login:false}));
                        setUserByTokenDispatch(res.data.token);
                        props.history.push('/');
                    },300);
                }
            })
            .catch(err=>{
                setTimeout(() => {    
                    if(!err.response){
                    }
                    else if(err.response.status=401){
                        setMessageForm({message:err.response.data.message,show:true});
                        setPassword((prev)=>({...prev,value:''}));
                        validate();
                    }
                    setLoading(prev=>({...prev,login:false}));
                }, 300);
            })
    }

    if(loading.verifyToken)return <LoadingPage/>;
    else if(redirect.length>0)return <Redirect push to={redirect}/>
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Paper className={classes.signInContainer}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">Iniciar sesión</Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email.value}
                        onChange={(e) => {
                            e.persist();
                            setEmail((prev) => ({ ...prev, value: e.target.value || '' }));
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password.value}
                        onChange={(e) => {
                            e.persist();
                            setPassword((prev) => ({ ...prev, value: e.target.value }));
                        }}
                    />
                    <Button
                        className={classes.btnSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!(email.value.length > 0 && password.value.length > 0) || (loading.login)}
                        color="primary">
                        Iniciar sesión
                        {loading.login && <CircularProgress size={24} className={classes.btnSubmitProgress} />}
                    </Button>

                    <Link style={{textDecoration:'none',color: 'inherit'}} to='/signup'>
                        <Button className={classes.linkSignUp} color='primary' component='a'>¿No tienes una cuenta?</Button>
                    </Link>
                </form>
            </Paper>
            <Box mt={8}>
                <Copyright />
            </Box>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={messageForm.show}
                autoHideDuration={1000 * 10}
                onClose={(e) => setMessageForm((prev => ({ ...prev, show: false })))}
                message={<span>{messageForm.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={(e) => setMessageForm((prev => ({ ...prev, show: false })))}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </Container>
    );
}