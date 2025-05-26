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
import useCategoryStore from "../../store/category/categoryStore";
import { apiConfig } from "app/config";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function ViewCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCategoryById, currentCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategoryById(id);
  }, [id]);

  const renderRow = (label, value) => (
    <Grid item xs={12} md={6}>
      <Typography variant="body1">
        <strong>{label}:</strong> {value || "—"}
      </Typography>
    </Grid>
  );

  if (!currentCategory) return <div>Loading...</div>;

  return (
    <Container>
      <SimpleCard title="Category Details">
        <Grid container spacing={3}>
          {renderRow("Name", currentCategory.name)}
          {renderRow("Description", currentCategory.description)}

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Image</Typography>
            {currentCategory.image && (
              <img
                src={`${apiConfig.MEDIA_URL}${currentCategory.image}`}
                alt="Category"
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
              />
            )}
          </Grid>

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
