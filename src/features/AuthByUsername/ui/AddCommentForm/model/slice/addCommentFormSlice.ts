import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type AddCommentFormSchema } from "../types/addCommentForm";

const initialState: AddCommentFormSchema = {
  text: "",
  isLoading: false,
  error: "",
};

export const addCommentFormSlice = createSlice({
  name: "AddCommentFormSlice",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
