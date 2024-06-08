import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "app/providers/StoreProvider";
import { type Comment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { getAddcommentFormText } from "features/AuthByUsername/ui/AddCommentForm/model/selectors/getAddcommentForm";
import { getArticleDetailsData } from "entities/Article/model/selectors/articleDetails";
import { addCommentFormActions } from "features/AuthByUsername/ui/AddCommentForm/model/slice/addCommentFormSlice";

export const addCommentForArticle = createAsyncThunk<
  Comment,
  undefined,
  ThunkConfig<string>
>("ArticleDetails/addCommentForArticle", async (_, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;

  const userId = getUserAuthData(getState())?.id;
  const text = getAddcommentFormText(getState());
  const article = getArticleDetailsData(getState());

  const articleId = article?.id;

  console.log(article);

  if (!userId || !text || !articleId) {
    console.log("User Id:", userId);
    console.log("Text", text);
    console.log("ArticleId", articleId);

    throw new Error(`Bad request. Some data undefined`);
  }

  try {
    const response = await extra.api.post<Comment>("/comments", {
      articleId: articleId,
      userId: userId,
      text: text,
    });

    if (response.data) {
      throw new Error("No data found");
    }

    dispatch(addCommentFormActions.setText(""));

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Something went wrong");
  }
});
