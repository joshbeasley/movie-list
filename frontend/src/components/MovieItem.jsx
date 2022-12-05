import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControlLabel, Switch } from '@mui/material';
import { Link } from 'react-router-dom' ;
import { Rating } from '@mui/material';

export const MovieItem = ({ movie, handleClick, index, checked, handleChange, disabled }) => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography variant="h5" component="div" sx={{textAlign: 'center'}}>
            {movie.title}
          </Typography>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{width: '300px', marginTop: '10px', marginBottom: '10px'}}/>
          <Rating disabled defaultValue={movie.vote_average / 2} precision={0.01} size='large'></Rating>
        </CardContent>
        {disabled ? null :
        <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Link to={`movies/${movie.id}`} state={{movie: movie}} style={{ textDecoration: 'none' }}><Button variant='outlined' size="small" color="primary">Details</Button></Link>
          <Button variant='outlined' size="small" color="error" onClick={() => handleClick(movie.id)}>Delete</Button>
          <FormControlLabel control={<Switch checked={checked} disabled={disabled} onChange={() => handleChange(index)}/>} label="Watched" />
        </CardActions>}
      </Card>
    </Box>
  )
}
