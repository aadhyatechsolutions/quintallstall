import { createSlice } from "@reduxjs/toolkit";

// Initial state for coin types
const initialState = {
  columns: [],
  data: [],
};

const coinTypeSlice = createSlice({
  name: "coinType",
  initialState,
  reducers: {
    setCoinTypes: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    addCoinType: (state, action) => {
    let srno = action.payload.srNo || Date.now();
      const newCoinType = {
        ...action.payload,
        srNo: srno,
        editUrl:"/settings/coin-type/edit/"+srno,
        action:['edit,delete']
      };
      state.data.push(newCoinType);
    },
    deleteCoinType: (state, action) => {
      state.data = state.data.filter(
        (coinType) => coinType.srNo !== action.payload.srNo
      );
    },
    editCoinType: (state, action) => {
      const index = state.data.findIndex(
        (coinType) => coinType.srNo === action.payload.srNo
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { setCoinTypes, addCoinType, deleteCoinType, editCoinType } =
  coinTypeSlice.actions;

export default coinTypeSlice.reducer;
