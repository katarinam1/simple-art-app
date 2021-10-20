import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paintings: [],
  currentPainting: 0,
  page: 1,
};

const paintingSlice = createSlice({
  name: "painting",
  initialState,
  reducers: {
    loadPaintings(state, action) {
      if (!state.paintings.length) {
        state.currentPainting = 0;
      } else {
        state.currentPainting = state.currentPainting ? 0 : action.payload.paintings.length - 1;
      }
      state.paintings = action.payload.paintings;
    },
    changePainting(state, action) {
      if (action.payload.type === "inc") {
        state.currentPainting++;
      } else {
        state.currentPainting--;
      }
    },
    changePage(state, action) {
      if (action.payload.type === "next") {
        state.page++;
      } else {
        state.page--;
      }
    },
  },
});

export const paintingActions = paintingSlice.actions;

export default paintingSlice;
