import React from "react";
import { Content } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { InfoBox } from "../../../components/box/InfoBox";
import { H3 } from "../../../components/core/typography/H3";
import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../components/ui/FooterWithButtons";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import { IOStackNavigationRouteProps } from "../../../navigation/params/AppParamsList";
import { ProfileNewParamsList } from "../../../navigation/params/ProfileParamsList";
import ROUTES from "../../../navigation/routes";

type Props = IOStackNavigationRouteProps<
  ProfileNewParamsList,
  "PROFILE_DELETE_CONFIRM"
>;

const DeleteProfileConfirmScreen = ({ navigation }: Props) => (
  <BaseScreenComponent goBack headerTitle="Cancella Profilo">
    <SafeAreaView style={IOStyles.flex}>
      <Content>
        <InfoBox iconName="warningFilled">
          <H3>Vuoi davvero cancellare il tuo profilo?</H3>
        </InfoBox>
      </Content>
      <FooterWithButtons
        type="TwoButtonsInlineThird"
        leftButton={{
          title: "Annulla",
          bordered: true,
          onPress: () => navigation.goBack()
        }}
        rightButton={{
          title: "Conferma",
          primary: true,
          onPress: () => navigation.replace(ROUTES.PROFILE_DELETE)
        }}
      />
    </SafeAreaView>
  </BaseScreenComponent>
);

export default DeleteProfileConfirmScreen;
