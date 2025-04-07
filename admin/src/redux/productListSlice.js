import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns || state.columns;
    },
    updateProductStatus: (state, action) => {
      const { srNo, status } = action.payload;
      const index = state.data.findIndex((item) => item.srNo === srNo);
      if (index !== -1) {
        state.data[index].status = status; 
      }
    },
  },
});

export const { setProductList, updateProductStatus } = productListSlice.actions;

export default productListSlice.reducer;
