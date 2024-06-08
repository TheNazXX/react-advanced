import { type StateSchema } from "app/providers/StoreProvider";

export const getRepeatWords = (state: StateSchema) => state?.repeatWords?.words;

export const getIsLoadingGet = (state: StateSchema) =>
  state?.repeatWords?.getIsLoading;
export const getIsLoadingPost = (state: StateSchema) =>
  state?.repeatWords?.postIsLoading;

export const getIsErrorGet = (state: StateSchema) =>
  state?.repeatWords?.getIsError;
export const getIsErrorPost = (state: StateSchema) =>
  state?.repeatWords?.postIsError;

export const getIsSuccessPost = (state: StateSchema) =>
  state?.repeatWords?.isPostedSuccess;
