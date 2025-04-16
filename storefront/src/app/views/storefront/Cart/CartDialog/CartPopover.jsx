import {
  Popper,
  Paper,
  Box,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Grow,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useCartStore } from "../../../../../store/cartStore";
import { useNavigate } from "react-router-dom";
import { apiConfig } from "../../../../../config";
import { useEffect, useState } from "react";

const CartPopover = ({
  open,
  anchorEl,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const loadCart = useCartStore((state) => state.loadCart);
  const syncStatus = useCartStore((state) => state.syncStatus);
  const navigate = useNavigate();
  const [removingId, setRemovingId] = useState(null);

  const handleCartOnClick = () => {
    onClose();
    navigate("/cart");
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const handleRemoveItem = async (itemId) => {
    setRemovingId(itemId);
    const success = await removeFromCart(itemId);
    if (!success) {
      console.error("Failed to remove item");
    }
    setRemovingId(null);
  };

  useEffect(() => {
      loadCart();
  }, [loadCart]);

  // Updated to access items from cart object
  const cartItems = Array.isArray(cart?.items) ? cart.items : [];

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      transition
      placement="top-end"
      disablePortal={false}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
      style={{ zIndex: 1200 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            elevation={4}
            sx={{
              width: 320,
              maxWidth: "90vw",
              p: 2,
              borderRadius: 2,
              zIndex: (theme) => theme.zIndex.modal + 10,
            }}
          >
            <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <List disablePadding>
                {syncStatus === "syncing" ? (
                  <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : cartItems.length === 0 ? (
                  <Typography variant="body2" sx={{ p: 1 }}>
                    Your cart is empty.
                  </Typography>
                ) : (
                  cartItems.map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        px: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveItem(item.id)}
                          size="small"
                          sx={{ color: "gray" }}
                          disabled={removingId === item.id}
                        >
                          {removingId === item.id ? (
                            <CircularProgress size={16} />
                          ) : (
                            <Close fontSize="small" />
                          )}
                        </IconButton>
                      }
                    >
                      <Avatar
                        src={`${apiConfig.MEDIA_URL}${item.product.image}`}
                        alt={item.product.name}
                        variant="rounded"
                        sx={{ width: 48, height: 48, mr: 1 }}
                      />
                      <ListItemText
                        primary={item.name}
                        secondary={`Qty: ${item.quantity}`}
                        primaryTypographyProps={{ fontSize: "0.95rem" }}
                        secondaryTypographyProps={{ fontSize: "0.8rem" }}
                      />
                    </ListItem>
                  ))
                )}
              </List>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleCartOnClick}
                  sx={{
                    flex: 1,
                    borderColor: "#a51624",
                    color: "#a51624",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#a81724",
                      backgroundColor: "#a81724",
                      color: "white",
                    },
                  }}
                >
                  View Cart
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleCheckout}
                  sx={{
                    flex: 1,
                    borderColor: "#a51624",
                    background: "#fff",
                    color: "#a51624",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#a81724",
                      backgroundColor: "#a81724",
                      color: "white",
                    },
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default CartPopover;
