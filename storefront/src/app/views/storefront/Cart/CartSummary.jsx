import React from "react";
import { useCartStore } from "../../../../store/cartStore";

const CartSummary = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <div style={{ marginLeft: "auto" }}>
      🛒 Cart: {totalItems()} item{totalItems() !== 1 ? "s" : ""}
    </div>
  );
};

export default CartSummary;
