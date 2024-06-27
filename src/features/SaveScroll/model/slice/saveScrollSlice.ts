import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type SaveScrollSchema } from "../types/SaveScroll";

const initialState: SaveScrollSchema = {
  scroll: {},
};

export const saveScrollSlice = createSlice({
  name: "saveScrollSlice",
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      action: PayloadAction<{ path: string; position: number }>
    ) => {
      state.scroll[action.payload.path] = action.payload.position;
    },
  },
  extraReducers: (builder) => {},
});

export const { actions: saveScrollActions } = saveScrollSlice;
export const { reducer: saveScrollReducer } = saveScrollSlice;
