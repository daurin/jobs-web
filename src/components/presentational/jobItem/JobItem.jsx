import React from 'react';
import { withRouter } from 'react-router-dom';
import useStyles from './style.js';
import { Card, CardActionArea, CardContent, CardActions, Typography, Chip, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
export default withRouter(({
    history,
    job,
}) => {
    const classes = useStyles();

    const jobLink = `/jobs/${job.id}`;
    const onClickLink=(e)=>{
        e.stopPropagation();
    }

    return (
        <Card
            className={classes.root}
            onClick={(e) => {
                e.stopPropagation();
                history.push(jobLink);
            }}>
            <CardContent className={classes.cardContent}>
                <Box style={{ height: '70%', marginBottom: '5px' }}>
                    <Link className={classes.link} to={jobLink} onClick={onClickLink}>
                        <Typography variant="h6" component="h2" style={{ marginBottom: '3px' }}>
                            {job.title}
                        </Typography>
                        <Typography
                            style={{ marginBottom: '3px' }}
                            variant="body1">
                            {job.user.name} • {job.views} vistas
                    </Typography>
                        <Typography
                            className={classes.description}
                            variant="body2"
                            noWrap={true}
                        >
                            {job.description || ''.substring(0, (job.description || ''.length > 100 ? 100 : job.description || ''.length - 1))}
                        </Typography>
                    </Link>

                </Box>
                <Box
                    style={{ height: 'auto', width: '100%' }}
                    className={classes.actions}>
                    {job.category &&
                        <Link className={classes.link} to={`/category`} onClick={onClickLink}>
                            <Chip
                                label={'Categoria • ' + job.category.name}
                                color='secondary'
                                size='small'
                                clickable />
                        </Link>
                    }
                </Box>
            </CardContent>


        </Card>
    );
})