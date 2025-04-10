import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useCartStore } from "../../../../store/cartStore";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const {
    cart,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <Box maxWidth="xl" sx={{ p: 4, mx: "auto" }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Cart <span style={{ opacity: 0.5 }}>({getTotalItems()} products)</span>
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Left - Cart Items */}
        <Box sx={{ flex: 2 }}>
          <Box
            sx={{
              background: "#fff",
              borderRadius: 3,
              p: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography fontWeight={600}>Product</Typography>
              <Button
                color="error"
                size="small"
                onClick={clearCart}
                sx={{ textTransform: "none" }}
              >
                Clear cart
              </Button>
            </Box>

            <Stack spacing={2}>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  onIncrease={() => increaseQuantity(item.id)}
                  onDecrease={() => decreaseQuantity(item.id)}
                />
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Right - Summary */}
        {/* <CartSummary total={getTotalPrice()} /> */}
        <CartSummary />
      </Box>
    </Box>
  );
};

export default Cart;
