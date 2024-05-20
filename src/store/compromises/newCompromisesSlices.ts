import { createSlice } from "@reduxjs/toolkit";
export const newCompromisesSlice = createSlice({
  name: "compromises",
  initialState: {
    nde: 0,
    compromiso: "",
    // provider: "",
  },
  reducers: {
    compromiseProvider: (state, { payload }) => {
      const { nde, compromiso } = payload;
      state.nde = nde;
      state.compromiso = compromiso;
    },
  },
});

// Action creators are generated for each case reducer function
export const { compromiseProvider } = newCompromisesSlice.actions;
