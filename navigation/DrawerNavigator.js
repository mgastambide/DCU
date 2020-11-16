import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import TabNavigator from "./TabNavigator";
import DrawerScreen from "../screens/DrawerScreen";
import React from "react";

const DrawerNav = createAppContainer(createDrawerNavigator({
        Home: {
            screen: TabNavigator,
        }
    }
    , {
        contentComponent: DrawerScreen
    }
));

export default class DrawerNavigator extends React.Component {

    render() {

        return (
            <DrawerNav />
        )
    }
}
