import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';


const EmailForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    // Handle save action (e.g., save name and email data to a server or state)
    console.log('Saved:', { name, email });
  };

  return (
    <Box
      sx={{
        width: '100%', // Full-width form
        maxWidth: 1000, // Optional: limit form width
        margin: 'auto',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd',
        borderRadius: 2,
        marginTop: 5, // Space from top
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ textAlign: 'left' }}>
          Email Address
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          {/* <Typography variant="h6" sx={{ textAlign: 'left' }}>
            Email Address
          </Typography> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EmailForm;  // Default export
