import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { List } from "native-base";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { ListItemSwitch } from "@pagopa/io-app-design-system";
import { useIODispatch, useIOSelector } from "../../../store/hooks";
import { IOStackNavigationRouteProps } from "../../../navigation/params/AppParamsList";
import { MainTabParamsList } from "../../../navigation/params/MainTabParamsList";
import ListItemComponent from "../../../components/screens/ListItemComponent";
import { profileData } from "../../../features/profile/store/actions";
import { selectProfileData } from "../../../features/profile/store/reducers";
import { ErrorComponent } from "../components/Error";
import { Loader } from "../components/Loader";
import { ProfileData } from "../types";
import I18n from "../../../i18n";
import { loadUserDataProcessing } from "../../../store/actions/userDataProcessing";
import { UserDataProcessingChoiceEnum } from "../../../../definitions/backend/UserDataProcessingChoice";
import { userDataProcessingSelector } from "../../../store/reducers/userDataProcessing";
import { config } from "./config";

type Props = IOStackNavigationRouteProps<MainTabParamsList, "PROFILE_MAIN">;

const ProfileNewMainScreen: React.FC<Props> = () => {
  const dispatch = useIODispatch();
  const profile = useIOSelector(selectProfileData);
  const userDataProcessing = useIOSelector(userDataProcessingSelector);

  useEffect(() => {
    dispatch(profileData.request());
    dispatch(
      loadUserDataProcessing.request(UserDataProcessingChoiceEnum.DELETE)
    );
  }, [dispatch]);

  const renderProfileData = (profileData: ProfileData) => (
    <ScrollView>
      <List withContentLateralPadding>
        {config.map(({ id, title, value, iconName }) => (
          <ListItemComponent
            key={id}
            title={title}
            subTitle={
              Array.isArray(value)
                ? value.map(v => profileData[v]).join(" ")
                : profileData[value]
            }
            iconName={iconName}
          />
        ))}
        <ListItemSwitch
          label={I18n.t("newProfile.labels.delete")}
          isLoading={pot.isLoading(userDataProcessing.DELETE)}
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
