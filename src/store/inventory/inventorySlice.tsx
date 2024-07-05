import { createSlice } from "@reduxjs/toolkit";
export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    list: {},
  },
  reducers: {
    getInventory: (state, { payload }) => {
      state.list = payload;
    },
  },
});

export const { getInventory } = inventorySlice.actions;
