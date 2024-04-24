import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DeleteProfileScreen from "../features/profile/screens/DeleteProfileScreen";
import DeleteProfileConfirmScreen from "../features/profile/screens/DeleteProfileConfirmScreen";
import ROUTES from "./routes";
import { ProfileNewParamsList } from "./params/ProfileParamsList";

const Stack = createStackNavigator<ProfileNewParamsList>();

const ProfileNewNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ROUTES.PROFILE_DELETE_CONFIRM}
      component={DeleteProfileConfirmScreen}
    />
    <Stack.Screen
      name={ROUTES.PROFILE_DELETE}
      component={DeleteProfileScreen}
    />
  </Stack.Navigator>
);

export default ProfileNewNavigator;
