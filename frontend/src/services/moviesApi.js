import axios from 'axios';

// const baseURI =
//   import.meta.env.VITE_APP_ENVIROMENT === 'DEV'
//     ? import.meta.env.VITE_LOCAL_URL
//     : import.meta.env.VITE_PUBLIC_URL;
const baseURI = 'http://localhost:8080' //using local host    

const getHomeMovies = async () => {
  try {
    const { data } = await axios.get(`${baseURI}/movies`);
    return data;
  } catch (error) {
    console.log('Error occurred!', error);
  }
};

// const getMovieDetail = async (id) => {
//   try {
//     const { data } = await axios.get(`${baseURI}/movie/${id}`);
//     return data;
//   } catch (error) {
//     console.log('Error occurred!', error);
//   }
// };
const getMovieDetail = async (movieId) => {
  try {
    const { data } = await axios.get(`${baseURI}/movie/${movieId}`);
    return data;
  } catch (error) {
    console.log('Error occurred!', error);
    // Handle the error as needed
    throw error; // You might want to rethrow the error to let the calling code handle it
  }
};


const searchMovies = async (query) => {
  try {
    const { data } = await axios.get(`${baseURI}/search`, { params: { query } });
    return data;
  } catch (error) {
    console.log('Error occurred!', error);
  }
};


export { getHomeMovies, getMovieDetail, searchMovies };
