import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const PasswordForm = () => {
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
        marginTop: 5, // Space from top
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
            Update Password
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Ensure your account is using a long, random password to stay secure.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          {/* <Typography variant="body1" sx={{ textAlign: 'left' }}>
         
          </Typography> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          {/* <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Confirm New Password
          </Typography> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Confirm New Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Save Password
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordForm;  // Default export
