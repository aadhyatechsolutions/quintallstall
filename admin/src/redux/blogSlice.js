import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    addBlog: (state, action) => {
      const newBlog = {
        ...action.payload,
        srNo: action.payload.srNo || (state.data.length > 0 ? state.data[state.data.length - 1].srNo + 1 : 1), // Increment srNo or set 1 if it's the first item
      };
      state.data.push(newBlog);
    },
    deleteBlog: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    editBlog: (state, action) => {
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

export const { setBlogs, addBlog, deleteBlog, editBlog } = blogSlice.actions;

export default blogSlice.reducer;
