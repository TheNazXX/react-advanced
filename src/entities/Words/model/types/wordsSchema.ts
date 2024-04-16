export interface Word {
  en: string
  translate: string[]
  partOfSpeech?: partOfSpeech | null
  unit?: string | null
  synonyms?: string[] | null
  sentences?: Sentence[] | null
  difficult?: boolean
}

export interface WordsSchema {
  words: Word[]
  isLoading: boolean
  error: string
}

export interface Sentence {
  en: string
  translate: string
}

export enum partOfSpeech {
  DEFAULT = '',
  VERB = 'verb',
  ADJECTIVE = 'adjective',
  NOUN = 'noun',
  ADVERB = 'adverbs',
  CONJUNCTION = 'conjunction'
}
