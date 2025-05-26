import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import useBlogCategoryStore from "../../store/blogCategory/blogCategoryStore";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function BlogCategoryDetails() {
  const { id } = useParams();
  const {
    blogCategories,
    fetchBlogCategories,
    loading,
    error,
  } = useBlogCategoryStore();

  useEffect(() => {
    fetchBlogCategories();
  }, [fetchBlogCategories]);

  const category = blogCategories.find((cat) => cat.id === parseInt(id));

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Blog Categories", path: "/frontend/blog-category/view" },
            { name: "Details" },
          ]}
        />
      </Box>

      <SimpleCard title="Blog Category Details">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : !category ? (
          <Typography>Category not found.</Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>
              <strong>ID:</strong> {category.id}
            </Typography>
            <Typography>
              <strong>Name:</strong> {category.name}
            </Typography>
            <Typography>
              <strong>Description:</strong>{" "}
              {category.description ? category.description : "N/A"}
            </Typography>
          </Box>
        )}
      </SimpleCard>
    </Container>
  );
}
