import { type StateSchema } from "app/providers/StoreProvider";

export const getAddcommentFormText = (state: StateSchema) => {
  return state.addCommentForm?.text ?? "";
};
