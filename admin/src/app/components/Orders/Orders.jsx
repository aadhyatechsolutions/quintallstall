import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable"; // Assuming you have a reusable DataTable component
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setOrderList } from "../../../redux/orderListSlice"; // Adjust the redux slices accordingly

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function OrderList() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.orderList.columns); // Assuming you have an orderList slice with columns
  const data = useSelector((state) => state.orderList.data); // Assuming you have an orderList slice with data
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/order_list.json"); // Adjust the JSON path to your needs
          const jsonData = await response.json();
          dispatch(setOrderList(jsonData)); // Populate your Redux state with the fetched data
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

  const handleStatusChange = (row) => {
    // Handle any specific status changes here if needed
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Order List", path: "/orders/order-list/view" }, { name: "View" }]}
        />
      </Box>

      <SimpleCard title="Order List">
        {columns.length && data.length ? (
          <DataTable
            columns={columns}
            data={data}
            onSubmit={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
