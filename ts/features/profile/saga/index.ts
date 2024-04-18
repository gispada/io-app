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
    const profile = yield* call(getProfile, action);

    if (E.isLeft(profile)) {
      throw new Error("Something went wrong");
    }

    yield* put(profileData.success(profile.right.value)); // TODO: fix type
  } catch (error) {
    yield* put(profileData.failure(getNetworkError(error)));
  }
}

export function* watchProfileSaga(
  backendClient: BackendClient,
  bearerToken: SessionToken
): SagaIterator {
  yield* takeLatest(
    profileData.request,
    handleProfileData,
    backendClient.getProfile
  );
}
