import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContentWrapper, IOStyles } from "@pagopa/io-app-design-system";
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator";

export const Loader = () => (
  <SafeAreaView
    style={[IOStyles.flex, IOStyles.centerJustified, IOStyles.alignCenter]}
  >
    <ContentWrapper>
      <LoadingIndicator />
    </ContentWrapper>
  </SafeAreaView>
);
