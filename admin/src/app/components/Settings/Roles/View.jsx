import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable"; // Import DataTable component
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setRoles, deleteRole } from "../../../../redux/roleSlice"; // Import the necessary actions from roleSlice

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function ViewRoles() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.roles.columns); // Accessing columns from the state
  const data = useSelector((state) => state.roles.data); // Accessing data from the state
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch the data if it's not already in the Redux store
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/roles.json"); // Path to your JSON file with role data
          const jsonData = await response.json();
          dispatch(setRoles(jsonData)); // Dispatch the data to Redux store
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
      dispatch(deleteRole(row)); // Pass the row to the deleteRole action
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Roles", path: "/roles/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Role List">
        {columns.length && data.length ? (
          <DataTable columns={columns} data={data} onSubmit={handleDelete} />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
