import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid ,IconButton} from '@mui/material';
import { Computer } from '@mui/icons-material';

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
          Browser Sessions
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
          Manage and log out your active sessions on other browsers and devices.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.
          </Typography>
            
            <Typography  variant="h6" sx={{ textAlign: 'left' }}>
                <IconButton>
                    <Computer fontSize="large" />
                </IconButton>
                OS X - Chrome
            </Typography>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          
        Log Out Other Browser Sessions
        </Button>
      </Box>
    </Box>
  );
};

export default TwoFactorAuth;  // Default export
