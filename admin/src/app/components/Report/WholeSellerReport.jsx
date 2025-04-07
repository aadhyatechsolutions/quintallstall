import { Box, styled, TextField, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "app/views/material-kit/tables/DataTable"; // Assuming you have a reusable DataTable component
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { setWholeSellerReport } from "../../../redux/wholeSellerReportSlice"; // Import the set action

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function WholeSellerReport() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.wholeSellerReport.columns);
  const data = useSelector((state) => state.wholeSellerReport.data);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Start with empty array
  const [filter, setFilter] = useState({
    wholesellerName: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/wholeseller_report_list.json");
          const jsonData = await response.json();
          dispatch(setWholeSellerReport(jsonData));
        } catch (err) {
          setError("Error loading data from JSON file.");
        }
      };
      fetchData();
    } else {
      setFilteredData(data); // Set filteredData once data is loaded
    }
  }, [data, dispatch]);

  // Handle filter field change
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // Handle filter submit
  const handleFilterSubmit = () => {
    const { wholesellerName, fromDate, toDate } = filter;

    let filtered = data;

    if (wholesellerName) {
      filtered = filtered.filter((item) =>
        item.wholesellerName.toLowerCase().includes(wholesellerName.toLowerCase())
      );
    }

    if (fromDate) {
      filtered = filtered.filter((item) => new Date(item.date) >= new Date(fromDate));
    }

    if (toDate) {
      filtered = filtered.filter((item) => new Date(item.date) <= new Date(toDate));
    }

    setFilteredData(filtered); // Update filteredData state with filtered results
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "WholeSeller Report", path: "/reports/wholeseller-report/view" }, { name: "View" }]}
        />
      </Box>

      <SimpleCard title="WholeSeller Report">
        {/* Filter Section */}
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Wholeseller Name"
                name="wholesellerName"
                value={filter.wholesellerName}
                onChange={handleFilterChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="From Date"
                name="fromDate"
                type="date"
                value={filter.fromDate}
                onChange={handleFilterChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="To Date"
                name="toDate"
                type="date"
                value={filter.toDate}
                onChange={handleFilterChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleFilterSubmit}
                sx={{ height: "100%" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Displaying Data Table */}
        {columns.length && filteredData.length ? (
          <DataTable columns={columns} data={filteredData} />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
