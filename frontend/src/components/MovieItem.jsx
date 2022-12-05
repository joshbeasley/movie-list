import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControlLabel, Switch } from '@mui/material';

export const MovieItem = ({ movie, handleClick, index, checked, handleChange }) => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {movie.title}
          </Typography>
          <Typography variant="body2">
            {movie.title}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button variant='outlined' size="small" color="error" onClick={() => handleClick(movie.id)}>Delete Movie</Button>
          <FormControlLabel control={<Switch checked={checked.length > 0 ? checked[index]: false} onChange={() => handleChange(index)}/>} label="Watched" />
        </CardActions>
      </Card>
    </Box>
  )
}
