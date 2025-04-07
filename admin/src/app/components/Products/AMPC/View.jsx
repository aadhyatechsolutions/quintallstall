import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAmpcData, deleteAmpc } from "../../../../redux/ampcSlice.js";
import { Box, CircularProgress, styled } from "@mui/material";
import DataTable from "app/views/material-kit/tables/DataTable";
import { Breadcrumb, SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const ViewAmpc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, columns, loading, error } = useSelector((state) => state.ampc);

  useEffect(() => {
    dispatch(fetchAmpcData()); // Dispatch async thunk action
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteAmpc(id)); // Dispatch delete action
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "AMPC", path: "/ampc/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="AMPC List">
        {!loading && !error ? (
          <DataTable
            columns={columns}
            data={data}
            onDelete={handleDelete} 
            onEdit={(row) => navigate(`/ampc/edit/${row.id}`)}
          />
        ) : (
          <div>No data available</div>
        )}
      </SimpleCard>
    </Container>
  );
};

export default ViewAmpc;
