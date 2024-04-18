import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { List } from "native-base";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { ListItemSwitch } from "@pagopa/io-app-design-system";
import { IOStackNavigationRouteProps } from "../../../navigation/params/AppParamsList";
import { MainTabParamsList } from "../../../navigation/params/MainTabParamsList";
import { profileData } from "../../../features/profile/store/actions";
import { selectProfileData } from "../../../features/profile/store/reducers";
import { loadUserDataProcessing } from "../../../store/actions/userDataProcessing";
import { UserDataProcessingChoiceEnum } from "../../../../definitions/backend/UserDataProcessingChoice";
import { userDataProcessingSelector } from "../../../store/reducers/userDataProcessing";
import { ProfileDataItems } from "../components/ProfileDataItems";
import ROUTES from "../../../navigation/routes";
import { ErrorComponent } from "../components/Error";
import { Loader } from "../components/Loader";
import { ProfileData } from "../types";

type Props = IOStackNavigationRouteProps<MainTabParamsList, "PROFILE_MAIN">;

const ProfileNewMainScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfileData);
  const userDataProcessing = useSelector(userDataProcessingSelector);

  const profileDeletonPending = pot.map(
    userDataProcessing.DELETE,
    x => x?.choice === UserDataProcessingChoiceEnum.DELETE
  );

  useEffect(() => {
    dispatch(profileData.request());
    dispatch(
      loadUserDataProcessing.request(UserDataProcessingChoiceEnum.DELETE)
    );
  }, [dispatch]);

  const onSwitchToggle = () => {
    navigation.navigate(ROUTES.PROFILE_NEW_NAVIGATOR, {
      screen: ROUTES.PROFILE_DELETE_CONFIRM
    });
  };

  const renderProfileData = (profileData: ProfileData) => (
    <ScrollView>
      <List withContentLateralPadding>
        <ProfileDataItems data={profileData} />
        <ListItemSwitch
          label="Cancella profilo"
          isLoading={pot.isLoading(userDataProcessing.DELETE)}
          onSwitchValueChange={onSwitchToggle}
          value={pot.getOrElse(profileDeletonPending, false)}
          disabled={pot.getOrElse(profileDeletonPending, false)}
        />
      </List>
    </ScrollView>
  );

  return pot.fold(
    profile,
    Loader,
    Loader,
    Loader,
    ErrorComponent,
    renderProfileData,
    Loader,
    Loader,
    ErrorComponent
  );
};

export default ProfileNewMainScreen;
