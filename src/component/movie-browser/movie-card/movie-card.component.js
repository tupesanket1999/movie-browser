import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: { maxWidth: 500, maxHeight: 400 },
});

export default function MovieCardComponent(props) {
  const TMDB_IMAGE_BASE_URL = (width = 300) =>
    `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={TMDB_IMAGE_BASE_URL(500)}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.movie.original_title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.movie.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
