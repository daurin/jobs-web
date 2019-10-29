import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import JobItem from '../../presentational/jobItem';
import InputSearch from '../../presentational/inputSearch';
import * as JobApi from '../../../api/job';

export default withRouter((props) => {

    // status
    const [searchFocus, setSearchFocus] = useState(true);
    const [jobsRecent, setJobsRecent] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    // Ref
    const searchJobRef = useRef(null);

    const classes = useStyles();

    useEffect(() => {
        searchJobs();
        switch (props.location.pathname) {
            case '/':
                
                break;
            case '/jobs':
                const urlQuerys = qs.parse(props.location.search, { ignoreQueryPrefix: true });
                searchJobRef.current.value = urlQuerys.text_search || '';
                searchJobs();
                break;
            default:
                break;
        }
    }, []);

    const searchJobs = () => {
        setLoading(true);
        JobApi.getJobs({textSearch:searchJobRef.current.value})
            .then(res=>{
                console.log(res);
                setJobs(res);
            })
            .catch(err=>{
                setJobs([]);
            })
            .finally(() => setLoading(false));
    }

    return (
        <div style={{ backgroundColor: '#f8f8f8' }}>
            <Box className={classes.containerSearch}>
                <Typography variant='h3' className={classes.titleSearch}>Busca tu empleo</Typography>
                <InputSearch
                    className={classes.inputSearch}
                    inputRef={searchJobRef}
                    autoFocus
                    onSearch={e => {
                        if(searchJobRef.current.value.replace(' ','').length>0){    
                            let urlParams = new URLSearchParams();
                            urlParams.set('text_search', searchJobRef.current.value);
                            props.history.push('/jobs' + "?" + urlParams.toString());
                        }
                    }} />
            </Box>

            <Container
                className={classes.main}
            >
                {loading ?
                    <CircularProgress style={{ margin: '40px auto' }} /> :
                    <List
                        style={{ width: '100%' }}
                        subheader={
                            <ListSubheader component="div">
                                <Typography gutterBottom variant="h5">
                                    Recientes
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