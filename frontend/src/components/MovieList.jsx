import React, {useState, useEffect} from 'react'
import { MovieItem } from './MovieItem';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { SearchBar } from './SearchBar';
import { MovieForm } from './MovieForm';

export const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/movies');
        const data = await response.json();
        setMovies(data);
        setChecked(new Array(data.length).fill(false));
      } catch(err) {
        console.log(err);
      }
    }
    getMovies();
  }, [open]);

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/movies/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 202) {
        throw new Error("Movie not found")
      }

      setMovies(movies.filter(movie => movie.id !== id))
    } catch(err) {
      console.log(err);
    }
  }

  const handleCheckedChange = (index) => {
    let newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  }

  return (
    <Box sx={{marginY: '20px', paddingX: '20px'}}>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px'}}>
        <SearchBar val={search} handleSearchChange={e => setSearch(e.target.value)}/>
        <MovieForm open={open} handleOpen={handleOpen} handleClose={handleClose}/>
      </Box>
      <Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())).map((movie, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <MovieItem movie={movie} handleClick={handleDeleteClick} index={index} checked={checked} handleChange={handleCheckedChange}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
