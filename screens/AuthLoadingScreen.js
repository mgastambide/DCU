import React from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    UNSAFE_componentWillMount() {

    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('@Token');

        if(userToken){
            this.props.navigation.navigate('App');
        }else {
            this.props.navigation.navigate('Auth');
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <ImageBackground source={require('../assets/images/background-app-white.jpg')} style={styles.containerImageBackground}>
                <ActivityIndicator color={'grey'}/>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    containerImageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:100
    },
});
