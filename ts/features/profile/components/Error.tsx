import React from "react";
import {
  H3,
  Pictogram,
  VSpacer,
  IOStyles,
  ContentWrapper
} from "@pagopa/io-app-design-system";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import I18n from "../../../i18n";

export const ErrorComponent = () => (
  <SafeAreaView style={[IOStyles.flex, IOStyles.centerJustified]}>
    <ContentWrapper>
      <View style={IOStyles.alignCenter}>
        <Pictogram name="attention" size={72} />
        <VSpacer size={16} />
        <H3>{I18n.t("newProfile.errors.fetch")}</H3>
      </View>
    </ContentWrapper>
  </SafeAreaView>
);
