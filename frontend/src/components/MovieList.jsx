import React, {useState, useEffect} from 'react'
import { MovieItem } from './MovieItem';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { SearchBar } from './SearchBar';

export const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/movies');
        const data = await response.json();
        setMovies(data);
      } catch(err) {
        console.log(err);
      }
    }
    getMovies();
  }, []);

  useEffect(() => {
    
  }, [search]);

  return (
    <Box sx={{marginTop: '20px', paddingX: '20px'}}>
      <SearchBar val={search} handleSearchChange={e => setSearch(e.target.value)}/>
      <Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())).map((movie, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <MovieItem key={movie.id} title={movie.title}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
