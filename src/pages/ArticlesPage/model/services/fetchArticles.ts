import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "app/providers/StoreProvider";
import { type Article } from "entities/Article";
import {
  getArticlesFetchLimit,
  getArticlesOrderValue,
  getArticlesPageNum,
  getArticlesSearchValue,
  getArticlesSortValue,
  getArticlesType,
} from "../selectors/getArticlesData";
import { addQueryParams } from "shared/libs/url/addQueryParams/addQueryParams";
import { ArticleType } from "entities/Article/model/types/article";

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticles = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>("articles", async (props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const page = getArticlesPageNum(getState());
  const limit = getArticlesFetchLimit(getState());
  const sort = getArticlesSortValue(getState());
  const order = getArticlesOrderValue(getState());
  const search = getArticlesSearchValue(getState());
  const type = getArticlesType(getState());

  try {
    addQueryParams({
      sort,
      order,
      type,
      search,
    });

    const response = await extra.api.get<Article[]>("articles", {
      params: {
        _expand: "user",
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
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
