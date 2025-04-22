import React, { useEffect } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemText, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useSessionStore from '../../store/session/sessionStore'; // Import the session store

const SessionList = () => {
  const { sessions, isLoading, error, fetchSessions, logoutSession } = useSessionStore(); // Access state and actions from the store
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'info',
  });

  // Fetch sessions when the component mounts
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Get the access token from localStorage
  const accessToken = localStorage.getItem('accessToken');
  let currentDeviceToken = accessToken;

  // If accessToken is available, we can extract the token id
  // if (accessToken) {
  //   const tokenParts = accessToken.split('.');
  //   if (tokenParts.length === 3) {
  //     const payload = JSON.parse(atob(tokenParts[1]));  // Decode JWT
  //     currentDeviceToken = payload.token_id;  // Assuming your token has a token_id field in the payload
  //   }
  // }

  const handleLogoutSession = async (tokenId) => {
    try {
      await logoutSession(tokenId);
      setSnackbar({
        open: true,
        message: 'Logged out from session successfully.',
        severity: 'info',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to log out from session.',
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Active Sessions</Typography>
        </Grid>

        <Grid item xs={12}>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <List>
              {sessions.map((session) => {
                const isCurrentSession = session.token_id === currentDeviceToken;

                return (
                  <ListItem key={session.id} divider>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={6}>
                        <ListItemText
                          primary={session.device}
                          secondary={`IP Address: ${session.ip_address} | Last Active: ${session.last_active_at}`}
                        />
                      </Grid>

                      <Grid item xs={12} md={6} textAlign="right">
                        {!isCurrentSession && (
                          <Tooltip title="Logout from this session">
                            <IconButton onClick={() => handleLogoutSession(session.id)}>
                              <LogoutIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {isCurrentSession && (
                          <Typography variant="caption" sx={{ color: 'green' }}>
                            This device
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Grid>
      </Grid>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default SessionList;
