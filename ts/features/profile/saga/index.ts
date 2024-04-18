import { SagaIterator } from "redux-saga";
import { call, takeLatest, put } from "typed-redux-saga/macro";
import { ActionType } from "typesafe-actions";
import * as E from "fp-ts/Either";
import { BackendClient } from "../../../api/backend";
import { SessionToken } from "../../../types/SessionToken";
import { profileData } from "../store/actions";
import { getNetworkError } from "../../../utils/errors";

function* handleProfileData(
  getProfile: BackendClient["getProfile"],
  action: ActionType<typeof profileData.request>
) {
  try {
    const response = yield* call(getProfile, action);

    if (E.isLeft(response)) {
      throw new Error("Something went wrong");
    }

    if (response.right.status === 200) {
      yield* put(
        profileData.success({
          email: response.right.value.email || "",
          name: response.right.value.name,
          familyName: response.right.value.family_name,
          fiscalCode: response.right.value.fiscal_code
        })
      );
    }
  } catch (error) {
    yield* put(profileData.failure(getNetworkError(error)));
  }
}

export function* watchProfileSaga(
  backendClient: BackendClient,
  _: SessionToken
): SagaIterator {
  yield* takeLatest(
    profileData.request,
    handleProfileData,
    backendClient.getProfile
  );
}
