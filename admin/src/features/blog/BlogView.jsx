import React, { useEffect } from "react";
import { Box, Typography, Grid, Button, styled } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import useBlogStore from "../../store/blog/blogStore";
import { apiConfig } from "app/config";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

export default function BlogDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchBlogById, currentBlog } = useBlogStore();

  useEffect(() => {
    fetchBlogById(id);
  }, [id]);

  if (!currentBlog) return <div>Loading...</div>;

  const {
    title,
    image,
    author,
    category,
    tags,
    content,
  } = currentBlog;

  let parsedContent = {};
  try {
    parsedContent =
      typeof content === "string" ? JSON.parse(content) : content;
  } catch {
    parsedContent = {};
  }

  return (
    <Container>
      <SimpleCard title={`Blog Details`}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography><strong>Title:</strong> {title}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography><strong>Author:</strong> {author || "Unknown"}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography><strong>Category:</strong> {category?.name || "Uncategorized"}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Tags:</strong> {Array.isArray(tags) ? tags.join(", ") : "No tags"}
            </Typography>
          </Grid>

          
         <Grid item xs={12} md={6}>
            <Typography><strong>Introduction </strong></Typography>
            <Typography>{parsedContent.introduction || "N/A"}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography><strong>Features</strong></Typography>
            <ul>
              {(parsedContent.features || []).map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </Grid>

          <Grid item xs={12}>
            <Typography><strong>Conclusion</strong></Typography>
            <Typography>{parsedContent.conclusion || "N/A"}</Typography>
          </Grid>
        {image && (
            <Grid item xs={12}>
              <img
                src={`${apiConfig.MEDIA_URL}${image}`}
                alt="Blog"
                style={{ width: 200, height: 200, objectFit: "cover" }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Box mt={2}>
              <Button variant="contained" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Box>
          </Grid>
          

        </Grid>
      </SimpleCard>
    </Container>
  );
}
