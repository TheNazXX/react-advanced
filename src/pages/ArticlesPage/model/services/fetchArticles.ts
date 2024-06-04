import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "app/providers/StoreProvider";
import { type Article } from "entities/Article";

export const fetchArticles = createAsyncThunk<
  Article[],
  undefined,
  ThunkConfig<string>
>("articles", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article[]>("articles");

    if (!response.data) {
      throw new Error("No data");
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Something went wrong");
    }
  }
});
