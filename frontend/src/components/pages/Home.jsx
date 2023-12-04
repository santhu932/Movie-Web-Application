// import React, { useContext } from 'react';
// import MovieContext from '/Users/kumud/movie-analysis-app/src/components/context/MovieContext.jsx';
// import MovieResults from '../../user/MovieResults';

// function Home() {
//   const { search, login } = useContext(MovieContext);

//   return (
//     <>
//       {search && !login && <UserSearch />}
//       <MovieResults />
//     </>
//   );
// }

// export default Home;
import React, { useContext } from 'react';
import MovieContext from '../context/MovieContext.jsx';
import MovieResults from '../../user/MovieResults';
import MovieSearch from '../../user/UserSearch'

function Home() {
  const { search, login } = useContext(MovieContext);

  return (
    <>
      {/* Remove the UserSearch component */}
      {search && !login && <MovieSearch />}
      <MovieResults />
    </>
  );
}

export default Home;

