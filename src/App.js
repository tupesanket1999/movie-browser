import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MovieBrowser from './component/movie-browser/movie-list/movie-browser.container';

const MOVIE_API = '1472cca08846cd9a81b6a82c4ef0d882';

const initialState = {
  movies: [],
  page: 1,
  loading: true,
};

const movieReducer = (state = initialState, action) => {
  if (action.type === 'REQ_API') {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === 'SUCCESS_API') {
    return {
      ...state,
      movies: [...state.movies, ...action.payload],
      page: state.page + 1,
      loading: false,
    };
  }
  return state;
};

const store = createStore(movieReducer);

// store.dispatch({ type: 'GET_MOVIES', payload: ['1', '2'] });

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

const apiCall = async () => {
  const jsonData = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${MOVIE_API}&language=en-US&page=${
      store.getState().page
    }`
  );
  const payload = await jsonData.json();
  store.dispatch({
    type: 'SUCCESS_API',
    payload: payload.results,
  });
};

function App() {
  store.dispatch({ type: 'REQ_API' });
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MovieBrowser />
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
