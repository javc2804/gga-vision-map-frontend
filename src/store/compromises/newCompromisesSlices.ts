import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PricesCompromisesState {
  nde: number;
  compromiso: string;
  quantity: string;
  price: string;
  total: string;
  description: string;
  orderNumber: string;
  date: Date | null;
  observation: string;
  compromises: Array<Compromise>; // Añade esta línea
}
interface Compromise {
  quantity: string;
  price: string;
  total: string;
  description: string;
  orderNumber: string;
  date: string;
  observation: string;
}

const initialState: PricesCompromisesState = {
  nde: 0,
  compromiso: "",
  quantity: "",
  price: "",
  total: "",
  description: "",
  orderNumber: "",
  date: null,
  observation: "",
  compromises: [], // Añade esta línea
};
export const newCompromisesSlice = createSlice({
  name: "compromises",
  initialState,
  reducers: {
    compromiseProvider: (state, { payload }) => {
      const { nde, compromiso } = payload;
      state.nde = nde;
      state.compromiso = compromiso;
    },
    setPricesCompromises: (
      state,
      {
        payload,
      }: PayloadAction<Omit<PricesCompromisesState, "nde" | "compromiso">>
    ) => {
      state.quantity = payload.quantity;
      state.price = payload.price;
      state.total = payload.total;
      state.description = payload.description;
      state.orderNumber = payload.orderNumber;
      state.date = payload.date;
      state.observation = payload.observation;
    },
    addCompromise: (state, { payload }: PayloadAction<Compromise>) => {
      // No uses push, en su lugar, devuelve un nuevo estado
      state.compromises = [...state.compromises, payload];
    },
  },
});

export const { compromiseProvider, setPricesCompromises, addCompromise } =
  newCompromisesSlice.actions;
