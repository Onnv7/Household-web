import { createSelector } from "@reduxjs/toolkit";
import { store } from "./store";

export const cartSelector = (state: ReturnType<typeof store.getState>) =>
  state.cart;
