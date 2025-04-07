import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable";
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setProductList, updateProductStatus } from "../../../redux/productListSlice";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function ProductList() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.productList.columns);
  const data = useSelector((state) => state.productList.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/product_list.json");
          const jsonData = await response.json();
          dispatch(setProductList(jsonData));
        } catch (err) {
          setError("Error loading data from JSON file.");
        }
      };
      fetchData();
    }
  }, [data, dispatch]);

  const handleDelete = (action, row) => {
    if (action === "delete") {
      console.log("Delete row:", row);
    }
  };

  // Handle status change (toggle between approved and disapproved)
  const handleStatusChange = (row) => {
    const newStatus = row.status === "approve" ? "disapprove" : "approve";
    dispatch(updateProductStatus({ srNo: row.srNo, status: newStatus }));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Product List", path: "/products/product-list/view" }, { name: "View" }]}
        />
      </Box>

      <SimpleCard title="Product List">
        {columns.length && data.length ? (
          <DataTable
            columns={columns}
            data={data}
            onSubmit={handleDelete}
            onStatusChange={handleStatusChange}  // Passing the single status change handler
          />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
