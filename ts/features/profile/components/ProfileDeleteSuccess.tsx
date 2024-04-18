import React from "react";
import { Content } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../components/ui/FooterWithButtons";
import { InfoBox } from "../../../components/box/InfoBox";
import { H3 } from "../../../components/core/typography/H3";
import { IOStyles } from "../../../components/core/variables/IOStyles";

type Props = {
  onDismiss?: () => void;
};

export const ProfileDeleteSuccess = ({ onDismiss }: Props) => (
  <BaseScreenComponent goBack headerTitle="Cancella Profilo">
    <SafeAreaView style={IOStyles.flex}>
      <Content>
        <InfoBox iconName="success" iconColor="green">
          <H3>Richiesta di cancellazione profilo presa in carico.</H3>
        </InfoBox>
      </Content>
      <FooterWithButtons
        type="SingleButton"
        leftButton={{
          title: "Indietro",
          onPress: onDismiss
        }}
      />
    </SafeAreaView>
  </BaseScreenComponent>
);
