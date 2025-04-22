import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Snackbar, Alert } from "@mui/material";
import useUserStore from "../../store/user/userStore"; // Assuming this hook handles the user data update
import useAuth from "app/hooks/useAuth"; // Assuming this hook provides user context

const EmailUserUpdate = ({ currentData, onSubmit }) => {
  const { user: currentUser } = useAuth(); // Fetch user data using useAuth hook
  const { updateUser } = useUserStore(); // Get the updateUser method from the user store

  // State to store form data
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Load current user data into the form fields if available
  useEffect(() => {
    if (currentUser) {
      setFormData({
        first_name: currentUser.first_name || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to submit
    const dataToSubmit = {
      first_name: formData.first_name,
      email: formData.email,
      _method: "put", // Add _method for PUT request
    };

    try {
      // Call updateUser to update the user data
      await updateUser(currentUser.id, dataToSubmit); // Assuming updateUser takes user ID and new data
      setSnackbar({
        open: true,
        message: "Email updated successfully!",
        severity: "success",
      });

      // Trigger the onSubmit callback if available
      if (onSubmit) onSubmit(dataToSubmit);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update email",
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
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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

export default EmailUserUpdate;
