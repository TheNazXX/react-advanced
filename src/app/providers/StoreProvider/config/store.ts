import { type ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { type ThunkExtraArgs, type StateSchema } from "./StateSchema";
import { userReducer } from "entities/User";
import { wordsReducer } from "entities/Words";
import { createReducerManager } from "./reducerManager";
import { repeatWordsReducer } from "entities/RepeatWords/model/slice/repeatWordsSlice";
import { $api } from "shared/api/api";
import { type NavigateOptions, type To } from "react-router-dom";
import { saveScrollReducer } from "features/SaveScroll/model/slice/saveScrollSlice";

export function createReduxStore(
  initialState?: StateSchema,
  asyncRedusers?: ReducersMapObject<StateSchema>
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncRedusers,
    user: userReducer,
    words: wordsReducer,
    repeatWords: repeatWordsReducer,
    saveScroll: saveScrollReducer,
  };

  const extraArg: ThunkExtraArgs = {
    api: $api,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  });

  // @ts-expect-error
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
