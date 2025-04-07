import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: []
};

const deliverUserSlice = createSlice({
  name: "deliverUser",
  initialState,
  reducers: {
    setDeliveryUserList: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns || state.columns;
    },
    addDeliveryUser: (state, action) => {
      const newDeliveryUser = {
        ...action.payload,
        status:"unblock",
        action: ["Edit", "Delete"],
        srNo: action.payload.srNo || (state.data.length > 0 ? state.data[state.data.length - 1].srNo + 1 : 1), // Increment srNo or set 1 if it's the first item
      };
      state.data.push(newDeliveryUser);
    },
    deleteDeliveryUser: (state, action) => {
        state.data = state.data.filter((user) => user.srNo !== action.payload.srNo);
    },
    
    editDeliveryUser: (state, action) => {
      const index = state.data.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index], 
          ...action.payload,     
        };
      }
    },
    updateDeliveryUserStatus: (state, action) => {
        const { srNo, status } = action.payload;
        const index = state.data.findIndex((item) => item.srNo === srNo);
        if (index !== -1) {
          state.data[index].status = status; 
        }
    }
  }
});

export const selectTotalDeliveryUsers = (state) => state.deliverUser.data.length;
export const { setDeliveryUserList, addDeliveryUser, deleteDeliveryUser, editDeliveryUser, updateDeliveryUserStatus } = deliverUserSlice.actions;

export default deliverUserSlice.reducer;
