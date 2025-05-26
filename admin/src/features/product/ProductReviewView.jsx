import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import useReviewStore from "../../store/review/reviewStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function ViewReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchReviewById, currentReview } = useReviewStore();

  useEffect(() => {
    fetchReviewById(id);
  }, [id]);

  const renderRow = (label, value) => (
    <Grid item xs={12} md={6}>
      <Typography variant="body1">
        <strong>{label}:</strong> {value || "—"}
      </Typography>
    </Grid>
  );

  if (!currentReview) return <div>Loading...</div>;

  return (
    <Container>
      <SimpleCard title="Review Details">
        <Grid container spacing={3}>
          {renderRow("Product", currentReview.product?.name)}
          {renderRow("Name", currentReview.name)}
          {renderRow("Email", currentReview.email)}
          {renderRow("Rating", currentReview.rating)}
          {renderRow("Comment", currentReview.comment)}

          <Grid item xs={12}>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </SimpleCard>
    </Container>
  );
}
