import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotal } from "./slices/cartSlice";
import { productApi } from "./slices/productApi";
import productReducer, { fetchProducts } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

store.dispatch(fetchProducts());
store.dispatch(getTotal());
