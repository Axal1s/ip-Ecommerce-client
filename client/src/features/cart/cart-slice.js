import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import supabase from "../../utilities/supabase";

const initialState = {
  isLoading: false,
  cart: [],
  errorMsg: "",
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    fetchPending: (state) => {
      state.isLoading = true;
      state.cart = {};
      state.errorMsg = "";
    },
    fetchSuccess: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.errorMsg = "";
    },
    fetchFailed: (state, action) => {
      state.isLoading = false;
      state.cart = {};
      state.errorMsg = action.payload;
    },
    countTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchFailed, countTotalPrice } =
  cartSlice.actions;

export const fetchCart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPending());

      const { data: session } = await supabase.auth.getSession();

      const email = session.session.user.email;

      const authorization = btoa(`${email}:`);

      const { data } = await axios.get(
        `https://ip-server.axalis-project.online/cart/`,
        {
          headers: {
            Authorization: `Basic ${authorization}`,
          },
        }
      );

      let totalPrice = 0;

      data.data.forEach((el) => {
        totalPrice += el.price;
      });

      dispatch(countTotalPrice(totalPrice));
      dispatch(fetchSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchFailed(error));
    }
  };
};

export default cartSlice.reducer;
