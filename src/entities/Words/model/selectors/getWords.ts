import { type StateSchema } from "app/providers/StoreProvider";

export const getWords = (state: StateSchema) => state.words;
