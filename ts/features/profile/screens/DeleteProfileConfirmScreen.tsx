import React from "react";
import { View } from "react-native";
import { ContentWrapper } from "@pagopa/io-app-design-system";
import { SafeAreaView } from "react-native-safe-area-context";
import { InfoBox } from "../../../components/box/InfoBox";
import { H3 } from "../../../components/core/typography/H3";
import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../components/ui/FooterWithButtons";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import { IOStackNavigationRouteProps } from "../../../navigation/params/AppParamsList";
import { ProfileNewParamsList } from "../../../navigation/params/ProfileParamsList";
import ROUTES from "../../../navigation/routes";
import I18n from "../../../i18n";

type Props = IOStackNavigationRouteProps<
  ProfileNewParamsList,
  "PROFILE_DELETE_CONFIRM"
>;

const DeleteProfileConfirmScreen = ({ navigation }: Props) => (
  <BaseScreenComponent goBack headerTitle={I18n.t("newProfile.labels.delete")}>
    <SafeAreaView style={IOStyles.flex}>
      <View style={IOStyles.flex}>
        <ContentWrapper>
          <InfoBox iconName="warningFilled" alignedCentral>
            <H3>{I18n.t("newProfile.copy.confirmDelete")}</H3>
          </InfoBox>
        </ContentWrapper>
      </View>

      <FooterWithButtons
        type="TwoButtonsInlineThird"
        leftButton={{
          title: I18n.t("global.buttons.cancel"),
          bordered: true,
          onPress: () => navigation.goBack()
        }}
        rightButton={{
          title: I18n.t("global.buttons.confirm"),
          primary: true,
          onPress: () => navigation.replace(ROUTES.PROFILE_DELETE)
        }}
      />
    </SafeAreaView>
  </BaseScreenComponent>
);

export default DeleteProfileConfirmScreen;
