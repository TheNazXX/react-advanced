import { type ProfileSchema, formStructure } from "../types/profile";
import {
  initialFormRequiredFields,
  profileActions,
  profileReducer,
} from "./ProfileSlice";

import { updateProfileData } from "../service/updateProfileData/updateProfileData";

const data = {
  [formStructure.ID]: "1",
  [formStructure.FIRSTNAME]: "Nazar",
  [formStructure.LASTNAME]: "Shevchuk",
  [formStructure.ROLE]: "admin",
};

describe("ProfileSlice", () => {
  test("test set data", () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
    ).toEqual({
      readonly: true,
    });
  });

  test("cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
      formValidationErrors: initialFormRequiredFields,
      form: {},
      data,
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({
      data,
      readonly: true,
      formValidationErrors: initialFormRequiredFields,
      form: data,
    });
  });

  test("update profile", () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: data,
    };

    const updateData = {
      [formStructure.ID]: "2",
      [formStructure.FIRSTNAME]: "UpdateName",
      [formStructure.LASTNAME]: "UpdateLastName",
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile(updateData)
      )
    ).toEqual({
      data,
      form: {
        ...data,
        ...updateData,
      },
    });
  });

  test("test update profile service thunk pending", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoadingUpdateProfile: false,
      updateError: "",
      successUpdate: undefined,
    };

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending as any)
    ).toEqual({
      isLoadingUpdateProfile: true,
      updateError: "",
      successUpdate: undefined,
    });
  });

  test("test update profile service thunk fulfield", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoadingUpdateProfile: true,
      successUpdate: undefined,
      updateError: undefined,
    };

    const responseMessage = "success";

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled({ message: responseMessage }, "", "")
      )
    ).toEqual({
      isLoadingUpdateProfile: false,
      updateError: "",
      successUpdate: responseMessage,
    });
  });
});
