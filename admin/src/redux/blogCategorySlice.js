import { createSlice } from "@reduxjs/toolkit";

// Initial state for blog categories
const initialState = {
    columns: [],
    data: [],
};

const blogCategorySlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {
    setCategories: (state, action) => {
        state.data = action.payload.data;
        state.columns = action.payload.columns;
    },
    addCategory: (state, action) => {
      const newCategory = {
        ...action.payload,
        srNo: action.payload.srNo || Date.now(),
      };
      state.data.push(newCategory);
    },
    deleteCategory: (state, action) => {
      state.data = state.data.filter(
        (category) => category.srNo !== action.payload.srNo
      );
    },
    editCategory: (state, action) => {
      const index = state.data.findIndex(
        (category) => category.srNo === action.payload.srNo
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

export const { setCategories, addCategory, deleteCategory, editCategory } =
  blogCategorySlice.actions;

export default blogCategorySlice.reducer;
