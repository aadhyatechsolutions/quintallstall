import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toast = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',  // Vertical position
        horizontal: 'right',  // Horizontal position
      }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
