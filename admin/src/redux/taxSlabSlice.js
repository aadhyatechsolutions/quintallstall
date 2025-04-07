import { createSlice } from "@reduxjs/toolkit";

// Initial state for tax slab data
const initialState = {
  taxSlabData: {
    cgst: "",
    sgst: "",
    igst: "",
  },
};

const taxSlabSlice = createSlice({
  name: "taxSlab",
  initialState,
  reducers: {
    setTaxSlab: (state, action) => {
      // Update the tax slab data with the payload
      state.taxSlabData = action.payload;
    },
  },
});

export const { setTaxSlab } = taxSlabSlice.actions;
export default taxSlabSlice.reducer;
