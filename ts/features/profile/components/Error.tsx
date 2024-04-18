import React from "react";
import { H3, Pictogram, VSpacer } from "@pagopa/io-app-design-system";
import { View } from "react-native";
import I18n from "../../../i18n";
import { IOStyles } from "../../../components/core/variables/IOStyles";

export const ErrorComponent = () => (
  <View style={[IOStyles.flex, IOStyles.centerJustified, IOStyles.alignCenter]}>
    <Pictogram name="attention" size={72} />
    <VSpacer size={16} />
    <H3>{I18n.t("newProfile.errors.fetch")}</H3>
  </View>
);
