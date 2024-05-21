export { type RepeatWordsSchema } from "./model/types/RepeatWordsSchema";
export { getRepeatWords } from "./model/selectors/getRepeatWords/getRepeatWords";

export { fetchRepeatWords } from "./model/services/fetchRepeatWords";
export { addRepeatWordRequest } from "./model/services/AddRepeatWordRequest";
export { sendRepeatWords } from "./model/services/SendRepeatWords";

export {
  getIsErrorRepeatWords,
  getIsErrorSendRepeatWords,
} from "./model/selectors/getErrorRepeatWords/getErrorRepeatWords";
export {
  getIsLoadingGetRepeatWords,
  getIsLoadingSendRepeatWords,
} from "./model/selectors/getIsLoadingRepeatWords/getIsLoadingRepeatWords";
