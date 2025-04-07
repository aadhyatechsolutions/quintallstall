import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const TwoFactorAuth = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    // Handle save action (e.g., update password on the server)
    console.log('Password updated:', { currentPassword, newPassword });
    setError('');
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
        marginTop: 5, 
        marginBottom:5// Space from top
      }}
    >
      

      {error && (
        <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography  variant="h6" sx={{ textAlign: 'left' }}>
          Delete Account
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
          Permanently delete your account.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>

            <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
      <Button
          variant="contained"
          sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: '#d32f2f' } }}
          onClick={handleSave}
        >
          Delete Account
        </Button>
      </Box>
    </Box>
  );
};

export default TwoFactorAuth;  // Default export
