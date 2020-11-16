import React from 'react';

import Colors from '../constants/Colors';
import {StyleSheet, TouchableOpacity, Text} from "react-native";

export default class WhiteButton extends React.Component {

    render() {
        return (
            <TouchableOpacity
                style={[styles.touchableOpacity, this.props.style]}
                activeOpacity={0.75}
                onPress={this.props.callback}
            >
                <Text style={[styles.text, this.props.styleText]}>
                    {this.props.value}
                </Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({

    touchableOpacity: {
        borderRadius: 5,
        borderWidth: 0.5,
        marginHorizontal:5,
        borderColor:Colors.APHASIA_BLUE,
        backgroundColor: Colors.APHASIA_WHITE,
        marginTop:5,
        marginBottom:10,
        ...Colors.shadowBox
    },

    linearGradient:{
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
    },

    text: {
        alignSelf: 'center',
        color: Colors.APHASIA_BLUE,
        fontSize: 22,
        paddingVertical: 14,
        fontWeight:'normal'
    },

});
