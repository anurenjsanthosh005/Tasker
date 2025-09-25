import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: JSON.parse(localStorage.getItem("USER_DETAILS")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.login = action.payload;
      localStorage.setItem("USER_DETAILS", JSON.stringify(action.payload));
    },
    userLogout: (state) => {
      state.login = null;
      localStorage.removeItem("USER_DETAILS");
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
