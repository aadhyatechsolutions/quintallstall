import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable"; // Import DataTable component
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setCoinList, deleteCoinListItem,updateCoinStatus } from "../../../../redux/coinListSlice"; // Import the necessary actions

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function ViewCoinListItems() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.coinList.columns);
  const data = useSelector((state) => state.coinList.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch the data if it's not already in the Redux store
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/coin_list.json"); // Path to your JSON file with coin list data
          const jsonData = await response.json();
          dispatch(setCoinList(jsonData)); // Dispatch the data to Redux store
        } catch (err) {
          setError("Error loading data from JSON file.");
        }
      };
      fetchData();
    }
  }, [data.length, dispatch]);

  const handleStatusChange = (row) => {
    const newStatus = row.status === "Active" ? "InActive" : "Active";
    dispatch(updateCoinStatus({ srNo: row.srNo, status: newStatus }));
  };

  const handleDelete = (action, row) => {
    if (action === "delete") {
      // Dispatch the delete action to Redux store
      dispatch(deleteCoinListItem(row)); // Pass the row to the deleteCoinListItem action
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Coin List", path: "/coin-list/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Coin List Items">
        {columns.length && data.length ? (
          <DataTable columns={columns} data={data} onSubmit={handleDelete} onStatusChange={handleStatusChange}   />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
