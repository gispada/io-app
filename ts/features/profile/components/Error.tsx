import React from "react";
import { H3, Pictogram, VSpacer } from "@pagopa/io-app-design-system";
import { View } from "react-native";
import { IOStyles } from "../../../components/core/variables/IOStyles";

export const ErrorComponent = () => (
  <View style={[IOStyles.flex, IOStyles.centerJustified, IOStyles.alignCenter]}>
    <Pictogram name="attention" size={72} />
    <VSpacer size={16} />
    <H3>We could not get your profile :(</H3>
  </View>
);
