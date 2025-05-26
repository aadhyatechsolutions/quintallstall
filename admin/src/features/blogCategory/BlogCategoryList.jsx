import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb, SimpleCard } from "app/components";
import useBlogCategoryStore from "../../store/blogCategory/blogCategoryStore"; // Adjust the path
import { useNavigate } from "react-router-dom";
import useAuth from "app/hooks/useAuth";
import { authRoles } from "app/auth/authRoles";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function BlogCategoryView() {
  const {
    blogCategories,
    loading,
    error,
    fetchBlogCategories,
    deleteBlogCategory,
  } = useBlogCategoryStore();
  
  const { userRoles } = useAuth();
  const hasAccess = [authRoles.admin].some(role => userRoles.includes(role));
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogCategories();
  }, [fetchBlogCategories]);

  const handleDelete = (id) => {
    deleteBlogCategory(id);
  };

  const handleView = (id) => {
    navigate(`/frontend/blog-category/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/frontend/blog-category/edit/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Category Name", width: 250 },
    { field: "description", headerName: "Description", width: 400 },
    {
      field: "actions",
      headerName: "Actions",
      width: 225,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleView(params.row.id)}
            style={{ marginRight: 8 }}
          >
            View
          </Button>
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

  const rows = blogCategories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
  }));

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      {/* <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Blog Categories", path: "/features/blogCategory/view" }, { name: "View" }]} />
      </Box> */}

      <SimpleCard title="Blog Category List">
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
