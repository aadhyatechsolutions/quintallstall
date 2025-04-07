import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [
    { field: "srNo", headerName: "SR No." },
    { field: "name", headerName: "Name" },
    { field: "loadingCapacity", headerName: "Loading Capacity" },
    { field: "action", headerName: "Action" }
  ],
  data: []
};

const vehicleMasterSlice = createSlice({
  name: "vehicleMaster",
  initialState,
  reducers: {
    setVehicleMasterList: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns || state.columns;
    },
    addVehicleMaster: (state, action) => {
      const newVehicleMaster = {
        ...action.payload,
        action: ["Edit", "Delete"],
        srNo: action.payload.srNo || (state.data.length > 0 ? state.data[state.data.length - 1].srNo + 1 : 1),
      };
      state.data.push(newVehicleMaster);
    },
    deleteVehicleMaster: (state, action) => {
      state.data = state.data.filter((vehicle) => vehicle.srNo !== action.payload.srNo);
    },
    editVehicleMaster: (state, action) => {
      const index = state.data.findIndex((item) => item.srNo === action.payload.srNo);
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
    updateVehicleMasterStatus: (state, action) => {
      const { srNo, status } = action.payload;
      const index = state.data.findIndex((item) => item.srNo === srNo);
      if (index !== -1) {
        state.data[index].status = status;
      }
    }
  }
});

export const {
  setVehicleMasterList,
  addVehicleMaster,
  deleteVehicleMaster,
  editVehicleMaster,
  updateVehicleMasterStatus
} = vehicleMasterSlice.actions;

export default vehicleMasterSlice.reducer;
