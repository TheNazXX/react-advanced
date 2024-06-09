import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "app/providers/StoreProvider";
import { type Comment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { getAddcommentFormText } from "features/AuthByUsername/ui/AddCommentForm/model/selectors/getAddcommentForm";
import { getArticleDetailsData } from "entities/Article/model/selectors/articleDetails";
import { addCommentFormActions } from "features/AuthByUsername/ui/AddCommentForm/model/slice/addCommentFormSlice";
import { articleDetailsCommentsActions } from "../slice/articleDetailsCommentsSlice";

export const postCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>("articleDetails/postCommentForArticle", async (text, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;

  const userId = getUserAuthData(getState())?.id;
  const article = getArticleDetailsData(getState());
  const user = getUserAuthData(getState());

  const articleId = article?.id;

  if (!userId || !text || !articleId) {
    console.log("User Id:", userId);
    console.log("Text", text);
    console.log("ArticleId", articleId);

    throw new Error(`Bad request. Some data undefined`);
  }

  try {
    const response = await extra.api.post("/comments", {
      articleId,
      userId,
      text,
    });

    if (!response.data) {
      throw new Error("No data found");
    }

    dispatch(addCommentFormActions.setText(""));
    console.log(response.data);
    dispatch(
      articleDetailsCommentsActions.addCommentForArticle({
        user,
        ...response.data,
      })
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Something went wrong");
  }
});
