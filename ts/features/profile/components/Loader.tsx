import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ContentWrapper,
  IOStyles,
  LoadingSpinner
} from "@pagopa/io-app-design-system";

export const Loader = () => (
  <SafeAreaView
    style={[IOStyles.flex, IOStyles.centerJustified, IOStyles.alignCenter]}
  >
    <ContentWrapper>
      <LoadingSpinner size={48} />
    </ContentWrapper>
  </SafeAreaView>
);
