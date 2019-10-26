import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useStyles from './style.js';
import clsx from 'clsx';
import qs from 'query-string';
import {
    Typography, InputBase, InputAdornment, IconButton, Grid, GridList, GridListTile, List, ListSubheader,
    Box, Container, Card, CardContent, CardActions, CardActionArea, CircularProgress
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Search as SearchIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import axios from 'axios';

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
        switch (props.location.pathname) {
            case '/':
                searchJobs();
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
        axios.get(process.env.REACT_APP_API_URL + '/jobs', {
            params: {
                text_search: searchJobRef.current.value,
                offset: 0,
                limit: 30,
                status: 'S'
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setJobs(res.data.data.map((v) => ({
                        id: v.id,
                        title: v.title,
                        views: v.views
                    })));
                }
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.data.message);
            })
            .finally(() => setTimeout(() => {
                setLoading(false);
            }, 1000));
    }

    const onSearchJobs = (e) => {
        if (searchJobRef.current.value.toString().length === 0) {
            props.history.push(props.history.pathname);
            searchJobs();
        }
        else {
            let urlParams = new URLSearchParams(props.location.search);
            urlParams.set('text_search', searchJobRef.current.value);
            props.history.push('jobs' + "?" + urlParams.toString());
            searchJobs();
        }
    }

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
                            <IconButton
                                style={{ color: searchFocus || 'white' }}
                                onClick={onSearchJobs}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment >
                    )}
                    placeholder='Buscar...'
                    variant='outlined'
                    autoFocus
                    onKeyPress={e => {
                        if (e.key === 'Enter') onSearchJobs(e);
                    }}
                    inputRef={searchJobRef}>
                </InputBase>
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
                        Reprehenderit deserunt labore anim laborum velit proident. Aute do nostrud cillum duis cupidatat non nostrud id culpa. Sunt deserunt ad laborum dolore cillum commodo est occaecat eu dolore ea id eu. Laboris tempor sit amet do officia quis consequat qui aliquip anim sint laborum.
                        Sit nostrud aute laborum veniam fugiat commodo proident anim. Et quis nulla amet amet laborum veniam labore commodo anim ullamco ex. Ex Lorem occaecat nisi aliquip id velit. Ad minim fugiat eiusmod minim ex voluptate aute officia ipsum.
                    </MuiExpansionPanelDetails>
                </MuiExpansionPanel>
            </Grid>

            <Container
                className={classes.main}>
                {loading ? 
                    <CircularProgress style={{margin:'40px auto'}}/> :
                    <List
                        style={{ width: '100%' }}
                        subheader={
                            <ListSubheader component="div">
                                <Typography gutterBottom variant="h5">
                                    Recientes
                            </Typography>
                            </ListSubheader>
                        }>
                        {jobs.map((v) => (
                            <Card style={{ marginBottom: '10px' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h6">
                                            {v.title}
                                        </Typography>
                                        <Typography style={{ float: 'right' }} variant="body1" color="textSecondary">
                                            Visitas | {v.views}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </List>
                }
            </Container>
        </div>
    );
});