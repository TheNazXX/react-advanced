export { type RepeatWordsSchema } from "./model/types/RepeatWordsSchema";

export { fetchRepeatWords } from "./model/services/fetchRepeatWords";
export { postRepeatWords } from "./model/services/postRepeatWords";

export {
  getRepeatWords,
  getIsErrorGet,
  getIsErrorPost,
  getIsLoadingGet,
  getIsLoadingPost,
  getIsSuccessPost,
} from "./model/selectors/getRepeatWordsState/getRepeatWordsState";
