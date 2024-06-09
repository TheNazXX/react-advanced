import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "app/providers/StoreProvider";
import {
  getProfileFormData,
  type ProfileInterface,
  type ProfileUpdateResponseInterface,
} from "entities/Profile";

export const updateProfileData = createAsyncThunk<
  ProfileUpdateResponseInterface,
  string,
  ThunkConfig<string>
>(
  "profile/updateProfileData",
  async (profileId, { extra, rejectWithValue, getState }) => {
    const formData = getProfileFormData(getState());

    try {
      const response = await extra.api.put<ProfileUpdateResponseInterface>(
        "/profile" + profileId,
        formData
      );

      if (!response.data) {
        throw new Error("Something went wrong");
      }

      return response.data;
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message || "Failed to update profile";
      return rejectWithValue(errorMessage);
    }
  }
);
