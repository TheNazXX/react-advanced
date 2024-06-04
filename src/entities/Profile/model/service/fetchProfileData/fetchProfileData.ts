import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "app/providers/StoreProvider";
import { type ProfileInterface } from "entities/Profile";

export const fetchProfileData = createAsyncThunk<
  ProfileInterface,
  string,
  ThunkConfig<string>
>("profile/fetchProfileData", async (profileId, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.get<ProfileInterface>(
      `/profile/${profileId}`
    );

    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("Could not to fetch");
  }
});
