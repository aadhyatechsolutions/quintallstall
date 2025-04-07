import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable";
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setProductMaster,deleteProductMaster } from "../../../../redux/productMasterSlice";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function View() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.productMaster.columns);
  const data = useSelector((state) => state.productMaster.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch the data if it's not already in the Redux store
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/product_master_list.json");
          const jsonData = await response.json();
          dispatch(setProductMaster(jsonData)); // Dispatch the data to Redux store
        } catch (err) {
          setError("Error loading data from JSON file.");
        }
      };
      fetchData();
    }
  }, []);

  const handleDelete = (action, row) => {
    if (action === "delete") {
      // Dispatch the delete action to Redux store
      dispatch(deleteProductMaster(row)); // Pass the row to the deleteCategory action
    }
  };
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: "Product Master", path: "/products/product-master/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Product Master List">
        {columns.length && data.length ? (
          <DataTable columns={columns} data={data} onSubmit={handleDelete} />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
