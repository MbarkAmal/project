import { createSlice } from "@reduxjs/toolkit";

const checkOutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkOutShippingData: [],
  },
  reducers: {
    checkOutShippingData: (state, action) => {
      state.checkOutShippingData.push(action.payload);
    },
  },
});
export const { checkOutShippingData } = checkOutSlice.actions;

export default checkOutSlice.reducer;
