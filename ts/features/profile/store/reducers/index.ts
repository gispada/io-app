import * as pot from "@pagopa/ts-commons/lib/pot";
import { getType } from "typesafe-actions";
import { identity } from "fp-ts/lib/function";
import { createSelector } from "reselect";
import { NetworkError } from "../../../../utils/errors";
import { profileData } from "../actions";
import { Action } from "../../../../store/actions/types";
import { GlobalState } from "../../../../store/reducers/types";
import { ProfileData } from "../../types";

export type ProfileState = {
  profileData: pot.Pot<ProfileData, NetworkError>;
};

const INITIAL_STATE: ProfileState = {
  profileData: pot.none
};

const reducer = (
  state: ProfileState = INITIAL_STATE,
  action: Action
): ProfileState => {
  switch (action.type) {
    case getType(profileData.request):
      return {
        ...state,
        profileData: pot.toLoading(state.profileData)
      };
    case getType(profileData.success):
      return {
        ...state,
        profileData: pot.some(action.payload)
      };
    case getType(profileData.failure):
      return {
        ...state,
        profileData: pot.toError(state.profileData, action.payload)
      };
    default:
      return state;
  }
};

export default reducer;

const selectProfileState = (state: GlobalState) => state.profileNew;

export const selectProfileData = createSelector(selectProfileState, x =>
  pot.map(x.profileData, identity)
);
