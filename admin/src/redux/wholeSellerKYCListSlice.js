import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const wholeSellerKYCListSlice = createSlice({
  name: "wholeSellerKYCList",
  initialState,
  reducers: {
    setWholeSellerKYCList: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns || state.columns;
    },
  },
});

export const { setWholeSellerKYCList, updateWholeSellerKYCStatus } = wholeSellerKYCListSlice.actions;

export default wholeSellerKYCListSlice.reducer;
