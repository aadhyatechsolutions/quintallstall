import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const specialOfferSlice = createSlice({
  name: "specialOffer",
  initialState,
  reducers: {
    setSpecialOffers: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    addSpecialOffer: (state, action) => {
      const newSpecialOffer = {
        ...action.payload,
        srNo: action.payload.srNo || (state.data.length > 0 ? state.data[state.data.length - 1].srNo + 1 : 1), // Increment srNo or set 1 if it's the first item
      };
      state.data.push(newSpecialOffer);
    },
    deleteSpecialOffer: (state, action) => {
      state.data = state.data.filter((item) => item.srNo !== action.payload.srNo); // Using srNo as unique identifier
    },
    editSpecialOffer: (state, action) => {
      const index = state.data.findIndex((item) => item.srNo === action.payload.srNo);
      
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index], 
          ...action.payload,     
        };
      }
    },
  },
});

export const { setSpecialOffers, addSpecialOffer, deleteSpecialOffer, editSpecialOffer } = specialOfferSlice.actions;

export default specialOfferSlice.reducer;
