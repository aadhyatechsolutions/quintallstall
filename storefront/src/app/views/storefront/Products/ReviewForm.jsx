import { useSubmitReview } from "../../../../hooks/reviewHooks";
import { useState } from "react";
import {
  TextField,
  Button,
  Rating,
  Stack,
  Box,
  CircularProgress,
  Grid,
  Typography,
  Alert,
} from "@mui/material";

const ReviewForm = ({ productId }) => {
  const {
    mutate: submitReview,
    isPending,
    isSuccess,
    isError,
  } = useSubmitReview();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    rating: false,
    comment: false,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleRatingChange = (event, newValue) => {
    setForm((prev) => ({ ...prev, rating: newValue }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: form.name.trim() === "",
      email: !validateEmail(form.email),
      rating: form.rating === 0,
      comment: form.comment.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    submitReview(
      {
        ...form,
        product_id: productId,
        rating: parseInt(form.rating),
      },
      {
        onSuccess: () => {
          setForm({
            name: "",
            email: "",
            rating: 0,
            comment: "",
          });
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 2000); // Hide after 2 seconds
        },
      }
    );
  };

  return (
    <Stack spacing={2}>
      {showSuccess && (
        <Alert severity="success" onClose={() => {}}>
          Review submitted successfully!
        </Alert>
      )}
      {isError && (
        <Alert severity="error" onClose={() => {}}>
          Failed to submit review. Please try again.
        </Alert>
      )}

      <Box>
        {/* <Typography component="legend">Rating*</Typography> */}
        <Rating
          name="rating"
          value={Number(form.rating)}
          onChange={handleRatingChange}
          precision={1}
        />
        {errors.rating && (
          <Typography color="error" variant="caption">
            Please select a rating
          </Typography>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            name="name"
            onChange={handleChange}
            placeholder="Name*"
            fullWidth
            variant="filled"
            value={form.name}
            error={errors.name}
            helperText={errors.name ? "Please enter your name" : ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            name="email"
            onChange={handleChange}
            placeholder="Email*"
            fullWidth
            variant="filled"
            value={form.email}
            error={errors.email}
            helperText={errors.email ? "Please enter a valid email" : ""}
          />
        </Grid>
      </Grid>

      <TextField
        name="comment"
        onChange={handleChange}
        placeholder="Your comment*"
        fullWidth
        multiline
        rows={4}
        variant="filled"
        value={form.comment}
        error={errors.comment}
        helperText={errors.comment ? "Please enter your comment" : ""}
      />

      <Box>
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          variant="contained"
          sx={{ backgroundColor: "#a81724" }}
        >
          {isPending ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </Box>
    </Stack>
  );
};

export default ReviewForm;
