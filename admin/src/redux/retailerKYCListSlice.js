import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const retailerKYCListSlice = createSlice({
  name: "retailerKYCList",
  initialState,
  reducers: {
    setRetailerKYCList: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns || state.columns;
    },
    updateRetailerKYCStatus: (state, action) => {
      const { srNo, status } = action.payload;
      const index = state.data.findIndex(item => item.srNo === srNo);
      if (index !== -1) {
        state.data[index].status = status;
      }
    },
  },
});

export const { setRetailerKYCList, updateRetailerKYCStatus } = retailerKYCListSlice.actions;

export default retailerKYCListSlice.reducer;
