import React from 'react';
import debounce from 'lodash.debounce';
import './textField.css';

function TextField({
        id,
        name,
        className='',
        label='',
        type='text',
        autoFocus,
        placeHolder='',
        messageType=MessageType.None,
        message='',
        refComponent,
        onChange=(e)=>{},
        onChangeDelay=0,
        onBlur,
        maxLength,
        enable=true,
    }){

    let classNameArray=[];
    if(className.length>0)classNameArray.push(className);
    if(!enable)classNameArray.push('disable');
    
    switch(messageType){
        case MessageType.Error:
            classNameArray.push('error');
            break;
        case MessageType.Information:
            classNameArray.push('information');
            break;
        case MessageType.Ok:
            classNameArray.push('ok');
            break;
        default:
            classNameArray.push('default');
            break;
    }

    const onChangeDebounced = debounce((e)=>onChange(e), onChangeDelay);

    return (
        <div id={id} className={`text-field ${classNameArray.join(' ')}`}>
            {label?<label htmlFor={name}>{label}</label>:''}
            <input
                name={name}
                className='radius-1' 
                type={type}
                autoFocus={autoFocus}
                placeholder={placeHolder}
                disabled={!enable}
                ref={refComponent}
                onChange={(e)=>{
                    e.persist();
                    if(onChangeDelay>0)onChangeDebounced(e);
                    else onChange(e);
                }}
                onBlur={onBlur}
                maxLength={maxLength}
            />
            {message?
                <span className='message'>{message}</span>:''
            }
        </div>
    );
}
export default TextField;

const MessageType={
    None:0,
    Error:1,
    Information:2,
    Ok:3
};

export {MessageType};