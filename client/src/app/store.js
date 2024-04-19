import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product-slice";
import cartReducer from "../features/cart/cart-slice";
import userProfileReducer from "../features/user/user-profile-slice";
import transactionHistoryReducer from "../features/user/transaction-history-slice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    userProfile: userProfileReducer,
    transactionHistory: transactionHistoryReducer,
  },
});
