import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const wholeSellerUserSlice = createSlice({
  name: "wholeSellerUser",
  initialState,
  reducers: {
    setWholeSellerUser: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    addWholeSellerUser: (state, action) => {
      const newWholeSellerUser = {
        ...action.payload,
        srNo: action.payload.srNo || (state.data.length > 0 ? state.data[state.data.length - 1].srNo + 1 : 1), // Increment srNo or set 1 if it's the first item
      };
      state.data.push(newWholeSellerUser);
    },
    
    deleteWholeSellerUser: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    editWholeSellerUser: (state, action) => {
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
export const selectTotalWholeSellerUsers = (state) => state.wholeSellerUser.data.length;

export const { setWholeSellerUser, addWholeSellerUser, deleteWholeSellerUser, editWholeSellerUser } = wholeSellerUserSlice.actions;

export default wholeSellerUserSlice.reducer;
