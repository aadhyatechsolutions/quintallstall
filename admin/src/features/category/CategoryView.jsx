import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb, SimpleCard } from "app/components";
import useCategoryStore from "../../store/category/categoryStore";  // Importing category store
import { useNavigate } from "react-router-dom";
import {apiConfig} from 'app/config';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function CategoryView() {
  const { categories, loading, error, fetchCategories, deleteCategory } = useCategoryStore(); // Use category store
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories(); 
  }, [fetchCategories]);

  const handleDelete = (id) => {
    deleteCategory(id); 
  };

  const handleEdit = (id) => {
    navigate(`/features/category/edit/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Category Name", width: 300 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => (
        <img src={`${apiConfig.MEDIA_URL}${params.value}`} alt="Category" style={{ width: 50, height: 50, objectFit: 'cover' }} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    image: category.image
  }));

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Category Master", path: "/categories/category-master/view" },
            { name: "View" },
          ]}
        />
      </Box>

      <SimpleCard title="Category Master List">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
          />
        )}
      </SimpleCard>
    </Container>
  );
}
