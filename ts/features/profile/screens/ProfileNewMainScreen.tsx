import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { List } from "native-base";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { IOStackNavigationRouteProps } from "../../../navigation/params/AppParamsList";
import { MainTabParamsList } from "../../../navigation/params/MainTabParamsList";
import ListItemComponent from "../../../components/screens/ListItemComponent";
import { profileData } from "../../../features/profile/store/actions";
import { selectProfileData } from "../../../features/profile/store/reducers";
import { ErrorComponent } from "../components/Error";
import { Loader } from "../components/Loader";
import { ProfileData } from "../types";
import { config } from "./config";

type Props = IOStackNavigationRouteProps<MainTabParamsList, "PROFILE_MAIN">;

const ProfileNewMainScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfileData);

  useEffect(() => {
    dispatch(profileData.request());
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
