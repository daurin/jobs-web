import React from 'react';
import {Typography,Link} from '@material-ui/core';
import style from './style';
import clsx from 'clsx';

export default ({className=''})=>{
    const classes=style();

    return(
        <footer className={clsx(className,classes.root)}>
            <Typography className={classes.copyright} variant="body2" color="textSecondary" align="center">
                {'Copyright © Daurin Lora Mejia '}{new Date().getFullYear()}{'.'}
            </Typography>
        </footer>
    )
};