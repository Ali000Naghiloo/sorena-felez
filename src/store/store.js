// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import categories from "./reducers/category";

export function makeStore() {
  return configureStore({
    reducer: {
      categories,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();
