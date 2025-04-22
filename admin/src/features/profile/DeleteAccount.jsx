import React, { useState } from "react";
import {
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useUserStore from "../../store/user/userStore"; // assumes you have this
import useAuth from "app/hooks/useAuth"; // assumes this gives you current user & setUser

const DeleteAccount = () => {
  const { user: currentUser, logout } = useAuth();
  const { deleteUser } = useUserStore(); // assumes this function deletes user from backend

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleDelete = async () => {
    try {
      await deleteUser(currentUser.id); // assuming `deleteUser(id)` deletes the user
      setSnackbar({
        open: true,
        message: "Account deleted successfully!",
        severity: "success",
      });
      logout(); // log out the user after deletion
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to delete account",
        severity: "error",
      });
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpenDialog}
        style={{ marginTop: "20px" }}
      >
        Delete Account
      </Button>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once your account is deleted, <strong>all of its resources and data will be permanently deleted</strong>. Before deleting your account, please download any data or information that you wish to retain.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Yes, delete my account
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteAccount;
