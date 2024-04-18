import { ActionType, createAsyncAction } from "typesafe-actions";
import { NetworkError } from "../../../../utils/errors";
import { ProfileData } from "../../types";

export const profileData = createAsyncAction(
  "PROFILE_DATA_REQUEST",
  "PROFILE_DATA_SUCCESS",
  "PROFILE_DATA_FAILURE"
)<void, ProfileData, NetworkError>();

export type ProfileNewActions = ActionType<typeof profileData>;
