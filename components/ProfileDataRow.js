import React from 'react'
import { Linking, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Icon } from 'react-native-elements'
import Colors from "../constants/Colors";

export default class ProfileDataRow extends React.Component {


    onPress(){
        if(this.props.url && Linking.canOpenURL(this.props.url)){
            Linking.openURL(this.props.url);
        }
    }

    render(){
        return (
            <TouchableHighlight underlayColor={Colors.IUPI_GREY3} onPress={this.props.icon === 'map' ? ()=>null : this.onPress.bind(this)}>
                <View style={styles.wrapper}>

                    <View style={styles.leftSide}>
                        <Icon style={styles.icon} color={Colors.IUPI_SKY} name={this.props.icon} type='font-awesome' />
                        <Text style={styles.pipe}>|</Text>
                    </View>

                    <View style={styles.rightSide}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={[styles.data, {textTransform: (this.props.icon === 'map') ? 'capitalize' : 'none'}]}>
                            {this.props.data}
                        </Text>
                    </View>

                </View>
            </TouchableHighlight>

        );
    }

}

const styles = StyleSheet.create({

    data: {
        color: Colors.APHASIA_GREY1,
        fontWeight: 'bold',
        flex:1,
    },

    icon: {
        flex: 1,
    },

    leftSide: {
        flexDirection: 'row',
        marginLeft: 5,
        width: 40,
        justifyContent: 'flex-end'
    },

    pipe: {
        marginLeft: 10,
        fontSize: 20
    },

    rightSide: {
        flexDirection: 'column',
        marginLeft: 10,
        flex:1
    },

    title: {
        marginBottom: 5,
        color: Colors.APHASIA_GREY1,
        fontWeight: 'bold'
    },

    wrapper: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.APHASIA_GREY3,
        paddingVertical: 10,
        marginHorizontal: 15,
    },
});
