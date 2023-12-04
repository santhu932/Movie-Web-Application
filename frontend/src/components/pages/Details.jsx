import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ScoreSharpIcon from '@mui/icons-material/ScoreSharp';
import '/Users/kumud/ADTFinalProject/Movie-Analysis/frontend/src/Dash.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getMovieDetail } from '../services/moviesApi.js';

export default function Details() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = React.useState({});

  useEffect(() => {
    fetchData(id);
  }, []);

  const fetchData = async (id) => {
    const data = await getMovieDetail(id);
    setMovieDetail(data);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h2" className="text-center" sx={{ mb: 8 }}>
        {movieDetail.title}
      </Typography>
      {Object.keys(movieDetail).length !== 0 ? (
        <Grid container spacing={2}>
          <Grid
            item
            xs={8}
            sx={{
              backgroundImage: `url(${
                movieDetail?.Poster === 'No Image Available!'
                  ? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                  : movieDetail.Poster
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh',
            }}
          />
          <Grid item xs={4}>
            <Stack spacing={2}>
              <Card sx={{ height: '9vh' }} className="gradinet">
                <Stack spacing={2} direction="row">
                  <div className="iconstyle">
                    <SportsEsportsIcon />
                  </div>
                  <div className="paddingall">
                    <span className="pricesubtitle">Genre</span>
                    <br />
                    <span className="pricetitle">{movieDetail.genre}</span>
                  </div>
                </Stack>
              </Card>
              <Card sx={{ height: '9vh' }} className="gradinetlight">
                <Stack spacing={2} direction="row">
                  <div className="iconstyle">
                    <SportsEsportsIcon />
                  </div>
                  <div className="paddingall">
                    <span className="pricesubtitle">Released Year</span>
                    <br />
                    <span className="pricetitle">{movieDetail.released_year}</span>
                  </div>
                </Stack>
              </Card>
              <Card sx={{ height: '9vh' }} className="gradinetdark">
                <Stack spacing={2} direction="row">
                  <div className="iconstyle">
                    <SportsEsportsIcon />
                  </div>
                  <div className="paddingall">
                    <span className="pricesubtitle">IMDb Score</span>
                    <br />
                    <span className="pricetitle">{movieDetail.imdb_score}</span>
                  </div>
                </Stack>
              </Card>
              
              <Card sx={{ height: '9vh' }} className="gradinetbottom">
                <Stack spacing={2} direction="row">
                  <div className="iconstyle">
                    <SportsEsportsIcon />
                  </div>
                  <div className="paddingall">
                    <span className="pricesubtitle">Year of Release</span>
                    <br />
                    <span className="pricetitle">{movieDetail.released_year}</span>
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {Array.from(Array(10)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={250} />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
