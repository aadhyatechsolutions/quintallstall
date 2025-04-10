import React from "react";
import { useCategories } from "../../../../hooks/useCategories";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";

const CategoriesList = () => {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading)
    return <CircularProgress sx={{ display: "block", m: "2rem auto" }} />;
  if (error) return <Alert severity="error">Error loading categories.</Alert>;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CategoriesList;
