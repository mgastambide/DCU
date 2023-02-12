import React from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../constants/Config';

export default class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('@Token');

        if(userToken){
            Config.apiPostToken('me')
            .then((user) => {
                this.props.navigation.navigate('App')
                if(user.role_id === 3){
                    this.props.navigation.navigate('App');
                }else{
                    this.props.navigation.navigate('Therapist');
                }
            })
            .catch(Config.apiCatchErrors.bind(this));
           
        }else {
            this.props.navigation.navigate('App');
            // this.props.navigation.navigate('Auth');
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
