import { type Word } from "entities/Words";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "app/providers/StoreProvider";

export const postRepeatWords = createAsyncThunk<
  Word[],
  Word | Word[],
  ThunkConfig<string>
>("post/", async (data, thunkApi) => {
  try {
    const response = await axios.post(
      "http://localhost:8888/api/repeat-word",
      data
    );

    if (!response.data) {
      throw new Error("Something went wrong");
    }

    return await response.data;
  } catch (e: any) {
    const errorMessage: string =
      e?.response?.data?.message || "Failed to fetch";
    thunkApi.rejectWithValue(errorMessage);
  }
});
