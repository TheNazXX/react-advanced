import { type Word } from "entities/Words";

export interface RepeatWordsSchema {
  words: Word[];

  getIsLoading: boolean;
  getIsError: string;

  sendIsLoading: boolean;
  sendIsError: string;
}

export interface addRepeatWordResponse {
  message: string;
}
