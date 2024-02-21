export interface Word {
  en: string
  ua: string[]
}

export interface WordsSchema {
  words: Array<Word>
  isLoading: boolean
  error: string
}
