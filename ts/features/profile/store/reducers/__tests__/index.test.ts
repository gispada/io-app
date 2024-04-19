import { createStore } from "redux";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { applicationChangeState } from "../../../../../store/actions/application";
import { appReducer } from "../../../../../store/reducers";
import { profileData } from "../../actions";
import { getTimeoutError } from "../../../../../utils/errors";
import { selectProfileData } from "..";
import { GlobalState } from "../../../../../store/reducers/types";

describe("profile reducer", () => {
  it("should have an initial state", () => {
    const state = appReducer(undefined, applicationChangeState("active"));

    expect(state.profileNew).toStrictEqual({
      profileData: pot.none
    });
  });

  it("should handle profile data request action", () => {
    const state = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, state as any);

    store.dispatch(profileData.request());

    expect(store.getState().profileNew.profileData).toStrictEqual(
      pot.noneLoading
    );
  });

  it("should handle profile data success action", () => {
    const state = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, state as any);

    const payload = {
      email: "john.doe@email.com",
      name: "John",
      familyName: "Doe",
      fiscalCode: "JHNDOE11X22Z123Q"
    };

    store.dispatch(profileData.success(payload));

    expect(store.getState().profileNew.profileData).toStrictEqual(
      pot.some(payload)
    );
  });

  it("should handle profile data failure action", () => {
    const state = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, state as any);

    store.dispatch(profileData.failure(getTimeoutError()));

    expect(store.getState().profileNew.profileData).toStrictEqual(
      pot.noneError(getTimeoutError())
    );
  });
});

describe("profile selectors", () => {
  it("selectProfileData should return profile data", () => {
    const payload = {
      email: "john.doe@email.com",
      name: "John",
      familyName: "Doe",
      fiscalCode: "JHNDOE11X22Z123Q"
    };

    const targetState = appReducer(
      {} as GlobalState,
      profileData.success(payload)
    );

    expect(selectProfileData(targetState)).toStrictEqual(pot.some(payload));
  });
});
