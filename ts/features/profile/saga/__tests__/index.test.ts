import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import * as matchers from "redux-saga-test-plan/matchers";
import * as E from "fp-ts/Either";
import { handleProfileData } from "../index";
import { BackendClient } from "../../../../api/__mocks__/backend";
import { profileData } from "../../store/actions";
import { getNetworkError } from "../../../../utils/errors";

describe("profile saga", () => {
  it("should handle successful fetching of the user profile", () => {
    const profile = {
      email: "john.doe@email.com",
      name: "John",
      family_name: "Doe",
      fiscal_code: "JHNDOE11X22Z123Q"
    };

    return expectSaga(
      handleProfileData,
      BackendClient.getProfile,
      profileData.request()
    )
      .provide([
        [
          matchers.call.fn(BackendClient.getProfile),
          E.right({ status: 200, value: profile })
        ]
      ])
      .put(
        profileData.success({
          email: "john.doe@email.com",
          name: "John",
          familyName: "Doe",
          fiscalCode: "JHNDOE11X22Z123Q"
        })
      )
      .dispatch(profileData.request())
      .run();
  });

  it("should handle errors when fetching the user profile", () => {
    const error = new Error("Boom");

    return expectSaga(
      handleProfileData,
      BackendClient.getProfile,
      profileData.request()
    )
      .provide([
        [matchers.call.fn(BackendClient.getProfile), throwError(error)]
      ])
      .put(profileData.failure(getNetworkError(error)))
      .dispatch(profileData.request())
      .run();
  });
});
