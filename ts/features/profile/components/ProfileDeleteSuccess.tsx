import React from "react";
import { View } from "react-native";
import {
  ContentWrapper,
  IOStyles,
  FooterWithButtons,
  Alert
} from "@pagopa/io-app-design-system";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderSecondLevel } from "../../../hooks/useHeaderSecondLevel";
import I18n from "../../../i18n";

type Props = {
  onDismiss: () => void;
};

export const ProfileDeleteSuccess = ({ onDismiss }: Props) => {
  useHeaderSecondLevel({
    title: I18n.t("newProfile.labels.delete")
  });

  return (
    <SafeAreaView style={IOStyles.flex}>
      <View style={IOStyles.flex}>
        <ContentWrapper>
          <Alert
            variant="success"
            content={I18n.t("newProfile.copy.deleteSuccess")}
          />
        </ContentWrapper>
      </View>

      <FooterWithButtons
        type="SingleButton"
        primary={{
          type: "Solid",
          buttonProps: {
            label: I18n.t("global.buttons.back"),
            onPress: onDismiss
          }
        }}
      />
    </SafeAreaView>
  );
};
