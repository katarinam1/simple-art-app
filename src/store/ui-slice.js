import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSearch: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state, action) {
      state.showSearch = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
