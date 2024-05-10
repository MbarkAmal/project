import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    userID: null
  },
  reducers: {
    addProduct: (state, action) => {
      const { productId, productName, price, quantity , photo } = action.payload;
      
      // Calculate the total price of the product
      const totalPrice = price * quantity;
    
      // Update the total price in the Redux state
      state.total += totalPrice;
    
      const existingProductIndex = state.products.findIndex(product => product.productId === productId);
    
      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        state.products[existingProductIndex].quantity += quantity;
        state.products[existingProductIndex].totalPrice += totalPrice;
      } else {
        // If the product is not in the cart, add it
        state.products.push({ productId, productName, price, quantity, totalPrice , photo});
      }
    
      state.quantity += quantity;
    },
    setUser: (state, action) => {
      state.userID = action.payload;
    },
    clearUser: (state) => {
      state.userID = null;
    },
   
  }
});

export const { addProduct, setUser, clearUser } = cartSlice.actions;

export default cartSlice.reducer;
