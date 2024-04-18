import React from "react";
import { View } from "react-native";
import { ContentWrapper } from "@pagopa/io-app-design-system";
import { SafeAreaView } from "react-native-safe-area-context";
import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../components/ui/FooterWithButtons";
import { InfoBox } from "../../../components/box/InfoBox";
import { H3 } from "../../../components/core/typography/H3";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import I18n from "../../../i18n";

type Props = {
  onDismiss?: () => void;
};

export const ProfileDeleteSuccess = ({ onDismiss }: Props) => (
  <BaseScreenComponent goBack headerTitle="Cancella Profilo">
    <SafeAreaView style={IOStyles.flex}>
      <View style={IOStyles.flex}>
        <ContentWrapper>
          <InfoBox iconName="success" iconColor="green">
            <H3>{I18n.t("newProfile.copy.deleteSuccess")}</H3>
          </InfoBox>
        </ContentWrapper>
      </View>

      <FooterWithButtons
        type="SingleButton"
        leftButton={{
          title: I18n.t("global.buttons.back"),
          onPress: onDismiss
        }}
      />
    </SafeAreaView>
  </BaseScreenComponent>
);
