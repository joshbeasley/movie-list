import React, {useState, useEffect} from 'react'
import { MovieItem } from './MovieItem';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { SearchBar } from './SearchBar';
import { MovieForm } from './MovieForm';

export const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [watched, setWatched] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/movies');
        const data = await response.json();
        setChecked(new Array(data.length).fill(false));
        let details = await Promise.all(data.map(movie => {
          let movieString = movie.title.split(' ').join('%20');
          return fetch(`https://api.themoviedb.org/3/search/movie?api_key=aec314da1fe3f29407f30c06621b2a29&language=en-US&query=${movieString}&page=1&include_adult=false`);
        }))
        details = await Promise.all(details.map(movie => movie.json()));
        details = details.map((movie, index) => ({...movie.results[0], ...data[index]}))
        setMovies(details);
        console.log(details);
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
      let idx = -1;
      setMovies(movies.filter((movie, index) => {
        if (movie.id === id) {
          idx = index;
        }
        return movie.id !== id;
      }))
      let newChecked = [...checked];
      newChecked.splice(idx, 1);
      setChecked(newChecked);
    } catch(err) {
      console.log(err);
    }
  }

  const handleCheckedChange = (index) => {
    let newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  }

  const renderWatchButton = () => {
    if(watched) {
      return  <Button variant='contained' color="secondary" sx={{marginX: '10px'}} onClick={() => setWatched(false)}>See All Movies</Button>
    } else {
      return <Button variant='contained' color="secondary" sx={{marginX: '10px'}} onClick={() => setWatched(true)}>See Watched Movies</Button>
    }
  }

  const renderWatchedMovies = () => {
    if(watched) {
      return movies.filter((movie, index) => {
        return movie.title.toLowerCase().includes(search.toLowerCase()) && checked[index]
      }).map((movie, index) => (
        <Grid item xs={2} sm={3} md={3} key={index}>
          <MovieItem movie={movie} handleClick={handleDeleteClick} index={index} checked={true} handleChange={handleCheckedChange} disabled={true}/>
        </Grid>
      ))
    } else {
      return movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())).map((movie, index) => (
        <Grid item xs={2} sm={3} md={3} key={index}>
          <MovieItem movie={movie} handleClick={handleDeleteClick} index={index} checked={checked.length > 0 ? checked[index]: false} handleChange={handleCheckedChange} disabled={false}/>
        </Grid>
      ))
    }
  }

  return (
    <Box sx={{marginY: '20px', paddingX: '20px'}}>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px'}}>
        <SearchBar val={search} handleSearchChange={e => setSearch(e.target.value)}/>
        <Box>
          {renderWatchButton()}
          <MovieForm open={open} handleOpen={handleOpen} handleClose={handleClose}/>
        </Box>
      </Box>
      <Grid container  spacing={{ xs: 3, md: 5 }} columns={{ xs: 8, sm: 16, md: 12 }} >
        {renderWatchedMovies()}
      </Grid>
    </Box>
  )
}
