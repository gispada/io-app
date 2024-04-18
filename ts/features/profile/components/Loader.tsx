import React from "react";
import { View } from "react-native";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";
import { IOStyles } from "../../../components/core/variables/IOStyles";

export const Loader = () => (
  <View style={[IOStyles.flex, IOStyles.centerJustified, IOStyles.alignCenter]}>
    <LoadingIndicator />
  </View>
);
