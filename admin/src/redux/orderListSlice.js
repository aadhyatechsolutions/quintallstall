import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns || state.columns;
    },
    updateOrderStatus: (state, action) => {
      const { srNo, status } = action.payload;
      const index = state.data.findIndex((item) => item.srNo === srNo);
      if (index !== -1) {
        state.data[index].status = status;
      }
    },
  },
});
export const selectTotalOrders = (state) => state.orderList.data.length;
export const { setOrderList, updateOrderStatus } = orderListSlice.actions;

export default orderListSlice.reducer;
