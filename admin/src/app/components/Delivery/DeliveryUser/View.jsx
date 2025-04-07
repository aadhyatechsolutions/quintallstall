import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable";
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryUserList, deleteDeliveryUser, updateDeliveryUserStatus } from "../../../../redux/deliveryUserSlice";

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
  const columns = useSelector((state) => state.deliveryUser.columns);
  const data = useSelector((state) => state.deliveryUser.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/delivery_user_list.json");
          const jsonData = await response.json();
          dispatch(setDeliveryUserList(jsonData));
        } catch (err) {
          setError("Error loading data from JSON file.");
        }
      };
      fetchData();
    }
  }, [data, dispatch]);

  const handleDelete = (action, row) => {
    if (action === "delete") {
      dispatch(deleteDeliveryUser(row));
    }
  };

  const handleStatusChange = (row) => {
    const newStatus = row.status === "block" ? "unblock" : "block";
    dispatch(updateDeliveryUserStatus({ srNo: row.srNo, status: newStatus }));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Deliver User", path: "/deliver/deliver-user/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Deliver User List">
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
