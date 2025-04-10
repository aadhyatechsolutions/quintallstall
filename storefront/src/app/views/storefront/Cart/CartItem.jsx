import React from "react";
import { Box, Typography, Card, CardMedia, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { apiConfig } from "../../../../config";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => (
  <Card
    sx={{
      display: "flex",
      alignItems: "center",
      p: 2,
      borderRadius: 2,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    }}
  >
    <CardMedia
      component="img"
      sx={{ width: 70, height: 70, borderRadius: 2, mr: 2 }}
      image={`${apiConfig.MEDIA_URL}${item.image}`}
      alt={item.name}
    />
    <Box sx={{ flex: 1 }}>
      <Typography fontWeight={500}>{item.name}</Typography>
      <Typography fontSize={12} color="text.secondary">
        {item.variant || "White"}
      </Typography>
    </Box>

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid #ccc",
        borderRadius: 1,
        px: 1,
        py: 0.5,
        mr: 3,
      }}
    >
      <IconButton size="small" onClick={onDecrease}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography>{item.quantity}</Typography>
      <IconButton size="small" onClick={onIncrease}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>

    <Typography fontWeight={600} mr={2}>
      RS:{(item.price * item.quantity).toFixed(2)}
    </Typography>

    <IconButton onClick={onRemove}>
      <DeleteIcon color="error" />
    </IconButton>
  </Card>
);

export default CartItem;
