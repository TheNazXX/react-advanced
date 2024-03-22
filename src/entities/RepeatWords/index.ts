
export { type RepeatWordsSchema } from './model/types/RepeatWordsSchema'
export { getRepeatWords } from './model/selectors/getRepeatWords/getRepeatWords'

export { sendRepeatWords } from './model/services/SendRepeatWords'
export { requestRepeatWords } from './model/services/RequestRepeatWords'
export {addRepeatWordRequest} from './model/services/addRepeatWordRequest';

export { getIsErrorRepeatWords, getIsErrorSendRepeatWords } from './model/selectors/getErrorRepeatWords/getErrorRepeatWords'
export { getIsLoadingGetRepeatWords, getIsLoadingSendRepeatWords } from './model/selectors/getIsLoadingRepeatWords/getIsLoadingRepeatWords'
