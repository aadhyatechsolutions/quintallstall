import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  styled,
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import useSpecialOfferStore from "../../store/specialOffer/specialOfferStore";
import { apiConfig } from "app/config";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function SpecialOfferDetails() {
  const { id } = useParams();
  const {
    specialOffers,
    fetchSpecialOffers,
    loading,
    error,
  } = useSpecialOfferStore();

  useEffect(() => {
    fetchSpecialOffers();
  }, [fetchSpecialOffers]);

  const offer = specialOffers.find((item) => item.id === parseInt(id));

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Special Offers", path: "/frontend/special-offer/view" },
            { name: "Details" },
          ]}
        />
      </Box>

      <SimpleCard title="Special Offer Details">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : !offer ? (
          <Typography>Special offer not found.</Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography >
              <strong>ID:</strong> {offer.id}
            </Typography>
            <Typography >
              <strong>Title:</strong> {offer.title}
            </Typography>
            <Typography >
              <strong>Second Title:</strong> {offer.second_title || "N/A"}
            </Typography>
            <Typography >
              <strong>Short Description:</strong>{" "}
              {offer.short_description || "N/A"}
            </Typography>
            <Typography >
              <strong>Shop Button Text:</strong>{" "}
              {offer.shop_button_text || "N/A"}
            </Typography>
            <Typography >
              <strong>Image:</strong>
            </Typography>
            {offer.image ? (
              <img
                src={`${apiConfig.MEDIA_URL}${offer.image}`}
                alt="Special Offer"
                style={{ width: 200, height: "auto", objectFit: "cover" }}
              />
            ) : (
              <Typography>No image available</Typography>
            )}
          </Box>
        )}
      </SimpleCard>
    </Container>
  );
}
