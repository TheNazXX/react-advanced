import { useEffect, type FC, type ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { type StateSchema } from "../config/StateSchema";
import { type ReducersMapObject } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider: FC<StoreProviderProps> = ({
  children,
  initialState,
  asyncReducers,
}) => {
  const navigate = useNavigate();

  const storeRef = useRef(
    createReduxStore(
      initialState as StateSchema,
      asyncReducers as ReducersMapObject<StateSchema>,
      navigate
    )
  );

  return <Provider store={storeRef.current}>{children}</Provider>;
};
