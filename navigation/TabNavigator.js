import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Icon} from "react-native-elements";
import HomeScreen from '../screens/HomeScreen';
import Colors from "../constants/Colors";
import ListeningScreen from '../screens/Listening/ListeningScreen';
import ListeningExerciseScreen from '../screens/Listening/ListeningExerciseScreen';
import SurplusExerciseScreen from '../screens/Surplus/SurplusExerciseScreen';
import ToSelectExerciseScreen from '../screens/ToSelect/ToSelectExerciseScreen';
import WhoIsWhoExerciseScreen from '../screens/Who_is_who/WhoIsWhoExerciseScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import IsolatedExerciseScreen from '../screens/Isolated/IsolatedExerciseScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Listening: ListeningScreen,
    ListeningExercise: ListeningExerciseScreen,
    SurplusExercise: SurplusExerciseScreen,
    ToSelectExercise: ToSelectExerciseScreen,
    WhoIsWhoExercise: WhoIsWhoExerciseScreen,
    IsolatedExercise: IsolatedExerciseScreen
});

HomeStack.navigationOptions = {
    tabBarVisible: false,
    tabBarLabel: 'Inicio',
    tabBarIcon: ({ focused }) => {
        return (focused)
            ? <Icon name='tasks' type={'font-awesome-5'} color={Colors.APHASIA_BLUE} size={20}/>
            : <Icon name='tasks' type={'font-awesome'} color={Colors.APHASIA_GREY1} size={20}/>
    },
};

const MyProfileStack = createStackNavigator({
    MyProfile: MyProfileScreen,
});

MyProfileStack.navigationOptions = {
    tabBarLabel: 'Mi Perfil',
    tabBarIcon: ({ focused }) => {
        return (focused)
            ? <Icon name='user' type={'font-awesome'} color={Colors.APHASIA_BLUE} size={20}/>
            : <Icon name='user' type={'font-awesome'} color={Colors.APHASIA_GREY1} size={20}/>
    },
};

const MyAchievementsStack = createStackNavigator({
    MyAchievements: AchievementsScreen,
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
        //Achievements: MyAchievementsStack,
        //MyProfile: MyProfileStack,
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
