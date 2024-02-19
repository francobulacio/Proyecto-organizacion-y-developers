import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import Register from '../screens/Register';
import IsDev from '../screens/IsDev';
import Profile from '../screens/Profile';
import { useAppSelector } from '../redux/hook';
import { TabNavDev } from './TabNavDev';
import { TabNavClient } from './TabNavClient';

export type RootStackParamList = {
  LoginScreen: undefined;
  IsDev: undefined;
  Register: {isDev?: boolean};
  Profile: undefined;
  TabNav: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigation = () => {

  const { auth, user } = useAppSelector(state => state);

  const { token } = auth;
  const { isDev } = user;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {
        token === null ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="IsDev" component={IsDev} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="TabNav" component={ isDev ? TabNavDev : TabNavClient} />
          </>
        )
      }
    </Stack.Navigator>
  );
};
