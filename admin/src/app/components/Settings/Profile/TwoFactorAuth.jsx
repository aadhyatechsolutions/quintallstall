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
            Two Factor Authentication
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Add additional security to your account using two factor authentication.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography  variant="h6" sx={{ textAlign: 'left' }}>
                You have not enabled two factor authentication.
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Enable
        </Button>
      </Box>
    </Box>
  );
};

export default TwoFactorAuth;  // Default export
