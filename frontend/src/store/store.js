import { configureStore } from "@reduxjs/toolkit";
import productReducer, { fetchProducts } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

store.dispatch(fetchProducts());
