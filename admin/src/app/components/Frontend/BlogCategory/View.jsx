import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, deleteCategory } from "../../../../redux/blogCategorySlice";
import DataTable from "app/views/material-kit/tables/DataTable"; // Import DataTable component
import { Breadcrumb, SimpleCard } from "app/components";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function ViewCategory() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blogCategory.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch the data if it's not already in the Redux store
    if (data.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/json/blog_category.json");
          const jsonData = await response.json();
          dispatch(setCategories(jsonData)); // Dispatch the data to Redux store
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
      dispatch(deleteCategory(row)); // Pass the row to the delete action
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Blog Category", path: "/blog/category/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Blog Category List">
        {data.length ? (
          <DataTable columns={[
            { field: "srNo", headerName: "SR No." },
            { field: "name", headerName: "Category Name" },
            { field: "description", headerName: "Description" },
            {
              field: "action", headerName: "Action", renderCell: (params) => (
                <>
                  <Button onClick={() => handleDelete("delete", params.row)}>Delete</Button>
                  <Button>Edit</Button>
                </>
              )
            }
          ]} data={data} onSubmit={handleDelete} />
        ) : (
          <div>Loading...</div>
        )}
      </SimpleCard>
    </Container>
  );
}
