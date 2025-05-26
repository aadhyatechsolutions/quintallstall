import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; 
import { Breadcrumb, SimpleCard } from "app/components";
import useReviewStore from "../../store/review/reviewStore";  // Import review store
import { useNavigate } from "react-router-dom"; 
import { apiConfig } from 'app/config';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function ReviewView() {
  const { reviews, loading, error, fetchReviews, deleteReview } = useReviewStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = (id) => {
    deleteReview(id);
  };

  const handleView = (id) => {
    navigate(`/features/product/reviewsView/${id}`);
  };

  const columns = [
    { field: "id", headerName: "Review ID", width: 100 },
    {
      field: "product_name",
      headerName: "Product",
      width: 200,
      renderCell: (params) => `${params.row.product.name}`,  // Use renderCell instead of valueGetter
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "rating", headerName: "Rating", width: 100 },
    { field: "comment", headerName: "Comment", width: 500 },
    {
          field: "actions",
          headerName: "Actions",
          width: 75,
          renderCell: (params) => (
            <Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleView(params.row.id)}
                style={{ marginRight: 8 }}
              >
                View
              </Button>
            </Box>
          ),
        },
  ];

  const rows = reviews.map((review) => ({
    id: review.id,
    product: review.product,  // Include the product object to be used in renderCell
    name: review.name,
    email: review.email,
    rating: review.rating,
    comment: review.comment,
  }));

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Review Master", path: "/reviews/review-master/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Review Master List">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
          />
        )}
      </SimpleCard>
    </Container>
  );
}
