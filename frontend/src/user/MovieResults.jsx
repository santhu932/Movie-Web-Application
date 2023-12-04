// import React, { useEffect } from 'react';
// import { useContext } from 'react';
// import MovieContext from '../components/context/MovieContext';
// import MovieRating from './MovieRating.jsx';
// import MovieCarousel from './MovieCarousel.jsx';
// import { useNavigate } from 'react-router-dom';
// import { Typography } from '@mui/material';
// import noimg from '../components/images/noimg.jpg';
// import { getHomeMovies } from '/Users/kumud/ADTFinalProject/Movie-Analysis/frontend/src/services/moviesApi.js'; // Replace with your movie API service

// function MovieResults() {
//   const { sampleData, setSampleData, login, landing } = useContext(MovieContext);

//   useEffect(() => {
//     fetchData();
//   }, [landing]);

//   // const fetchData = async () => {
//   //   const data = await getHomeMovies(); // Replace with your movie API service
//   //   setSampleData(data);
//   // };
//   const fetchData = async () => {
//     try {
//       const data = await getHomeMovies();
//       console.log('Data:', data);
//       setSampleData(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  

//   const navigate = useNavigate();
//   // const handleClick = (id) => {
//   //   console.log('clicked', id);
//   //   navigate(`/movie/${id}`);
//   // };
//   const handleClick = (movie_id) => {
//     console.log('clicked', movie_id);
//     navigate(`/movies`);
//   };
  
  
//   return (
//     <>
//       <Typography variant="h2" className="text-center" sx={{ my: 2 }}>
//        Top Rated Movies
//       </Typography>
//       {login && <MovieCarousel />}
//       {landing && (
//         <div className="grid grid-cols-1 gap-20 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
//           {sampleData.map((movie) => (
//             <div
//               className="transform transition duration-500 hover:scale-125 hover:flex justify-center items-center"
//               key={movie.title}
//               onClick={() => handleClick(movie.title)}
//             >
//               <div className="card-body bg-neutral rounded p-4 justify-center">
//                 <div className="card-title font-bold justify-center">
//                   {movie.title}
//                 </div>
//                 <div className="flex flex-col items-center ">
//                   <div className="bg-auto md-4 flex-grow ">
//                     {movie.Poster === 'No Image Available!' ? (
//                       <img src={noimg} alt="movie" className="bg-auto" />
//                     ) : (
//                       <img src={movie.Poster} alt="movie" className="bg-auto" />
//                     )}
//                   </div>
//                   <div className="flex flex-col justify-between m-2 ">
//                     <div className="platform">
//                       <div className="font-bold">Genre: {movie.genre}</div>
//                     </div>
//                     <div className="year">
//                       <div className="font-bold">
//                         Year of Release: {movie.released_year}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="rating mt-1">
//                     <MovieRating imdb_score={movie.imdb_score} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// export default MovieResults;
import React, { useContext, useEffect } from 'react';
import MovieContext from '../components/context/MovieContext';
import MovieRating from './MovieRating.jsx';
import MovieCarousel from './MovieCarousel.jsx';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import noimg from '../components/images/noimg.jpg';

// Hardcoded movie data
const hardcodedMovies = [
  {
    "title": "The Shining",
    "genre": "Drama",
    "released_year": 1980,
    "imdb_score": 8.4,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "The Blue Lagoon",
    "genre": "Adventure",
    "released_year": 1980,
    "imdb_score": 5.8,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwNTM5MDU2OF5BMl5BanBnXkFtZTgwNjI0OTgzMTE@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "Star Wars: Episode V - The Empire Strikes Back",
    "genre": "Action",
    "released_year": 1980,
    "imdb_score": 8.7,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "Airplane!",
    "genre": "Comedy",
    "released_year": 1980,
    "imdb_score": 7.7,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDU2MjE4MTcwNl5BMl5BanBnXkFtZTgwNDExOTMxMDE@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "Caddyshack",
    "genre": "Comedy",
    "released_year": 1980,
    "imdb_score": 7.3,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BY2I1NWE2NzctNzNkYS00Nzg5LWEwZTQtN2I3Nzk3MTQwMDY2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "Friday the 13th",
    "genre": "Horror",
    "released_year": 1980,
    "imdb_score": 6.4,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNWMxYTYzYWQtNGZmNy00MTg5LTk1N2MtNzQ5NjQxYjQ5NTJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "The Blues Brothers",
    "genre": "Action",
    "released_year": 1980,
    "imdb_score": 7.9,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMzdhOTJmYmQtMmE0OS00ZDMyLWFkZDItZmZmMGJlNGUyNjNhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "Raging Bull",
    "genre": "Biography",
    "released_year": 1980,
    "imdb_score": 8.2,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BODFkNzA3ZGEtOTM3Ny00ZmEyLThjNDgtYTk4ZTM1ZTlkZmUzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY268_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "Superman II",
    "genre": "Action",
    "released_year": 1980,
    "imdb_score": 6.8,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMGQ2MjNiNDAtMTYwMy00MDk0LTkxZmYtNzBmNDQyMGYyN2I2XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "The Long Riders",
    "genre": "Biography",
    "released_year": 1980,
    "imdb_score": 7,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjE4NDk4MDMxN15BMl5BanBnXkFtZTcwMTkzNzA2NA@@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "Any Which Way You Can",
    "genre": "Action",
    "released_year": 1980,
    "imdb_score": 6.1,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BZDkyYTY3MDgtNzU2OS00MGM5LWJkOTYtZDllNTRiZDRlMzVlXkEyXkFqcGdeQXVyMDUyOTUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"
  },
  {
    "title": "The Gods Must Be Crazy",
    "genre": "Adventure",
    "released_year": 1980,
    "imdb_score": 7.3,
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2ODYxNzM3N15BMl5BanBnXkFtZTcwNDMwODUyMQ@@._V1_UY268_CR0,0,182,268_AL_.jpg"
  }
];

function MovieResults() {
  const { setSampleData, login, landing } = useContext(MovieContext);

  useEffect(() => {
    // Hardcoded data instead of fetching
    setSampleData(hardcodedMovies);
  }, [landing]);

  const navigate = useNavigate();

  const handleClick = (movie_id) => {
    console.log('clicked', movie_id);
    navigate(`/movies`);
  };

  return (
    <>
      <Typography variant="h2" className="text-center" sx={{ my: 2 }}>
        Top Rated Movies
      </Typography>
      {login && <MovieCarousel />}
      {landing && (
        <div className="grid grid-cols-1 gap-20 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {hardcodedMovies.map((movie, index) => (
            <div
              className="transform transition duration-500 hover:scale-125 hover:flex justify-center items-center"
              key={index}
              onClick={() => handleClick(movie.title)}
            >
              <div className="card-body bg-neutral rounded p-4 justify-center">
                <div className="card-title font-bold justify-center">
                  {movie.title}
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-auto md-4 flex-grow">
                    {movie.Poster === 'No Image Available!' ? (
                      <img src={noimg} alt="movie" className="bg-auto" />
                    ) : (
                      <img src={movie.Poster} alt="movie" className="bg-auto" />
                    )}
                  </div>
                  <div className="flex flex-col justify-between m-2">
                    <div className="platform">
                      <div className="font-bold">Genre: {movie.genre}</div>
                    </div>
                    <div className="year">
                      <div className="font-bold">
                        Year of Release: {movie.released_year}
                      </div>
                    </div>
                  </div>
                  <div className="rating mt-1">
                    <MovieRating imdb_score={movie.imdb_score} />
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
