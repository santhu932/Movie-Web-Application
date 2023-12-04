import React, { useContext, useEffect } from 'react';
import MovieContext from '../components/context/MovieContext';
import MovieRating from './MovieRating.jsx';
import MovieCarousel from './MovieCarousel.jsx';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import noimg from '../components/images/noimg.jpg';
import { getHomeMovies } from '../services/moviesApi.js';

function MovieResults() {
  const { sampleData, setSampleData, login, landing } = useContext(MovieContext);

  useEffect(() => {
    fetchData()
  }, [landing])

  const fetchData = async () => {
    const data = await getHomeMovies()
    setSampleData(data)
  }

  const navigate = useNavigate()
  const handleClick = (id) => {
    console.log('clicked', id)
    navigate(`/movie/${id}`)
  }

  return (
    <>
      <Typography variant="h2" className="text-center" sx={{ my: 2 }}>
        Top Rated Movies
      </Typography>
      {login && <MovieCarousel />}
      {landing && (
        <div className="grid grid-cols-1 gap-20 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {sampleData.map((i) => (
            <div
              className="transform transition duration-500 hover:scale-125 hover:flex justify-center items-center"
              key={i.id}
              onClick={() => handleClick(i.id)}
            >
              <div className="card-body bg-neutral rounded p-4 justify-center">
                <div className="card-title font-bold justify-center">
                  {i.title}
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-auto md-4 flex-grow">
                    {i.Poster === 'No Image Available!' ? (
                      <img src={noimg} alt="movie" className="bg-auto" />
                    ) : (
                      <img src={i.Poster} alt="movie" className="bg-auto" />
                    )}
                  </div>
                  <div className="flex flex-col justify-between m-2">
                    <div className="platform">
                      <div className="font-bold">Genre: {i.genre}</div>
                    </div>
                    <div className="year">
                      <div className="font-bold">
                        Year of Release: {i.released_year}
                      </div>
                    </div>
                  </div>
                  <div className="rating mt-1">
                    <MovieRating imdb_score={i.imdb_score} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MovieResults;
