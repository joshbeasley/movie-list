import React from 'react'
import { MovieItem } from './MovieItem';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

export const MovieList = () => {
  const movies = [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'},
  ];

  return (
    <Box sx={{marginTop: '20px', paddingX: '20px'}}>
      <Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {movies.map((movie, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <MovieItem key={index} title={movie.title}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
