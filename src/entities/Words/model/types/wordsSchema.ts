export interface Word {
  en: string
  ua: string[]
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

}

interface newWord {
  typeEn: TypeWord,
  en: string,
  ua: string[],
  adjectives: Word[],
  nouns: Word[],
  expressions: string[],
  difficult: boolean
}
