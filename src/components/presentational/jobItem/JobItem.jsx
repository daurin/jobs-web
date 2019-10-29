import React from 'react';
import useStyles from './style.js';
import { Card, CardActionArea, CardContent, CardActions, Typography, Chip } from '@material-ui/core';

export default ({
    job
}) => {
    const classes = useStyles();

    return (
        <Card
            className={classes.root}>
            <CardActionArea>
                <CardContent className={classes.cardContent}>
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
                        variant="body1"
                        noWrap={true}
                    >
                        {job.description || ''.substring(0, (job.description || ''.length > 100 ? 100 : job.description || ''.length - 1))}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {job.category &&
                    <Chip
                        label={'Categoria • '+job.category.name}
                        clickable
                        color="primary"
                        onClick={() => { }} />
                }
            </CardActions>
        </Card>
    );
}