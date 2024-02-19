import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackClientHome } from './StackClientHome';
import { StackNotifications } from './StackNotifications';

const Tab = createBottomTabNavigator();

export const TabNavClient = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case 'ClientHome':
              return (
                <Icon
                  name={focused ? 'home' : 'home-outline'}
                  size={30}
                  color={focused ? 'lightgrey' : 'darkgrey'}
                />
              );
            case 'StackNotifications':
              return (
                <Icon
                  name={focused ? 'notifications' : 'notifications-outline'}
                  size={30}
                  color={focused ? 'lightgrey' : 'darkgrey'}
                />
              );
            case 'Profile':
              return (
                <Icon
                  name={focused ? 'person' : 'person-outline'}
                  size={30}
                  color={focused ? 'lightgrey' : 'darkgrey'}
                />
              );
          }
        },
        tabBarIconStyle: {width: '100%'},
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveBackgroundColor: 'rgb(57,48,77)',
        tabBarInactiveBackgroundColor: 'rgb(31,26,48)',
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: 'black'},
      })}>
      <Tab.Screen name="ClientHome" component={StackClientHome} />
      <Tab.Screen name="StackNotifications" component={StackNotifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
