import React, { useEffect, useState } from "react";
import { Box, styled, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSpecialOffers, deleteSpecialOffer } from "../../../../redux/specialOfferSlice";
import DataTable from "app/views/material-kit/tables/DataTable"; // Import DataTable component
import { Breadcrumb, SimpleCard } from "app/components";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function ViewSpecialOffer() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.specialOffer.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch the data if it's not already in the Redux store
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/special_offer.json");
          const jsonData = await response.json();
          dispatch(setSpecialOffers(jsonData)); // Dispatch the data to Redux store
        } catch (err) {
          setError("Error loading data from JSON file.");
        }
      };
      fetchData();
    }
  }, [data.length, dispatch]);

  const handleDelete = (action, row) => {
    if (action === "delete") {
      // Dispatch the delete action to Redux store
      dispatch(deleteSpecialOffer(row)); // Pass the row to the delete action
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Special Offers", path: "/special-offers/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Special Offer List">
        {data.length ? (
          <DataTable
            columns={[
              { field: "srNo", headerName: "SR No." },
              { field: "title", headerName: "Title" },
              { field: "secondTitle", headerName: "Second Title" },
              { field: "shortDec", headerName: "Short Description" },
              { field: "image", headerName: "Image", renderCell: (params) => <img src={params.row.image} alt="Offer" width={50} /> },
              { field: "shopButtonText", headerName: "Shop Button Text" },
              { field: "shopButtonLink", headerName: "Shop Button Link" },
              {
                field: "action",
                headerName: "Action",
                renderCell: (params) => (
                  <>
                    <Button onClick={() => handleDelete("delete", params.row)} color="secondary">
                      Delete
                    </Button>
                    <Button>Edit</Button>
                  </>
                ),
              },
            ]}
            data={data}
            onSubmit={handleDelete}
          />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
