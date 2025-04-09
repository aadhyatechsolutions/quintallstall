import {
  Dialog,
  Box,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useCartStore } from "../../../../../store/cartStore";
import { useNavigate } from "react-router-dom";

const CartDialog = ({ open, onClose }) => {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs" fullWidth>
      <Box className="onhover-div" sx={{ p: 2 }}>
        <List className="cart-list" disablePadding>
          {cart.length === 0 ? (
            <Typography variant="body2" sx={{ p: 1 }}>
              Your cart is empty.
            </Typography>
          ) : (
            cart.map((item) => (
              <ListItem key={item.id} sx={{ px: 0 }}>
                <Avatar
                  src={item.image}
                  alt={item.name}
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
          className="button-group"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={handleViewCart}
            sx={{
              flex: 1,
              borderColor: "#a51624",
              color: "#a51624",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                borderColor: "#820f1a",
                backgroundColor: "#fff0f1",
              },
            }}
          >
            View Cart
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={handleCheckout}
            sx={{
              flex: 1,
              backgroundColor: "#a51624",
              color: "#fff",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#820f1a",
              },
            }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CartDialog;
