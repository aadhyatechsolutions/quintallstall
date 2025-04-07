import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable"; // Adjust the import path accordingly
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleMasterList, deleteVehicleMaster } from "../../../../redux/vehicleMasterSlice"; // Update with correct path

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
  
  // Access the vehicleMaster slice state
  const columns = useSelector((state) => state.vehicleMaster.columns);
  const data = useSelector((state) => state.vehicleMaster.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch the data if it's not already in the Redux store
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/vehicle_master_list.json"); // Update path as needed
          const jsonData = await response.json();
          dispatch(setVehicleMasterList(jsonData)); // Dispatch the data to Redux store
        } catch (err) {
          setError("Error loading data from JSON file.");
        }
      };
      fetchData();
    }
  }, [data, dispatch]);

  const handleDelete = (action, row) => {
    if (action === "delete") {
      dispatch(deleteVehicleMaster({ srNo: row.srNo })); // Dispatch the delete action using srNo
    }
  };

  const handleEdit = (action, row) => {
    if (action === "edit") {
      // You can add an edit functionality here (e.g., open an edit modal or navigate to an edit page)
      console.log("Edit action for", row);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Vehicle Master", path: "/vehicle-master/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Vehicle Master List">
        {columns.length && data.length ? (
          <DataTable
            columns={columns}
            data={data}
            onSubmit={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
