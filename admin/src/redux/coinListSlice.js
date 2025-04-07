import { createSlice } from "@reduxjs/toolkit";

// Initial state for coin list
const initialState = {
  columns: [],
  data: [],
};

const coinListSlice = createSlice({
  name: "coinList",
  initialState,
  reducers: {
    setCoinList: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    updateCoinStatus:(state, action) => {
      const { srNo, status } = action.payload;
      const index = state.data.findIndex(item => item.srNo === srNo);
      if (index !== -1) {
        state.data[index].status = status;
      }
    },
    addCoinListItem: (state, action) => {
      let srno = action.payload.srNo || Date.now();
      const newCoinListItem = {
        ...action.payload,
        srNo: srno,
        editUrl: "/settings/coin-list/edit/" + srno,
        action: ["Edit", "Delete"],
      };
      state.data.push(newCoinListItem);
    },
    deleteCoinListItem: (state, action) => {
      state.data = state.data.filter(
        (coinItem) => coinItem.srNo !== action.payload.srNo
      );
    },
    editCoinListItem: (state, action) => {
      const index = state.data.findIndex(
        (coinItem) => coinItem.srNo === action.payload.srNo
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

export const { setCoinList, addCoinListItem, deleteCoinListItem, editCoinListItem, updateCoinStatus } =
  coinListSlice.actions;

export default coinListSlice.reducer;
