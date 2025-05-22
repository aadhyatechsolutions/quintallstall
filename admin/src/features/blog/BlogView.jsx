import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SimpleCard } from "app/components";
import { useNavigate } from "react-router-dom";
import useBlogStore from "../../store/blog/blogStore"; // Adjust path if needed
import { apiConfig } from "app/config";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function BlogView() {
  const { blogs, loading, error, fetchBlogs, deleteBlog } = useBlogStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = (id) => {
    deleteBlog(id);
  };

  const handleView = (id) => {
    navigate(`/features/blog/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/features/blog/edit/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "category", headerName: "Category", width: 150 },

    {
      field: "introduction",
      headerName: "Introduction",
      width: 300,
      renderCell: (params) => params.value || "N/A",
    },

    {
      field: "features",
      headerName: "Features",
      width: 300,
      renderCell: (params) => {
        if (Array.isArray(params.value) && params.value.length > 0) {
          return params.value.join(", ");
        }
        return "No features available";
      },
    },

    {
      field: "conclusion",
      headerName: "Conclusion",
      width: 300,
      renderCell: (params) => params.value || "N/A",
    },

    {
      field: "tags",
      headerName: "Tags",
      width: 200,
      renderCell: (params) => {
        if (Array.isArray(params.value) && params.value.length > 0) {
          return params.value.join(", ");
        }
        return "No tags";
      },
    },

    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={`${apiConfig.MEDIA_URL}${params.value}`}
          alt="Blog"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },

    { field: "author", headerName: "Author", width: 150 },

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

  const rows = blogs.map((blog) => {
    let content = {};
    try {
      content =
        typeof blog.content === "string" ? JSON.parse(blog.content) : blog.content;
    } catch {
      content = {};
    }

    return {
      id: blog.id,
      title: blog.title,
      category: blog.category?.name || "Uncategorized",
      introduction: content.introduction || "N/A",
      features: content.features || [],
      conclusion: content.conclusion || "N/A",
      tags: blog.tags || [], // assuming tags are top-level array in blog object
      image: blog.image,
      author: blog.author || "Unknown",
    };
  });

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <SimpleCard title="Blog Master List">
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
