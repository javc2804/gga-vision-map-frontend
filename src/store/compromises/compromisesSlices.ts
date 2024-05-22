import { createSlice } from "@reduxjs/toolkit";
export const compromisesSlice = createSlice({
  name: "compromises",
  initialState: {
    compromise: {},
  },
  reducers: {
    getCompromise: (state, { payload }) => {
      state.compromise = payload;
    },
    ClearCompromise: (state) => {
      state.compromise = {};
    },
  },
});

export const { getCompromise, ClearCompromise } = compromisesSlice.actions;
