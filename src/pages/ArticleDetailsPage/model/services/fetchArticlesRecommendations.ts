import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { type Comment } from "entities/Comment";

export const fetchArticlesRecommendations = createAsyncThunk<
  Article[],
  undefined,
  ThunkConfig<string>
>("articleReccomendations", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article[]>("articles", {
      params: {
        _limit: 4,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
