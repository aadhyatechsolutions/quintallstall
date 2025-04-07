import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable";
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setWholeSellerUser } from "../../../../redux/wholeSellerUserSlice";

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
  const columns = useSelector((state) => state.wholeSellerUser.columns);
  const data = useSelector((state) => state.wholeSellerUser.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
        const fetchData = async () => {
        try {
            const response = await fetch("/json/whole_seller_list.json");
            const jsonData = await response.json();
            dispatch(setWholeSellerUser(jsonData));
        } catch (err) {
            setError("Error loading data from JSON file.");
        }
        };
        fetchData();
    }
  }, []);

  const handleDelete = (action, row) => {
    if (action === "delete") {
      dispatch(deleteAmpc(row));
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: "WholeSeller User", path: "/wholeseller/wholeseller-user/view" }, { name: "view" }]} />
      </Box>

      <SimpleCard title="WholeSeller List">
        {columns.length && data.length ? (
          <DataTable columns={columns} data={data} onSubmit={handleDelete} />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
