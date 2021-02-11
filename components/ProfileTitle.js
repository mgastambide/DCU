import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import {Icon} from "react-native-elements";
import Colors from "../constants/Colors";

export default class ProfileTitle extends React.Component {

    render(){
        return(

            <View style={[styles.subtitle, this.props.style]}>
                <Text style={styles.subtitleText}>{this.props.text}</Text>
                {
                    this.props.edit &&
                    <TouchableHighlight activeOpacity={0} underlayColor={Colors.APHASIA_GREY3} style={styles.button} onPress={this.props.callback}>
                        <Icon name="edit" color={Colors.APHASIA_BLACK}  />
                    </TouchableHighlight>
                }
            </View>

        );
    }

}

const styles = StyleSheet.create({

    subtitle: {
        backgroundColor: Colors.IUPI_SKY2,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    subtitleText: {
        color: Colors.APHASIA_BLACK,
        fontWeight: 'bold',
        lineHeight: 24,
        paddingLeft: 20,
        paddingVertical: 5,
        textTransform: 'uppercase'
    },
    button: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 6
    },

});
