import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exitItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (exitItem >= 0) {
        state.cartItems[exitItem].cartQuantity += 1;
        toast.info(`${state.cartItems[exitItem].name} quantity increased`);
      } else {
        const plusCart = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(plusCart);
        toast.success(`${action.payload.name} added`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} removed`);
    },

    // decreaseQty: (state, action) => {
    //   const itemIndex = state.cartItems.findIndex(
    //     (cartItem) => cartItem.id === action.payload.id
    //   );
    //   if (state.cartItems[itemIndex].cartTotalQuantity > 1) {
    //     state.cartItems[itemIndex].cartTotalQuantity -= 1;
    //   } else if (state.cartItems[itemIndex].cartTotalQuantity === 1) {
    //     state.cartItems = state.cartItems.filter(
    //       (item) => item.id !== action.payload.id
    //     );
    //     toast.error(`${action.payload.name} removed`);
    //   }
    //   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    // },

    decreaseQty: (state, action) => {
      const { id, name } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        if (state.cartItems[itemIndex].cartQuantity === 0) {
          state.cartItems.splice(itemIndex, 1);
          toast.error(`${name} removed`);
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    increaseQty: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].cartQuantity > 0
          ? state.cartItems[itemIndex].cartQuantity++
          : (state.cartItems = state.cartItems.filter(
              (item) => item.id !== action.payload.id
            ));

        if (state.cartItems[itemIndex].cartQuantity === 0) {
          toast.error(`${action.payload.name} removed`);
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      toast.error("Cart was removed");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const totalPrice = price * cartQuantity;

          cartTotal.total += totalPrice;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
  },
});

export const {
  addToCart,
  removeCart,
  decreaseQty,
  increaseQty,
  clearCart,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
