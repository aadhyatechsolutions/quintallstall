import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Snackbar, Alert } from "@mui/material";
import useUserStore from "../../store/user/userStore"; // Assuming this hook handles the user data update
import useAuth from "app/hooks/useAuth"; // Assuming this hook provides user context

const PasswordUpdate = ({ onSubmit }) => {
  const { user: currentUser } = useAuth(); // Fetch user data using useAuth hook
  const { updateUser } = useUserStore(); // Get the updateUser method from the user store

  // State to store form data
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Handle password changes
  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Clear input fields after successful update
  const clearFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "New passwords do not match.",
        severity: "error",
      });
      return;
    }

    // Prepare the data to submit
    const dataToSubmit = {
      current_password: currentPassword,
      password: newPassword,
      _method: "put", // Add _method for PUT request
    };

    try {
      // Try to update the user's password
      await updateUser(currentUser.id, dataToSubmit);

      setSnackbar({
        open: true,
        message: "Password updated successfully!",
        severity: "success",
      });

      // Trigger the onSubmit callback if available
      if (onSubmit) onSubmit(dataToSubmit);

      // Clear fields after successful submission
      clearFields();
    } catch (error) {
      // Handle error - Could be invalid current password or other issues
      setSnackbar({
        open: true,
        message: error?.message || "Failed to update password",
        severity: "error",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: 'auto', textAlign: 'left' }} // Make the button smaller and left-aligned
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar to show success/error messages */}
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

export default PasswordUpdate;
