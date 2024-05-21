import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type User, type UserSchema } from "../types/userSchema";
import { USER_LOCAL_KEY } from "shared/const/localStorage";

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },

    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCAL_KEY);

      if (user) {
        state.authData = JSON.parse(user);
      }

      state._inited = true;
    },

    onLogout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCAL_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
