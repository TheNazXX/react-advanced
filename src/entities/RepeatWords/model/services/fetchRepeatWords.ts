import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { repeatWordsActions } from "../slice/repeatWordsSlice";
import { type Word } from "entities/Words";

export const fetchRepeatWords = createAsyncThunk(
  "getRepeatWords",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:8888/api/repeat-words"
      );

      if (!response.data) {
        throw new Error("Something went wrong");
      }

      return response.data.words;
    } catch (e: any) {
      console.log(e);
      const errorText =
        e.response?.data?.message || "Could not to load repeatWords";
      return thunkAPI.rejectWithValue(errorText);
    }
  }
);
