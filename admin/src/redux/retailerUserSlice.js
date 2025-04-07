import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const retailerUserSlice = createSlice({
  name: "retailerUser",
  initialState,
  reducers: {
    setRetailerUser: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    addRetailerUser: (state, action) => {
      const newRetailerUser = {
        ...action.payload,
        srNo: action.payload.srNo || (state.data.length > 0 ? state.data[state.data.length - 1].srNo + 1 : 1), // Increment srNo or set 1 if it's the first item
      };
      state.data.push(newRetailerUser);
    },

    deleteRetailerUser: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    editRetailerUser: (state, action) => {
      const index = state.data.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
  },
});
export const selectTotalRetailerUsers = (state) => state.retailerUser.data.length;
export const { setRetailerUser, addRetailerUser, deleteRetailerUser, editRetailerUser } = retailerUserSlice.actions;

export default retailerUserSlice.reducer;
