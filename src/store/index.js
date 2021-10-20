import { configureStore } from "@reduxjs/toolkit";
import paintingSlice from "./painting-slice";
import searchSlice from "./search-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    painting: paintingSlice.reducer,
    ui: uiSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
