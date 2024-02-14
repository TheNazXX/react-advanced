import { StateSchema } from "app/providers/StoreProvider";
export const getErrorState = (state: StateSchema) => state?.loginForm?.error || '';