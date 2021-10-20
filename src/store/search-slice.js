import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  artistResults: [],
  nextCall: null,
  prevCall: null,
  nextCallArtist: null,
  prevCallArtist: null,
  paintingPreview: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    loadSearchResults(state, action) {
      state.searchResults = action.payload.search || state.searchResults;
      state.artistResults = action.payload.artist || state.artistResults;
      state.nextCall = action.payload.next || state.nextCall;
      state.prevCall = action.payload.prev || state.prevCall;
      state.nextCallArtist = action.payload.nextArtist || state.nextCallArtist;
      state.prevCallArtist = action.payload.prevArtist || state.prevCallArtist;
    },
    claerSearch(state) {
      state.searchResults = [];
      state.nextCall = null;
      state.prevCall = null;
    },
    clearArtist(state) {
      state.artistResults = [];
      state.nextCallArtist = null;
      state.prevCallArtist = null;
    },
    loadPainting(state, action) {
      state.paintingPreview = action.payload.painting;
    },
    clearPainting(state) {
      state.paintingPreview = null;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice;
