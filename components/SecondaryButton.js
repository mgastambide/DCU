import React from 'react';

import Colors from '../constants/Colors';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class SecondaryButton extends React.Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.callback} style={[styles.touchableOpacity, this.props.style]}>
                <Text style={styles.text}>{this.props.value}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({

    touchableOpacity: {
        backgroundColor: Colors.IUPI_GREY4,
        borderColor: Colors.IUPI_GREY4,
        borderRadius: 5,
        borderWidth: 0.5,
    },

    text: {
        alignSelf: 'center',
        color: Colors.IUPI_SKY2,
        fontSize: 22,
        paddingVertical: 14,
    },
});