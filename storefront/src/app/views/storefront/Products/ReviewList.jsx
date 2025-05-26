import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useReviews,
  useDeleteReview,
  useUpdateReview,
} from "../../../../hooks/reviewHooks";
import { useUserStore } from "../../../../store/userStore";

const ReviewList = ({ productId }) => {
  const theme = useTheme();
  const { data: reviews, isLoading, isError } = useReviews(productId);
  const deleteReviewMutation = useDeleteReview();
  const updateReviewMutation = useUpdateReview();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentUser = useUserStore((state) => state.currentUser);
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);

  // Check login status on component mount and when token might change
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const userId = currentUser?.id;
  const filteredReviews = reviews;

  // console.log("filteredReviews",filteredReviews);
  

  // Edit handlers
  const handleEditOpen = (review) => {
    setEditReview({
      id: review.id,
      name: review.name,
      rating: review.rating,
      comment: review.comment,
    });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditReview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setEditReview((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleUpdateReview = async () => {
    if (!editReview) return;
    try {
      await updateReviewMutation.mutateAsync({
        id: editReview.id,
        name: editReview.name,
        rating: editReview.rating,
        comment: editReview.comment,
      });
      setSnackbar({
        open: true,
        message: "Review updated successfully!",
        severity: "success",
      });
      handleEditClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update review. Please try again.",
        severity: "error",
      });
    }
  };

  // Delete handlers
  const handleDeleteClick = (id) => {
    setDeleteReviewId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteReviewMutation.mutateAsync(deleteReviewId);
      setSnackbar({
        open: true,
        message: "Review deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete review. Please try again.",
        severity: "error",
      });
    } finally {
      setDeleteDialogOpen(false);
      setDeleteReviewId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteReviewId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ my: 3, borderRadius: 2 }}>
        Failed to load reviews. Please refresh the page.
      </Alert>
    );
  }

  if (!filteredReviews || filteredReviews.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          my: 4,
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: theme.shadows[2],
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No reviews yet. Be the first to review this product!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: theme.palette.text.primary,
          mb: 3,
        }}
      >
        Customer Reviews
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {filteredReviews.length} review
          {filteredReviews.length !== 1 ? "s" : ""}
        </Typography>
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {filteredReviews.map((review) => (
          <Grid size={{ xs: 12 }} key={review.id}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                position: "relative",
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: theme.shadows[1],
                },
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 40,
                    height: 40,
                  }}
                >
                  {review.name.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.name}
                    </Typography>
                    <Rating
                      value={review.rating}
                      readOnly
                      size="medium"
                      precision={0.5}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5 }}
                  >
                    Reviewed on{" "}
                    {new Date(review.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      lineHeight: 1.6,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {review.comment}
                  </Typography>
                </Box>
              </Box>
              {/* button for edit and delete */}
              {isLoggedIn && userId === review.user_id && (
                <Box
                  sx={{
                    top: 16,
                    right: 16,
                    display: "flex",
                    gap: 0.5,
                    justifyContent: "end",
                  }}
                >
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEditOpen(review)}
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        color: theme.palette.primary.main,
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDeleteClick(review.id)}
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        color: theme.palette.error.main,
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Edit Review Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: "bold",
          }}
        >
          Edit Review
        </DialogTitle>
        <DialogContent sx={{ py: 3, mt: 2 }}>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            value={editReview?.name || ""}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 3 }}>
            <Typography component="legend" sx={{ mb: 1 }}>
              Rating
            </Typography>
            <Rating
              name="rating"
              value={editReview?.rating || 0}
              onChange={handleRatingChange}
              size="large"
              precision={1}
            />
          </Box>
          <TextField
            margin="dense"
            label="Comment"
            name="comment"
            fullWidth
            multiline
            minRows={4}
            variant="outlined"
            value={editReview?.comment || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleEditClose}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateReview}
            disabled={updateReviewMutation.isLoading}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              ml: 2,
            }}
          >
            {updateReviewMutation.isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Update Review"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: theme.palette.error.light,
            color: theme.palette.error.contrastText,
            fontWeight: "bold",
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ py: 3, mt: 2 }}>
          <Typography variant="body1">
            Are you sure you want to delete this review? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            disabled={deleteReviewMutation.isLoading}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              ml: 2,
            }}
          >
            {deleteReviewMutation.isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Delete Review"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: theme.shadows[3],
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewList;
