import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import checkouReducer from "./CheckOutRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReduce = combineReducers({
  user: userReducer,
  cart: cartReducer,
  checkout: checkouReducer,
});
const rootReducer = {
  cart: cartReducer,
  user: persistReducer(persistConfig, userReducer),
  checkout: checkouReducer,
};

const persistedReducer = persistReducer(persistConfig, rootReduce);
export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
