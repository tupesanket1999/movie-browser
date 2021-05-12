import { Grid, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '../../AppBar';
import MovieCardComponent from '../movie-card/movie-card.component';

function MovieBrowser() {
  const isLoading = useSelector((state) => state.loading);
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const MOVIE_API = '1472cca08846cd9a81b6a82c4ef0d882';

  const apiCall = async () => {
    const jsonData = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${MOVIE_API}&language=en-US&page=${page}`
    );
    const payload = await jsonData.json();
    dispatch({
      type: 'SUCCESS_API',
      payload: payload.results,
    });
  };

  const scrollHelpers = () => {
    const pageHeight = window.document.documentElement.scrollHeight;
    const { clientHeight } = window.document.documentElement;
    const scrollPos = window.pageYOffset;
    const currentPosition = scrollPos + clientHeight;
    const percentageScrolled = currentPosition / pageHeight;
    return percentageScrolled;
  };
  const handleScroll = () => {
    if (!isLoading) {
      const percentageScrolled = scrollHelpers(window);
      if (percentageScrolled > 0.8) {
        apiCall();
      }
    }
  };
  useEffect(() => {
    window.onscroll = handleScroll;
  });
  return (
    <div>
      <AppBar />
      <div style={{ margin: '20px' }}>
        <Grid spacing={2} container>
          {movies.map((it) => {
            return (
              <React.Fragment key={it.id}>
                <Grid item>
                  <MovieCardComponent movie={it} />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        {isLoading ? <div>loading</div> : <div />}
      </div>
    </div>
  );
}

export default MovieBrowser;
