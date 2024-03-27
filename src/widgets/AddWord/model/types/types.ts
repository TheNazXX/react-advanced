import { Rules, RulesProps } from 'shared/libs/validation/validation'

export interface ResponseAddWord {
  statusCode: number
  message: string
}

export interface RequiredFieldsAddWordErrors {
  enWordValue: string[]
  transtaltionWordValue: string[]
};
