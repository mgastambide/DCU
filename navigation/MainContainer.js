import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {ActivityIndicator, Button, ImageBackground, Text, View} from 'react-native';
import * as React from 'react';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import TabNavigator from './TabNavigator';
import DrawerScreen from '../screens/DrawerScreen';
import TabNavigatorTherapist from './TabNavigatorTherapist';

const DrawerNavigator = createAppContainer(
  createDrawerNavigator(
    {
      Home: {
        screen: TabNavigator,
      },
    },
    {
      contentComponent: DrawerScreen,
    },
  ),
);

const DrawerNavigatorTherapist = createAppContainer(
  createDrawerNavigator(
    {
      Home: {
        screen: TabNavigatorTherapist,
      },
    },
    {
      contentComponent: DrawerScreen,
    },
  ),
);

export default createAppContainer(
    createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: createStackNavigator({
        Welcome: WelcomeScreen,
        Login: LoginScreen,
        Register: CreateAccountScreen,
      }),
      App: DrawerNavigator,
      Therapist: DrawerNavigatorTherapist,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ),
);
