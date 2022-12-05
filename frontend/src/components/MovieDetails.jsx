import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, {useState} from 'react'
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { API_KEY } from '../api';

export const MovieDetails = () => {
  const location = useLocation();
  const movie = location.state.movie;
  console.log(movie)

  return (
    <>
    <Typography variant="h3" sx={{textAlign: 'center', marginY: '20px'}}>{movie.original_title}</Typography>
    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{height: '500px', marginRight: '25px'}}/>
      <Box sx={{width: '50%', marginLeft: '25px'}}>
        <Typography variant='h4'>Release Date: {movie.release_date}</Typography>
        <Typography variant='h4'>Average Rating: {movie.vote_average}</Typography>
        <Typography variant='h6'>Overview: {movie.overview}</Typography>
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>
      </Box>
    </Box>
    
    </>
  )
}
