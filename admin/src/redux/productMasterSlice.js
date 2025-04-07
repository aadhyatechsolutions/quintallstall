import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const productMasterSlice = createSlice({
  name: "productMaster",
  initialState,
  reducers: {
    setProductMaster: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    addProductMaster: (state, action) => {
      const newProductMaster = {
        ...action.payload,
        srNo: action.payload.srNo || (state.data.length > 0 ? state.data[state.data.length - 1].srNo + 1 : 1), // Increment srNo or set 1 if it's the first item
      };
      state.data.push(newProductMaster);
    },
    
    deleteProductMaster: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    editProductMaster: (state, action) => {
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

export const { setProductMaster, addProductMaster, deleteProductMaster, editProductMaster } = productMasterSlice.actions;

export default productMasterSlice.reducer;
