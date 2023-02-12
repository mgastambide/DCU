import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Modal, Text, TouchableOpacity, ImageBackground,
    Animated, Vibration, PermissionsAndroid} from 'react-native';
import {EventRegister} from "react-native-event-listeners";
import {Icon} from "react-native-elements";
import Sound from 'react-native-sound';

export default class ExampleSound extends React.Component {

    _isMounted = false;

    constructor(properties) {
        super(properties);

        this.state = {
            sound: {},
            isLoop: false,
        };
    }

    async componentWillMount() {

        this._isMounted = true;

        Sound.setCategory('Playback', true); // true = mixWithOthers

        const sound = new Sound(require('./assets/sounds/call_2_ringtone_iupi.mp3'), '', error => {
            if (error) {
                console.log('error sound', error.message);
            }
        });

        this.setState({ sound });

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _play = () => {
        if(this.state.sound !== undefined){
            this.state.sound.play(() => {
                this.state.sound.release();
            });
        }
    };

    _stop = () => {
        if(this.state.sound !== undefined) {
            this.state.sound.stop()
        }
    };

    enterNotification(){
        this._play();
    }

    accept_call(){
        this._stop();
    }

    render() {
        return(
            <View style={styles.container}/>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
