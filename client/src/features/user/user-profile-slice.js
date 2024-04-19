import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import supabase from "../../utilities/supabase";

const initialState = {
  isLoading: false,
  userProfile: {},
  errorMsg: "",
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {
    fetchPending: (state) => {
      state.isLoading = true;
      state.userProfile = {};
      state.errorMsg = "";
    },
    fetchSuccess: (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload;
      state.errorMsg = "";
    },
    fetchFailed: (state, action) => {
      state.isLoading = false;
      state.userProfile = {};
      state.errorMsg = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchFailed } =
  userProfileSlice.actions;

export const fetchUserProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPending());

      const { data: session } = await supabase.auth.getSession();

      const email = session.session.user.email;

      const authorization = btoa(`${email}:`);

      const { data } = await axios.get(
        `https://ip-server.axalis-project.online/userProfile/`,
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

export default userProfileSlice.reducer;
