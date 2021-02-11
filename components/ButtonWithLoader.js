import React from 'react';

import Colors from '../constants/Colors';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";

export default class ButtonWithLoader extends React.Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.callback} style={[styles.touchableOpacity, this.props.style, {
                backgroundColor: (this.props.disabled !== undefined && this.props.disabled) ? Colors.APHASIA_GREY3 : Colors.APHASIA_SKY,
                borderColor: (this.props.disabled !== undefined && this.props.disabled) ? Colors.APHASIA_GREY3 : Colors.APHASIA_SKY,
            }]}
            activeOpacity={(this.props.disabled !== undefined && this.props.disabled) ? 1 : .8}
            >
                {
                    (this.props.status !== undefined && this.props.status)
                    ? <ActivityIndicator animating={this.props.status} style={{marginVertical: 19}} color={Colors.APHASIA_WHITE}/>
                    : <Text style={styles.text}>{this.props.value}</Text>
                }
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({

    touchableOpacity: {
        backgroundColor: Colors.APHASIA_SKY,
        borderColor: Colors.APHASIA_SKY,
        borderRadius: 5,
        borderWidth: 0.5,
    },

    text: {
        alignSelf: 'center',
        color: Colors.APHASIA_WHITE,
        fontSize: 22,
        paddingVertical: 14,
    },
});
