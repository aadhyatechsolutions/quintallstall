import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Existing fetchAmpcData thunk
export const fetchAmpcData = createAsyncThunk(
  "ampc/fetchAmpcData",
  async () => {
    try {
      const response = await axiosInstance.get("/apmc");
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Failed to fetch AMPC data");
    }
  }
);

// New addAmpcData thunk for adding a new AMPC entry
export const addAmpcData = createAsyncThunk(
  "ampc/addAmpcData",
  async (newAmpcData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/apmc", newAmpcData,{
        headers: {
          "Content-Type": "multipart/form-data",  // Axios will automatically detect this when using FormData
        },
      });
      const data = response.data;
      return data; // Return the newly added AMPC entry data
    } catch (error) {
      return rejectWithValue("Failed to add AMPC entry");
    }
  }
);

const initialState = {
  data: [],
  columns: [
    { "field": "id", "headerName": "SR No." },
    { "field": "name", "headerName": "Name" },
    { "field": "location", "headerName": "Location" },
    { "field": "area", "headerName": "Area" }
  ],
  loading: false,
  error: null,
};

const ampcSlice = createSlice({
  name: "ampc",
  initialState,
  reducers: {
    // Set columns and data
    setAmpc: (state, action) => {
      state.columns = action.payload.columns || [];
      state.data = action.payload.data || [];
    },
    // Set loading state
    setLoading: (state) => {
      state.loading = true;
    },
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false; // Stop loading on error
    },
    // Delete AMPC entry
    deleteAmpc: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    // Edit an AMPC entry
    editAmpc: (state, action) => {
      const index = state.data.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
    // Add a new AMPC entry
    addAmpc: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmpcData.pending, (state) => {
        console.log('test1');
        state.loading = true;
      })
      .addCase(fetchAmpcData.fulfilled, (state, action) => {
        console.log('test12');
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAmpcData.rejected, (state, action) => {
        console.log('test123');
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAmpcData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAmpcData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAmpcData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add AMPC entry";
      });
  },
});

export const { setAmpc, setLoading, setError, deleteAmpc, editAmpc, addAmpc } = ampcSlice.actions;
export default ampcSlice.reducer;
