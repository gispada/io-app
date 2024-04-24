import React from "react";
import { View } from "react-native";
import { List } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import * as pot from "@pagopa/ts-commons/lib/pot";
import {
  ContentWrapper,
  VSpacer,
  FooterWithButtons,
  H3,
  IOStyles,
  Alert
} from "@pagopa/io-app-design-system";
import { IOStackNavigationRouteProps } from "../../../navigation/params/AppParamsList";
import { ProfileNewParamsList } from "../../../navigation/params/ProfileParamsList";
import { selectProfileData } from "../../../features/profile/store/reducers";
import { ProfileDataItems } from "../components/ProfileDataItems";
import { upsertUserDataProcessing } from "../../../store/actions/userDataProcessing";
import { UserDataProcessingChoiceEnum } from "../../../../definitions/backend/UserDataProcessingChoice";
import { userDataProcessingSelector } from "../../../store/reducers/userDataProcessing";
import { useHeaderSecondLevel } from "../../../hooks/useHeaderSecondLevel";
import { useIOSelector, useIODispatch } from "../../../store/hooks";
import I18n from "../../../i18n";
import { ProfileDeleteSuccess } from "../components/ProfileDeleteSuccess";

type Props = IOStackNavigationRouteProps<
  ProfileNewParamsList,
  "PROFILE_DELETE"
>;

const DeleteProfileScreen = ({ navigation }: Props) => {
  const profile = useIOSelector(selectProfileData);
  const userDataProcessing = useIOSelector(userDataProcessingSelector);
  const dispatch = useIODispatch();

  useHeaderSecondLevel({
    title: I18n.t("newProfile.labels.delete")
  });

  const renderErrorIfAny = () => {
    if (pot.isError(userDataProcessing.DELETE)) {
      return (
        <ContentWrapper>
          <VSpacer size={32} />
          <Alert variant="error" content={I18n.t("newProfile.errors.delete")} />
        </ContentWrapper>
      );
    }
    return null;
  };

  if (
    pot.isSome(userDataProcessing.DELETE) &&
    userDataProcessing.DELETE.value?.choice
  ) {
    return <ProfileDeleteSuccess onDismiss={() => navigation.goBack()} />;
  }

  return (
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
        primary={{
          type: "Outline",
          buttonProps: {
            label: I18n.t("global.buttons.cancel"),
            onPress: () => navigation.goBack()
          }
        }}
        secondary={{
          type: "Solid",
          buttonProps: {
            label: I18n.t("global.buttons.confirm"),
            loading: pot.isLoading(userDataProcessing.DELETE),
            onPress: () =>
              dispatch(
                upsertUserDataProcessing.request(
                  UserDataProcessingChoiceEnum.DELETE
                )
              )
          }
        }}
      />
    </SafeAreaView>
  );
};

export default DeleteProfileScreen;
