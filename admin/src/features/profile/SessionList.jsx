import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, List, ListItem, ListItemText, IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "app/hooks/useAuth"; // Assuming useAuth hook provides user context

const mockSessions = [
  {
    id: "session1",
    device: "Chrome on Windows",
    location: "New York, USA",
    lastActive: "2025-04-22 10:00 AM",
    current: true,
  },
  {
    id: "session2",
    device: "Safari on iPhone",
    location: "Los Angeles, USA",
    lastActive: "2025-04-21 09:30 PM",
    current: false,
  },
];

const SessionList = ({ setSnackbar }) => {
  const { user: currentUser } = useAuth(); // Get user context (assuming user is available via useAuth)
  const [sessions, setSessions] = useState([]);
  const [snackbar, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    // Here you'd replace the mockSessions with actual API call to fetch sessions
    setSessions(mockSessions);
  }, []);

  const handleLogoutSession = (sessionId) => {
    // Handle session logout, replace with actual API call
    setSessions(sessions.filter((session) => session.id !== sessionId));
    setSnackbarState({
      open: true,
      message: "Logged out from session successfully.",
      severity: "info",
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Active Sessions</Typography>
        </Grid>

        <Grid item xs={12}>
          <List>
            {sessions.map((session) => (
              <ListItem key={session.id} divider>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <ListItemText
                      primary={session.device}
                      secondary={`Location: ${session.location} | Last Active: ${session.lastActive}`}
                    />
                  </Grid>

                  <Grid item xs={12} md={6} textAlign="right">
                    {!session.current && (
                      <Tooltip title="Logout from this session">
                        <IconButton onClick={() => handleLogoutSession(session.id)}>
                          <LogoutIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {session.current && (
                      <Typography variant="caption" color="primary">
                        This device
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarState({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default SessionList;
