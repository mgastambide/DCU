import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Icon} from "react-native-elements";
import HomeScreen from '../screens/HomeScreen';
import Colors from "../constants/Colors";
import ListeningScreen from '../screens/Listening/ListeningScreen';
import ListeningExerciseScreen from '../screens/Listening/ListeningExerciseScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Listening: ListeningScreen,
    ListeningExercise: ListeningExerciseScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Inicio',
    tabBarIcon: ({ focused }) => {
        return (focused)
            ? <Icon name='tasks' type={'font-awesome-5'} color={Colors.APHASIA_BLUE} size={20}/>
            : <Icon name='tasks' type={'font-awesome'} color={Colors.APHASIA_GREY1} size={20}/>
    },
};

const RewardsStack = createStackNavigator({
    Rewards: HomeScreen,
});

RewardsStack.navigationOptions = {
    tabBarLabel: 'Mi Perfil',
    tabBarIcon: ({ focused }) => {
        return (focused)
            ? <Icon name='gift' type={'font-awesome'} color={Colors.APHASIA_BLUE} size={20}/>
            : <Icon name='gift' type={'font-awesome'} color={Colors.APHASIA_GREY1} size={20}/>
    },
};

const MyAchievementsStack = createStackNavigator({
    MyAchievements: HomeScreen,
});

MyAchievementsStack.navigationOptions = {
    tabBarLabel: 'Logros',
    tabBarIcon: ({ focused }) => {
        return (focused)
            ? <Icon name='trophy' type={'font-awesome'} color={Colors.APHASIA_BLUE} size={20}/>
            : <Icon name='trophy' type={'font-awesome'} color={Colors.APHASIA_GREY1} size={20}/>
    },
};

export default createBottomTabNavigator({
        HomeApp: HomeStack,
        Achievements: MyAchievementsStack,
        Rewards: RewardsStack,
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.APHASIA_BLUE,
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: Colors.APHASIA_WHITE,
            },
        }
    },
);
