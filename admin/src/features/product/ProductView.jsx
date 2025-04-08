import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; 
import { Breadcrumb, SimpleCard } from "app/components";
import useProductStore from "../../store/product/productStore";
import { useNavigate } from "react-router-dom"; 
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function View() {
  const { products, loading, error, fetchProducts, deleteProduct } = useProductStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = (id) => {
    deleteProduct(id);
  };
  const handleEdit = (id) => {
    navigate(`/features/product/edit/${id}`);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Product Name", width: 300 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => (
        <img src={params.value} alt="Product" style={{ width: 50, height: 50, objectFit: 'cover' }} />
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


  const rows = products.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category.name,
    description: product.description,
    image: product.image,
  }));

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Product Master", path: "/products/product-master/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Product Master List">
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
