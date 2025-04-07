import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable";
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setRetailerKYCList } from "../../../redux/retailerKYCListSlice";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function RetailerKYCList() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.retailerKYCList.columns);
  const data = useSelector((state) => state.retailerKYCList.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/retailer_kyc_list.json"); 
          const jsonData = await response.json();
          dispatch(setRetailerKYCList(jsonData));
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
    const newStatus = row.status === "Approve" ? "Disapprove" : "Approve";
    dispatch(updateRetailerKYCStatus({ srNo: row.srNo, status: newStatus }));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Retailer KYC List", path: "/retailer/kyc-list/view" }, { name: "View" }]}
        />
      </Box>

      <SimpleCard title="Retailer KYC List">
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
