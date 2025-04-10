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
  const { products, loading, error, fetchProductsBySlug, deleteProduct, updateProductStatus } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductsBySlug('wholesaler');
  }, [fetchProductsBySlug]);

  const handleDelete = (id) => {
    deleteProduct(id);
  };
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateProductStatus(id, newStatus);
      // fetchProducts(); 
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };
  const handleEdit = (id) => {
    navigate(`/features/product/edit/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 100 }, 
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "unit", headerName: "Unit", width: 100 },
    { field: "user", headerName: "Vendor Name", width: 150 },   
    { field: "role", headerName: "Vendor Type", width: 150 }, 
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="Product" style={{ width: 50, height: 50, objectFit: 'cover' }} />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleToggleStatus(params.row.id, params.row.status)}
          style={{
            backgroundColor: params.value === "active" ? "green" : "red",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          {params.value}
        </Button>
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
    price: product.price,
    quantity: product.quantity,
    unit: product.unit,    
    user: product.user?.first_name,
    role: product.user?.roles[0]?.name || "No role",
    image: product.image,
    status: product.status,
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
