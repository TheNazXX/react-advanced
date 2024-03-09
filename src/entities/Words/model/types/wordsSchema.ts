export interface Word {
  en: string,
  translate: string[],
  typeWord?: TypeWord;
  unit?: string;
  synonyms?: string[],
  sentences?: string[],
  translateSentences?: string[]
  difficult?: boolean
}

export interface WordsSchema {
  words: Array<Word>
  isLoading: boolean
  error: string
}


// ------------------- //

enum TypeWord {
  VERB = 'verb',
  ADJECTIVES = 'adjectives',
  NOUN = 'noun',
  ADVERB = 'adverbs'
}
