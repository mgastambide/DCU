import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import TabNavigatorTherapist from "./TabNavigatorTherapist";
import DrawerScreen from "../screens/DrawerScreen";
import React from "react";

const DrawerNav = createAppContainer(createDrawerNavigator({
        Home: {
            screen: TabNavigatorTherapist,
        }
    }
    , {
        contentComponent: DrawerScreen
    }
));

export default class DrawerScreenTherapist extends React.Component {

    render() {

        return (
            <DrawerNav />
        )
    }
}
