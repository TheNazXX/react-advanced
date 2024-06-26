import {
  type Reducer,
  type UnknownAction,
  combineReducers,
  type ReducersMapObject,
} from "@reduxjs/toolkit";

import {
  type StateSchema,
  type StateSchemaKey,
  type ReducerManager,
} from "./StateSchema";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: StateSchemaKey[] = [];

  const mountedReducers: OptionalRecord<StateSchemaKey, boolean> = {};

  return {
    getReducerMap: () => reducers,

    getMountedReducers: () => mountedReducers,

    reduce: (state: StateSchema, action: UnknownAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(state as any, action);
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      reducers[key] = reducer;
      mountedReducers[key] = true;

      combinedReducer = combineReducers(reducers);
    },

    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      delete reducers[key];

      keysToRemove.push(key);

      mountedReducers[key] = false;

      combinedReducer = combineReducers(reducers);
    },
  };
}
