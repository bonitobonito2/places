import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogined: false,
  person: {
    name: "",
    email: "",
    id: "",
    image: "",
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login(state) {
      state.isLogined = true;
    },
    logout(state) {
      state.isLogined = false;
    },
    setPerson(state, action) {
      state.person = action.payload;
    },
    removePerson(state, action) {
      state.person = {
        name: "",
        email: "",
        id: "",
        image: "",
      };
    },
  },
});

export const authSliceMethods = authSlice.actions;

export default authSlice;
