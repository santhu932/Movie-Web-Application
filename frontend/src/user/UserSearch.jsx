import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../../services/moviesApi';

function MovieSearch() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/movie/${selectedMovie?.id}`);
  };

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await searchMovies();
      setMovieList(data);
    }

    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 mb-20">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <Autocomplete
                freeSolo
                options={movieList}
                getOptionLabel={(option) => option.title}
                value={selectedMovie}
                sx={{
                  backgroundColor: '#d8e4e6',
                }}
                onChange={(event, newValue) => {
                  setSelectedMovie(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Movies"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <button
                type="submit"
                className="absolute top-1 right-0 rounded-l-none w-36 btn btn-md"
              >
                GO
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieSearch;
