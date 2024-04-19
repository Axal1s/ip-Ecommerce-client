import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import supabase from "../../utilities/supabase";

const initialState = {
  isLoading: false,
  transactions: {},
  errorMsg: "",
};

const transactionHistorySlice = createSlice({
  name: "transactionHistory",
  initialState: initialState,
  reducers: {
    fetchPending: (state) => {
      state.isLoading = true;
      state.transactions = {};
      state.errorMsg = "";
    },
    fetchSuccess: (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload;
      state.errorMsg = "";
    },
    fetchFailed: (state, action) => {
      state.isLoading = false;
      state.transactions = {};
      state.errorMsg = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchFailed } =
  transactionHistorySlice.actions;

export const fetchTransactionHistory = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPending());

      const { data: session } = await supabase.auth.getSession();

      const email = session.session.user.email;

      const authorization = btoa(`${email}:`);

      const { data } = await axios.get(
        `https://ip-server.axalis-project.online/transaction/history`,
        {
          headers: {
            Authorization: `Basic ${authorization}`,
          },
        }
      );

      dispatch(fetchSuccess(data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default transactionHistorySlice.reducer;
