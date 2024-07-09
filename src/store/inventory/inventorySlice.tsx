import { createSlice } from "@reduxjs/toolkit";
export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    list: {},
    totalDescription: 0,
  },
  reducers: {
    getInventory: (state, { payload }) => {
      state.list = payload;
    },
    getInventoryByDescription: (state, { payload }) => {
      state.totalDescription = payload;
    },
  },
});

export const { getInventory, getInventoryByDescription } =
  inventorySlice.actions;
