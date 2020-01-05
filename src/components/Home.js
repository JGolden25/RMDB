import React, { useState, useEffect } from 'react';

import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';

// import Components
import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import LoadMoreBtn from './elements/LoadMoreBtn';
import MovieThumb from './elements/MovieThumb';
import Spinner from './elements/Spinner';

//Custom hook
import { useHomeFetch } from './Hooks/useHomeFetch';

import NoImage from './images/no_image.jpg';

const Home = () => {

    const [{ state, loading, error }, fetchMovies] = useHomeFetch();
    const [searchTerm, setSearchTerm] = useState('');
  if (error) return <div>Something went wrong ...</div>;
  if (!state.movies[0]) return <Spinner />;
    console.log(state);
    return (
        <div>
            <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
            title={state.heroImage.original_title}
            text={state.heroImage.overview}
            />
            <SearchBar/>
            <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
          {state.movies.map(movie => (
            <MovieThumb
              key={movie.id}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movieId={movie.id}
              movieName={movie.original_title}/>
              ))}
              </Grid>
            <MovieThumb/>
            <Spinner/>
            <LoadMoreBtn/>
        </div>
    );
};

export default Home;