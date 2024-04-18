import React from "react";
import { View } from "react-native";
import { IOStyles } from "@pagopa/io-app-design-system";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";

export const Loader = () => (
  <View style={[IOStyles.flex, IOStyles.centerJustified, IOStyles.alignCenter]}>
    <LoadingIndicator />
  </View>
);
