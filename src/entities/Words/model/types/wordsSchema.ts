export interface Word {
  en: string;
  ua: string[];
}


export interface WordsSchema {
  words: Word[];
  isLoading: boolean;
  error: string;
}