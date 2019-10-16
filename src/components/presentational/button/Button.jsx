import React from 'react';
import './button.css';

export default (props)=>{
    const {id,className,text,onClick=(e)=>{},enable=true,loading=false} = props;


    let classNames=[];
    if((className||[]).length>0)classNames.push(...className.split(' '));
    if(enable)classNames.push('enable');
    if(!enable)classNames.push('disable');
    if(loading)classNames.push('loading');

    return(
        <button 
            id={id}
            className={`button radius-1 primary-light ${classNames.join(' ')}`}
            onClick={(e)=>{
                if(enable&&!loading)onClick(e);
            }}>
            <span>{text}</span>
        </button>
    );
};