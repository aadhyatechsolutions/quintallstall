import React, { useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { Breadcrumb } from "app/components";
import SimpleCard from "app/components/SimpleCard";
import EmailUserUpdate from "./EmailUserUpdate";
import PasswordUpdate from "./PasswordUpdate";
import DeleteAccount from "./DeleteAccount";
import SessionList from "./SessionList";

const ProfileEdit = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Breadcrumb
        routeSegments={[
          { name: "Profile", path: "/dashboard" },
          { name: "Edit Profile" },
        ]}
      />

      {/* Email Update */}
      <Box boxShadow={3} borderRadius={2} mb={4}>
        <SimpleCard title="Update Email">
          <EmailUserUpdate />
        </SimpleCard>
      </Box>

      {/* Password Update */}
      <Box boxShadow={3} borderRadius={2} mb={4}>
        <SimpleCard title="Update Password">
          <PasswordUpdate />
        </SimpleCard>
      </Box>

      <Box boxShadow={3} borderRadius={2} mb={4}>
        <SimpleCard title="Active Browser Sessions">
          <SessionList setSnackbar={setSnackbar} />
        </SimpleCard>
      </Box>
      
      {/* Delete Account */}
      <Box boxShadow={3} borderRadius={2}>
        <SimpleCard title="Delete Account">
          <DeleteAccount />
        </SimpleCard>
      </Box>

   

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileEdit;
