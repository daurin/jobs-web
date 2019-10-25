import React from 'react';
import { useState } from 'react';
import useStyles from './style.js';
import clsx from 'clsx';
import { Typography, InputBase, InputAdornment, IconButton, Grid,Box,Container  } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Search as SearchIcon,ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

export default (props) => {

    const classes = useStyles();
    const [searchFocus, setSearchFocus] = useState(true);

    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.containerSearch}>
                <Typography variant='h3' style={{ color: 'white', marginBottom: 35 }}>Busca tu empleo</Typography>
                <InputBase
                    className={clsx(classes.inputSearch, { [classes.inputSearchfocus]: searchFocus })}
                    classes={{
                        input: classes.inputSearchInput
                    }}
                    onFocus={(e) => setSearchFocus(true)}
                    onBlur={(e) => setSearchFocus(false)}
                    endAdornment={(
                        <InputAdornment>
                            <IconButton style={{ color: searchFocus || 'white' }}><SearchIcon /></IconButton>
                        </InputAdornment >
                    )}
                    placeholder='Buscar...'
                    variant='outlined'
                    autoFocus>
                </InputBase>
                <MuiExpansionPanel 
                    className={classes.filterPanel}
                    classes={{
                        expanded:classes.filterPanelExpanded
                    }}
                    >
                    <MuiExpansionPanelSummary
                        classes={{
                            root:classes.filterPanelSummary,
                            expanded:classes.filterPanelSummaryExpanded
                        }}
                        //expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>Mas filtros</Typography>
                    </MuiExpansionPanelSummary>
                    <MuiExpansionPanelDetails >
                        Reprehenderit deserunt labore anim laborum velit proident. Aute do nostrud cillum duis cupidatat non nostrud id culpa. Sunt deserunt ad laborum dolore cillum commodo est occaecat eu dolore ea id eu. Laboris tempor sit amet do officia quis consequat qui aliquip anim sint laborum.
                        Sit nostrud aute laborum veniam fugiat commodo proident anim. Et quis nulla amet amet laborum veniam labore commodo anim ullamco ex. Ex Lorem occaecat nisi aliquip id velit. Ad minim fugiat eiusmod minim ex voluptate aute officia ipsum.
                    </MuiExpansionPanelDetails>
                </MuiExpansionPanel>
            </Grid>
            <Container 
                className={classes.main}>
                <Typography variant='h6' style={{color:'#4d4d4d'}}>Empleos recientes</Typography>
            </Container>
        </div>
    );
};