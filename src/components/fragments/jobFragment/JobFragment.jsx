import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Typography, Box, Container, Divider, Paper } from '@material-ui/core';
import useStyle from './style';
import { getJob } from '../../../api/job';
import PageNotFound from '../../pages/PageNotFound';
import clxs from 'clsx';

export default (props) => {
    // State
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const classes = useStyle();
    const id = props.match.params.id;

    useEffect(() => {
        if (id) {
            getJob(id)
                .then(res => {
                    setJob(res);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => setLoading(false));
        }
    }, []);

    if (loading) return '';
    if (job === null) return <PageNotFound />
    return (
        <div className={classes.root}>
            <Box className={classes.container}>
                <Typography className={clxs(classes.title)} paragraph={true} variant='h4'>{job.title}</Typography>
                <Divider style={{marginBottom:'10px'}}/>
                <Paper className={classes.jobMetadata}>
                    <Link to='/'>
                        <Typography className={classes.jobMetadataItem} variant='subtitle1'>{job.user.name}</Typography>
                    </Link>
                    <Link to='/'>
                        <Typography className={classes.jobMetadataItem} variant='subtitle1'>{job.category.name}</Typography>
                    </Link>
                </Paper>
            </Box>
            <Box className={classes.container}>
                <Typography variant='h6'>Description</Typography>
                <Divider style={{marginBottom:'10px'}}/>
                <Typography style={{ whiteSpace: 'pre-wrap'}} variant='body1'>
                    {job.description}
                    
                </Typography>
            </Box>

        </div>
    );
}