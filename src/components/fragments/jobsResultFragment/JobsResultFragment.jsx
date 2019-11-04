import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useState, useEffect,useLayoutEffect } from 'react';
import useStyles from './style.js';
import clsx from 'clsx';
import qs from 'query-string';
import {
    Typography, InputBase, InputAdornment, IconButton, Grid, GridList, GridListTile, List, ListSubheader,
    Box, Container, Card, CardContent, CardActions, CardActionArea, CircularProgress, Divider
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Search as SearchIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import axios from 'axios';
import InputSearch from '../../presentational/inputSearch';
import JobItem from '../../presentational/jobItem';
import * as JobApi from '../../../api/job';

export default withRouter((props) => {

    // status
    const [searchFocus, setSearchFocus] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    // Ref
    const searchJobRef = useRef(null);

    const classes = useStyles();
    const textSearch=qs.parse(props.location.search, { ignoreQueryPrefix: true }).text_search||'';

    useEffect(() => {
        searchJobRef.current.value=textSearch;
        searchJobs();
    }, [textSearch]);

    const searchJobs = () => {
        // if(textSearch.length===0){
        //     setJobs([]);
        //     return;
        // }

        setLoading(true);
        JobApi.getJobs({ textSearch})
            .then(res => {
                setJobs(res);
            })
            .catch(err => {
                setJobs([]);
            })
            .finally(() => setLoading(false));
    }

    const onSearchJobs = (e) => {
        if (searchJobRef.current.value.toString().length === 0) {
            props.history.push({
                pathname: '/jobs'
            });
        }
        else {
            props.history.push({
                pathname: '/jobs',
                search: qs.stringify({text_search:searchJobRef.current.value})
            });
        }

    }

    return (
        <div style={{ backgroundColor: '#f8f8f8' }}>
            <Box className={classes.containerSearch}>
                <InputSearch
                    className={clsx(classes.inputSearch)}
                    inputRef={searchJobRef}
                    onSearch={onSearchJobs}
                    autoFocus />
                <MuiExpansionPanel
                    className={classes.filterPanel}
                    classes={{
                        expanded: classes.filterPanelExpanded
                    }}
                >
                    <MuiExpansionPanelSummary
                        classes={{
                            root: classes.filterPanelSummary,
                            expanded: classes.filterPanelSummaryExpanded
                        }}
                    //expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>Filtros</Typography>
                    </MuiExpansionPanelSummary>
                    <MuiExpansionPanelDetails >
                        Aqui iran los filtros avanzados.
                    </MuiExpansionPanelDetails>
                </MuiExpansionPanel>
            </Box>

            <Container
                className={classes.main}
            >
                {loading ?
                    <CircularProgress style={{ margin: '40px auto' }} /> :
                    <List
                        style={{ width: '100%' }}
                        subheader={
                            <ListSubheader disableSticky={true} component="div">
                                <Typography gutterBottom variant="h5">
                                    {jobs.length > 0 ? 'Resultado' : 'Sin resultados'}
                                </Typography>
                            </ListSubheader>
                        }>
                        {jobs.map((v, i) => (
                            <React.Fragment key={v.id}>
                                <JobItem job={v} />
                                {i < jobs.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                }
            </Container>
        </div>
    );
});