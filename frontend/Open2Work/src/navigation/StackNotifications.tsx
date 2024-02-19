import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { GroupDetails } from '../screens/GroupDetails';
import Notifications from '../screens/Notifications';
import { ClientDetails } from '../screens/ClientDetails';
import { useAppSelector } from '../redux/hook';
import { OrderElement } from '../interfaces/teamInterface';

export type RootStackParamListClientNotifications = {
    Notifications: undefined;
    Details: {
        idUser: string,
        order: OrderElement,
        refreshFunc?: ()=> void ,
    };
};

const Stack = createStackNavigator<RootStackParamListClientNotifications>();

export const StackNotifications = () => {

    const { isDev } = useAppSelector(state => state.user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Details" component={ isDev ? ClientDetails : GroupDetails} />
    </Stack.Navigator>
  );
};
