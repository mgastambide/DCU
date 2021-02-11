import React from 'react';

import {ActivityIndicator} from "react-native";

export default class ActivityLoader extends React.Component {

    render() {
        return (
            <>
                <ActivityIndicator animating={this.props.status} style={{marginVertical: 280}}/>
            </>
        );
    }
}
