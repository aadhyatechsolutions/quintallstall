import React, { useState, useEffect } from "react";
import {
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import useAuth from "app/hooks/useAuth";

const TwoFactorAuth = () => {
  const { user } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // Fetch user's 2FA status from the backend
    const fetchTwoFactorStatus = async () => {
      try {
        const { data } = await axiosInstance.get("/auth/two-factor/status");
        setTwoFactorEnabled(data.enabled);
      } catch (error) {
        console.error("Error fetching 2FA status:", error);
      }
    };

    fetchTwoFactorStatus();
  }, []);

  const handleToggle2FA = async () => {
    try {
      const endpoint = twoFactorEnabled ? "/auth/two-factor/disable" : "/auth/two-factor/enable";
      const { data } = await axiosInstance.post(endpoint);

      setTwoFactorEnabled(!twoFactorEnabled);
      setSnackbar({
        open: true,
        message: data.message || `Two-factor authentication ${twoFactorEnabled ? "disabled" : "enabled"} successfully!`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to update 2FA status.",
        severity: "error",
      });
    } finally {
      setDialogOpen(false);
    }
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Two-Factor Authentication
      </Typography>
      <Typography variant="body2" gutterBottom>
        {twoFactorEnabled
          ? "Two-Factor Authentication is currently enabled for your account."
          : "Two-Factor Authentication is currently disabled for your account."}
      </Typography>
      <Button
        variant="contained"
        color={twoFactorEnabled ? "error" : "primary"}
        onClick={handleOpenDialog}
        sx={{ mt: 2 }}
      >
        {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {twoFactorEnabled ? "Disable Two-Factor Authentication?" : "Enable Two-Factor Authentication?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {twoFactorEnabled
              ? "Are you sure you want to disable 2FA? This will reduce the security of your account."
              : "By enabling 2FA, your account will be protected by an additional verification step during login."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleToggle2FA}
            color={twoFactorEnabled ? "error" : "primary"}
            variant="contained"
          >
            {twoFactorEnabled ? "Disable" : "Enable"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default TwoFactorAuth;
