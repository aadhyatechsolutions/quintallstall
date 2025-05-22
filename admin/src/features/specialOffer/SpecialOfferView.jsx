import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; 
import { SimpleCard } from "app/components";
import useSpecialOfferStore from "../../store/specialOffer/specialOfferStore";
import { useNavigate } from "react-router-dom"; 
import { apiConfig } from "app/config";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function SpecialOffersView() {
  const { specialOffers, loading, error, fetchSpecialOffers, deleteSpecialOffer } = useSpecialOfferStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpecialOffers();
  }, [fetchSpecialOffers]);

  const handleDelete = (id) => {
    deleteSpecialOffer(id);
  };

  const handleEdit = (id) => {
    navigate(`/frontend/special-offer/edit/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "second_title", headerName: "Second Title", width: 200 },
    { field: "short_description", headerName: "Short Description", width: 300 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        params.value ? (
          <img
            src={`${apiConfig.MEDIA_URL}${params.value}`}
            alt="Offer"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          <Box sx={{ color: "text.disabled", fontStyle: "italic" }}>No Image</Box>
        )
      ),
    },
    { field: "shop_button_text", headerName: "Button Text", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = specialOffers.map((offer) => ({
    id: offer.id,
    title: offer.title,
    second_title: offer.second_title || "-",
    short_description: offer.short_description || "-",
    image: offer.image,
    shop_button_text: offer.shop_button_text || "-",
  }));

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <SimpleCard title="Special Offers List">
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
