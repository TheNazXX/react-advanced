import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "app/providers/StoreProvider";
import { type Article } from "entities/Article";
import { getArticlesFetchLimit } from "../selectors/getArticlesData";

interface FetchArticlesListProps {
  page: number;
}

export const fetchArticles = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>("articles", async (props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const { page = 1 } = props;
  const limit = getArticlesFetchLimit(getState());
  try {
    const response = await extra.api.get<Article[]>("articles", {
      params: {
        _expand: "user",
        _limit: limit,
        _page: page,
      },
    });

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
