import { type Word } from "entities/Words";

export interface RepeatWordsSchema {
  words: Word[];

  isPostedSuccess: boolean;

  getIsLoading: boolean;
  getIsError: string;

  postIsLoading: boolean;
  postIsError: string;
}

export interface addRepeatWordResponse {
  message: string;
}
