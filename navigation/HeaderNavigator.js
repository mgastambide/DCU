import * as React from 'react';
import {
    View, Text,
    StyleSheet, Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../constants/Colors';
import {Icon} from 'react-native-elements';

export default class HeaderNavigator extends React.Component {

    UNSAFE_componentWillMount() {

    }

    _headerComponent = () => <Text style={styles.title}>Elige una categoria</Text>;

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <Icon name="menu" color={Colors.APHASIA_GREY3} onPress={ () => this.props.open()} size={35}/>
                {/* <Icon name="menu" color={Colors.APHASIA_GREY3} onPress={ () => this.props.open()} size={35}/> */}
                <View style={{flexDirection: 'row'}}>
                    <Image source={require('../assets/images/puzzle_transparent.png')} style={styles.image} />
                    <Image source={require('../assets/images/head_transparent.png')} style={styles.image} />
                </View>
                <Icon name="menu" color={'transparent'} size={35}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.APHASIA_GREY2,
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
        flexWrap: 'wrap',
        ...Colors.shadowBox
    },
    image:{
        width: 25,
        height: 45,
        resizeMode: 'contain'
    }
});
