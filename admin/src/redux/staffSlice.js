import { createSlice } from "@reduxjs/toolkit";

// Initial state for staff
const initialState = {
  columns: [
    { field: "srNo", headerName: "SR No." },
    { field: "name", headerName: "Name" },
    { field: "contactNumber", headerName: "Contact Number" },
    { field: "email", headerName: "Email" },
    { field: "profileImage", headerName: "Profile Image" },
    { field: "status", headerName: "Status" },
    { field: "action", headerName: "Action" }
  ],
  data: [],
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    addStaff: (state, action) => {
      let srno = action.payload.srNo || Date.now();
      const newStaff = {
        ...action.payload,
        srNo: srno,
        editUrl: "/settings/staff/edit/" + srno,
        action: ["Edit", "Delete"],
      };
      state.data.push(newStaff);
    },
    deleteStaff: (state, action) => {
      state.data = state.data.filter(
        (staff) => staff.srNo !== action.payload.srNo
      );
    },
    editStaff: (state, action) => {
      const index = state.data.findIndex(
        (staff) => staff.srNo === action.payload.srNo
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
    updateStaffStatus: (state, action) => {
      const { srNo, status } = action.payload;
      const index = state.data.findIndex(item => item.srNo === srNo);
      if (index !== -1) {
        state.data[index].status = status;
      }
    }
  },
});

export const { setStaff, addStaff, deleteStaff, editStaff, updateStaffStatus } = staffSlice.actions;

export default staffSlice.reducer;
