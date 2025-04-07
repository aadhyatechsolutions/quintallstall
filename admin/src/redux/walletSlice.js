import { createSlice } from "@reduxjs/toolkit";

// Initial state for wallet
const initialState = {
  status: "Inactive", // Default wallet status
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setWalletStatus } = walletSlice.actions;
export default walletSlice.reducer;
