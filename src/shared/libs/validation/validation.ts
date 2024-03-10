export enum Rules {
  STRING = 'string',
  MIN = 'min',
  MAX = 'max',
  REQUIRED = 'required',
  IS_EN = 'is_en',
  IS_UA = 'is_ua',
}

export interface RulesProps {
  [Rules.REQUIRED]?: boolean
  [Rules.STRING]?: boolean
  [Rules.MIN]?: number
  [Rules.MAX]?: number
  [Rules.IS_EN]?: boolean
  [Rules.IS_UA]?: boolean
}

export type ErrorsProps = Record<string, string>

const WordRules = {
  [Rules.REQUIRED]: true,
  [Rules.STRING]: true,
  [Rules.MIN]: 3,
  [Rules.MAX]: 50
}

export const EnWordRules = {
  ...WordRules,
  [Rules.IS_EN]: true
}

export const UaWordRules = {
  ...WordRules,
  [Rules.IS_UA]: true
}

const Errors: ErrorsProps = {
  [Rules.REQUIRED]: 'Field is required!',
  [Rules.STRING]: 'Field is wrong!',
  [Rules.MAX]: 'Field is too long!',
  [Rules.MIN]: 'Field is too short!',
  [Rules.IS_EN]: 'Non english field!',
  [Rules.IS_UA]: 'Non ua field!'
} as const

export function validation (value: string, rules: RulesProps): string[] {
  const errors: string[] = []

  Object.entries(rules).forEach(([rule, ruleValue]) => {
    !match(value, rule, ruleValue) && errors.push(Errors[rule])
  })

  return errors
}

function match (value: string, rule: string, ruleValue: string | number): boolean {
  switch (rule) {
    case Rules.REQUIRED: {
      return value.length !== 0
    }
    case Rules.STRING: {
      return !/\d/.test(value)
    }
    case Rules.MIN: {
      if (typeof ruleValue === 'number') {
        return value.length >= ruleValue
      }

      return false
    }
    case Rules.MAX: {
      if (typeof ruleValue === 'number') {
        return value.length < ruleValue
      }

      return false
    }
    case Rules.IS_EN: {
      return /^[a-zA-Z.,\s]+$/.test(value)
    }
    case Rules.IS_UA: {
      return /^[.,\u0400-\u04FF\s'-]+$/u.test(value)
    }
    default: return false
  }
}
