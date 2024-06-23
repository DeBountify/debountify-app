import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "./storage";
import { userReducer } from "./reducers/userReducers";
import { bountyProgramReducer } from "./reducers/bountyReducer";
import { reportReducer } from "./reducers/reportReducer";

const reducer = combineReducers({
  user: userReducer,
  bountyPrograms: bountyProgramReducer,
  reports: reportReducer
});

let initialState = {
  user: {
    loading: false,
    user: {},
    is_authenticated: false,
  },
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  initialState,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);