import React from "react";
import { View } from "react-native";
import {
  ContentWrapper,
  FooterWithButtons,
  Alert,
  IOStyles
} from "@pagopa/io-app-design-system";
import { SafeAreaView } from "react-native-safe-area-context";
import { IOStackNavigationRouteProps } from "../../../navigation/params/AppParamsList";
import { ProfileNewParamsList } from "../../../navigation/params/ProfileParamsList";
import { useHeaderSecondLevel } from "../../../hooks/useHeaderSecondLevel";
import ROUTES from "../../../navigation/routes";
import I18n from "../../../i18n";

type Props = IOStackNavigationRouteProps<
  ProfileNewParamsList,
  "PROFILE_DELETE_CONFIRM"
>;

const DeleteProfileConfirmScreen = ({ navigation }: Props) => {
  useHeaderSecondLevel({
    title: I18n.t("newProfile.labels.delete")
  });

  return (
    <SafeAreaView style={IOStyles.flex}>
      <View style={IOStyles.flex}>
        <ContentWrapper>
          <Alert
            variant="warning"
            content={I18n.t("newProfile.copy.confirmDelete")}
          />
        </ContentWrapper>
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
            onPress: () => navigation.replace(ROUTES.PROFILE_DELETE)
          }
        }}
      />
    </SafeAreaView>
  );
};

export default DeleteProfileConfirmScreen;
