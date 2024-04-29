import React from "react";
import { View } from "react-native";
import {
  ContentWrapper,
  FooterWithButtons,
  Alert,
  IOStyles
} from "@pagopa/io-app-design-system";
import { useIONavigation } from "../../../navigation/params/AppParamsList";
import { useHeaderSecondLevel } from "../../../hooks/useHeaderSecondLevel";
import ROUTES from "../../../navigation/routes";
import I18n from "../../../i18n";

const DeleteProfileConfirmScreen = () => {
  const navigation = useIONavigation();

  useHeaderSecondLevel({
    title: I18n.t("newProfile.labels.delete")
  });

  return (
    <>
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
            onPress: () =>
              navigation.replace(ROUTES.PROFILE_NEW_NAVIGATOR, {
                screen: ROUTES.PROFILE_DELETE
              })
          }
        }}
      />
    </>
  );
};

export default DeleteProfileConfirmScreen;
