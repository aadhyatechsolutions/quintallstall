import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable";
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setRetailerUser } from "../../../../redux/retailerUserSlice"; 

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function RetailerUserView() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.retailerUser.columns);
  const data = useSelector((state) => state.retailerUser.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/retailer_user_list.json"); 
          const jsonData = await response.json();
          dispatch(setRetailerUser(jsonData));
        } catch (err) {
          setError("Error loading data from JSON file.");
        }
      };
      fetchData();
    }
  }, [data, dispatch]);

  const handleDelete = (action, row) => {
    if (action === "delete") {
      dispatch(deleteRetailerUser(row));
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Retailer User", path: "/retailer/retailer-user/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Retailer User List">
        {columns.length && data.length ? (
          <DataTable columns={columns} data={data} onSubmit={handleDelete} />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
