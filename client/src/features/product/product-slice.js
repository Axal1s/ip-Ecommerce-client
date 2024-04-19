import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
  errorMsg: "",
};

const productsSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    fetchPending: (state) => {
      state.products = [];
      state.isLoading = true;
      state.errorMsg = "";
    },
    fetchSuccess: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    fetchFailed: (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchFailed } =
  productsSlice.actions;

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPending());

      const { data } = await axios.get(
        "https://ip-server.axalis-project.online/products"
      );

      dispatch(fetchSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchFailed(error));
    }
  };
};

export default productsSlice.reducer;
