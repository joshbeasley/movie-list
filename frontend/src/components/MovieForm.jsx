import { Box, Button, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'

export const MovieForm = ({open, handleOpen, handleClose}) => {

  const [title, setTitle] = useState({title: ''});
  const [valid, setValid] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValid(false);
    } else {
      try {
        const response = await fetch('http://localhost:8080/movies',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(title),
          });
        handleClose();
      } catch(err) {
        console.log(err);
      }
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  };

  return (
    <>
      <Button onClick={handleOpen} variant='contained'>Add a Movie</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <TextField
            error={!valid}
            label="Title"
            placeholder='Enter Movie Title'
            value={title.title}
            required
            onChange={e => setTitle({title: e.target.value})}
          >
            Title
          </TextField>
          <Button variant='contained' type='submit'>Submit</Button>
        </Box>
      </Modal>
    </>
    
  )
}
