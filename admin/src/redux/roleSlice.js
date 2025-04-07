import { createSlice } from "@reduxjs/toolkit";

// Initial state for roles
const initialState = {
  columns: [
    { field: "srNo", headerName: "SR No." },
    { field: "name", headerName: "Name" },
    { field: "slug", headerName: "Slug" },
    { field: "description", headerName: "Description" },
    { field: "action", headerName: "Action" }
  ],
  data: [],
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    addRole: (state, action) => {
      let srno = action.payload.srNo || Date.now();
      const newRole = {
        ...action.payload,
        srNo: srno,
        editUrl: "/settings/roles/edit/" + srno,
        action: ["Edit", "Delete"],
      };
      state.data.push(newRole);
    },
    deleteRole: (state, action) => {
      state.data = state.data.filter(
        (role) => role.srNo !== action.payload.srNo
      );
    },
    editRole: (state, action) => {
      const index = state.data.findIndex(
        (role) => role.srNo === action.payload.srNo
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
    updateRoleStatus: (state, action) => {
      const { srNo, status } = action.payload;
      const index = state.data.findIndex(item => item.srNo === srNo);
      if (index !== -1) {
        state.data[index].status = status;
      }
    }
  },
});

export const { setRoles, addRole, deleteRole, editRole, updateRoleStatus } = roleSlice.actions;

export default roleSlice.reducer;
