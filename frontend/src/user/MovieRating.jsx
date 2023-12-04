import React from 'react';
import { Rating, Typography } from '@mui/material';

function MovieRating({ imdb_score }) {
  return (
    <>
      <Rating
        name="half-rating"
        // defaultValue={imdb_score / 10}
        defaultValue={imdb_score}
        precision={0.2}
        max={10}
        readOnly
        size="small"
      />
      <Typography>{imdb_score}</Typography>
      
    </>
  );
}

export default MovieRating;
