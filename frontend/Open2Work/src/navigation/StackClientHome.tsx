import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import OrgHome from '../screens/OrgHome';
import { GroupDetails } from '../screens/GroupDetails';

export type RootStackParamListClient = {
    Home: undefined;
    Group: {
        idUser: string
    };
};

const Stack = createStackNavigator<RootStackParamListClient>();

export const StackClientHome = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
            <Stack.Screen name="Home" component={OrgHome} />
            <Stack.Screen name="Group" component={GroupDetails} />
    </Stack.Navigator>
  );
};
