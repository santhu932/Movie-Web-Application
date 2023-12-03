import axios from 'axios';

// const baseURI =
//   import.meta.env.VITE_APP_ENVIROMENT === 'DEV'
//     ? import.meta.env.VITE_LOCAL_URL
//     : import.meta.env.VITE_PUBLIC_URL;
const baseURI = 'http://localhost:8080' //using local host    

const getHomeMovies = async () => {
  try {
    const { data } = await axios.get(`${baseURI}home`);
    return data;
  } catch (error) {
    console.log('Error occurred!', error);
  }
};

const getMovieDetail = async (id) => {
  try {
    const { data } = await axios.get(`${baseURI}movie/${id}`);
    return data;
  } catch (error) {
    console.log('Error occurred!', error);
  }
};

const searchMovies = async () => {
  try {
    const { data } = await axios.get(`${baseURI}search`);
    return data;
  } catch (error) {
    console.log('Error occurred!', error);
  }
};

export { getHomeMovies, getMovieDetail, searchMovies };
