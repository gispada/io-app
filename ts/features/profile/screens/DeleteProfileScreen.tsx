import React from "react";
import { View } from "react-native";
import { List } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { ContentWrapper, VSpacer } from "@pagopa/io-app-design-system";
import { H3 } from "../../../components/core/typography/H3";
import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../components/ui/FooterWithButtons";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import { IOStackNavigationRouteProps } from "../../../navigation/params/AppParamsList";
import { ProfileNewParamsList } from "../../../navigation/params/ProfileParamsList";
import { selectProfileData } from "../../../features/profile/store/reducers";
import { ProfileDataItems } from "../components/ProfileDataItems";
import { userDataProcessingSelector } from "../../../store/reducers/userDataProcessing";
import { InfoBox } from "../../../components/box/InfoBox";
import { Body } from "../../../components/core/typography/Body";
import { useIOSelector } from "../../../store/hooks";
import I18n from "../../../i18n";

type Props = IOStackNavigationRouteProps<
  ProfileNewParamsList,
  "PROFILE_DELETE"
>;

const DeleteProfileScreen = ({ navigation }: Props) => {
  const profile = useIOSelector(selectProfileData);
  const userDataProcessing = useIOSelector(userDataProcessingSelector);

  const renderErrorIfAny = () => {
    if (pot.isError(userDataProcessing.DELETE)) {
      return (
        <ContentWrapper>
          <VSpacer size={32} />
          <InfoBox iconName="errorFilled" iconColor="red" alignedCentral>
            <Body color="red">{I18n.t("newProfile.errors.delete")}</Body>
          </InfoBox>
        </ContentWrapper>
      );
    }
    return null;
  };

  return (
    <BaseScreenComponent
      goBack
      headerTitle={I18n.t("newProfile.labels.delete")}
    >
      <SafeAreaView style={IOStyles.flex}>
        <View style={IOStyles.flex}>
          <ContentWrapper>
            <H3>{I18n.t("newProfile.copy.confirmDeleteLast")}</H3>
          </ContentWrapper>

          {pot.isSome(profile) ? (
            <List withContentLateralPadding>
              <ProfileDataItems data={profile.value} />
            </List>
          ) : null}

          {renderErrorIfAny()}
        </View>

        <FooterWithButtons
          type="TwoButtonsInlineThird"
          leftButton={{
            title: I18n.t("newProfile.labels.cancel"),
            bordered: true,
            onPress: () => navigation.goBack()
          }}
          rightButton={{
            title: I18n.t("newProfile.labels.confirm"),
            primary: true,
            isLoading: pot.isLoading(userDataProcessing.DELETE)
          }}
        />
      </SafeAreaView>
    </BaseScreenComponent>
  );
};

export default DeleteProfileScreen;
