import React,{useState} from 'react';
import './formSubmit.css';
import Button from '../../presentational/button';
import MessageType from '../../../enums/messageType';
import closeRoundImg from '../../../assets/close-32x32.png'

export default (props) => {
    let {title,titleButton,className='',onSubmit,buttonSubmit,message='',messageType=MessageType.Error}=props;

    return (
        <form onSubmit={onSubmit} className={`form-submit box-shadow${className?' '+className:''}`} 
            noValidate>
            <div className="form-header">
                <h1>{title}</h1>
            </div>
            {message.length>0?
                <div className='message'>
                    <span>{message}</span>
                </div>
            :''}
            <div className="form-body">
                {props.children}
            </div>

            <div className="form-footer">
                {buttonSubmit? buttonSubmit:''}
            </div>

        </form>
    );
}