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
  ADVERB = 'adverbs'
}

interface newWord {
  typeEn: TypeWord,
  en: string,
  translate: string[],
  adjectives?: Word[],
  nouns?: Word[],
  sentences?: string[],
  difficult?: boolean
}
