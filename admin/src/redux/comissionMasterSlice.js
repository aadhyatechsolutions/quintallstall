import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: []
};

const comissionMasterSlice = createSlice({
  name: "commissionMaster",
  initialState,
  reducers: {
    setComissionMasterList: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns || state.columns;
    },
    addComissionMaster: (state, action) => {
      const newDeliveryMaster = {
        ...action.payload,
        action: ["Edit", "Delete"],
        srNo: action.payload.srNo || (state.data.length > 0 ? state.data[state.data.length - 1].srNo + 1 : 1),
      };
      state.data.push(newDeliveryMaster);
    },
    deleteComissionMaster: (state, action) => {
      state.data = state.data.filter((rate) => rate.srNo !== action.payload.srNo);
    },
    editComissionMaster: (state, action) => {
      const index = state.data.findIndex((item) => item.srNo === action.payload.srNo);
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
    updateComissionMasterStatus: (state, action) => {
      const { srNo, status } = action.payload;
      const index = state.data.findIndex((item) => item.srNo === srNo);
      if (index !== -1) {
        state.data[index].status = status;
      }
    }
  }
});

export const { setComissionMasterList, addComissionMaster, deleteComissionMaster, editComissionMaster, updateComissionMasterStatus } = comissionMasterSlice.actions;

export default comissionMasterSlice.reducer;
