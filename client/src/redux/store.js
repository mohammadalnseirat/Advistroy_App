import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

//! 1-create root reducer:
const rootReducer = combineReducers({
  user: userReducer,
});

//! 2-configure store:
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

//! 3- create persistedReducer and use it in store:
const persistedReducer = persistReducer(persistConfig, rootReducer);
//! 4- Create a store with persisted reducer:
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // to allow non-serializable actions in Redux Toolkit
    }),
});

export const persistor = persistStore(store);
