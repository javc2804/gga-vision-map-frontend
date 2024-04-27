// store/store.ts
import { createStore, combineReducers, Dispatch, AnyAction } from "redux";
import { authReducer } from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Dispatch<AnyAction>;

const store = createStore(rootReducer);

export default store;
