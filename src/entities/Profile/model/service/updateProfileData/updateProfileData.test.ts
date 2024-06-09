import axios from "axios";
import { updateProfileData } from "./updateProfileData";
import { TestAsyncThunk } from "shared/libs/tests/TestAyncThunk/TestAsyncThunk";
import { formStructure } from "../../types/profile";

const data = {
  [formStructure.FIRSTNAME]: "UpdateName",
  [formStructure.LASTNAME]: "UpdateLastName",
};

jest.mock("axios");

const mockedAxios = jest.mocked(axios);

describe("updateProfileData.test", () => {
  test("success", async () => {
    const testAsyncThunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });
    testAsyncThunk.api.put.mockReturnValue(Promise.resolve({ data }));
    const result = await testAsyncThunk.callThunk("");

    expect(testAsyncThunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("with error", async () => {
    const testAsyncThunk = new TestAsyncThunk(updateProfileData);
    testAsyncThunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await testAsyncThunk.callThunk("");

    expect(result.meta.requestStatus).toBe("rejected");
  });
});
