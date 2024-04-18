import React from "react";
import { Content, List } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { VSpacer } from "@pagopa/io-app-design-system";
import { H3 } from "../../../components/core/typography/H3";
import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../components/ui/FooterWithButtons";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import { IOStackNavigationRouteProps } from "../../../navigation/params/AppParamsList";
import { ProfileNewParamsList } from "../../../navigation/params/ProfileParamsList";
import { selectProfileData } from "../../../features/profile/store/reducers";
import { ProfileDataItems } from "../components/ProfileDataItems";
import { upsertUserDataProcessing } from "../../../store/actions/userDataProcessing";
import { UserDataProcessingChoiceEnum } from "../../../../definitions/backend/UserDataProcessingChoice";
import { userDataProcessingSelector } from "../../../store/reducers/userDataProcessing";
import { InfoBox } from "../../../components/box/InfoBox";
import { Body } from "../../../components/core/typography/Body";
import { ProfileDeleteSuccess } from "../components/ProfileDeleteSuccess";

type Props = IOStackNavigationRouteProps<
  ProfileNewParamsList,
  "PROFILE_DELETE"
>;

const DeleteProfileScreen = ({ navigation }: Props) => {
  const profile = useSelector(selectProfileData);
  const userDataProcessing = useSelector(userDataProcessingSelector);
  const dispatch = useDispatch();

  const renderErrorIfAny = () => {
    if (pot.isError(userDataProcessing.DELETE)) {
      return (
        <>
          <VSpacer size={32} />
          <InfoBox iconName="errorFilled" iconColor="red" alignedCentral>
            <Body>Si è verificato un errore, ritenta.</Body>
          </InfoBox>
        </>
      );
    }
    return null;
  };

  if (
    pot.isSome(userDataProcessing.DELETE) &&
    userDataProcessing.DELETE.value?.choice
  ) {
    return <ProfileDeleteSuccess onDismiss={() => navigation.goBack()} />;
  }

  return (
    <BaseScreenComponent goBack headerTitle="Cancella Profilo">
      <SafeAreaView style={IOStyles.flex}>
        <Content>
          <H3>Confermi la cancellazione dei seguenti dati?</H3>
          {pot.isSome(profile) ? (
            <List withContentLateralPadding>
              <ProfileDataItems data={profile.value} />
            </List>
          ) : null}
          {renderErrorIfAny()}
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
            isLoading: pot.isLoading(userDataProcessing.DELETE),
            onPress: () =>
              dispatch(
                upsertUserDataProcessing.request(
                  UserDataProcessingChoiceEnum.DELETE
                )
              )
          }}
        />
      </SafeAreaView>
    </BaseScreenComponent>
  );
};

export default DeleteProfileScreen;
