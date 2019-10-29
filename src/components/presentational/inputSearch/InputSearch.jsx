import React,{useState} from 'react';
import useStyles from './style';
import {InputBase,InputAdornment,IconButton} from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';
import clsx from 'clsx';

export default ({
    autoFocus=false,
    onSearch,
    inputRef,
    className

}) => {
    // State
    const [focus,setFocus]=useState(false);

    const classes = useStyles();

    return (
        <InputBase
            className={clsx(classes.root, { [classes.inputSearchfocus]: focus },className)}
            classes={{
                input: classes.inputSearchInput
            }}
            onFocus={(e) => setFocus(true)}
            onBlur={(e) => setFocus(false)}
            endAdornment={(
                <InputAdornment>
                    <IconButton
                        style={{ color: focus || 'white' }}
                        onClick={onSearch}>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment >
            )}
            placeholder='Buscar...'
            variant='outlined'
            autoFocus={autoFocus}
            onKeyPress={(e)=>{
                if (e.key === 'Enter') onSearch(e);
            }}
            inputRef={inputRef}>
        </InputBase>
    )
}