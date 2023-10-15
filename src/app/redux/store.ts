'use client';
import { configureStore } from "@reduxjs/toolkit";
import { shipmentsSlice } from "./slices/shipmentsSlice";
import sidebarSlice from "./slices/sidebarSlice";

export const store = configureStore({
    reducer: {
        shipments: shipmentsSlice.reducer,
        sidebar: sidebarSlice.reducer
    }
}); 

export type TypeRootState = ReturnType<typeof store.getState>