import React from "react";
import { ScrollView } from "react-native";
import { List } from "native-base";
import { IOStackNavigationRouteProps } from "../../navigation/params/AppParamsList";
import { MainTabParamsList } from "../../navigation/params/MainTabParamsList";
import ListItemComponent from "../../components/screens/ListItemComponent";

type Props = IOStackNavigationRouteProps<MainTabParamsList, "PROFILE_MAIN">;

const profile = [
  {
    id: "name-surname",
    title: "Nome e Cognome",
    value: "Mario Rossi",
    iconName: "profile"
  },
  {
    id: "fiscal-code",
    title: "Codice Fiscale",
    value: "RSSMRA91A01H501X",
    iconName: "creditCard"
  },
  {
    id: "email",
    title: "Indirizzo Email",
    value: "mario.rossi@email.it",
    iconName: "email"
  }
] as const;

const ProfileNewMainScreen: React.FC<Props> = () => (
  <ScrollView>
    <List withContentLateralPadding>
      {profile.map(({ id, title, value, iconName }) => (
        <ListItemComponent
          key={id}
          title={title}
          subTitle={value}
          iconName={iconName}
          testID="name-surname"
        />
      ))}
    </List>
  </ScrollView>
);

export default ProfileNewMainScreen;
