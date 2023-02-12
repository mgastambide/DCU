import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from "../constants/Colors";
import Config from "../constants/Config";
import {Avatar, Icon} from "react-native-elements";
import {NavigationActions} from "react-navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners'
import Sound from 'react-native-sound';

let fail_answer = '';
export default class DrawerScreen extends React.Component {

    state = {
        user: {},
        token:false,
        avatarSource: null,
        is_muted: 'false'
    };

    async load(){

        //const userToken = await AsyncStorage.getItem('@Token');
        const is_muted = await AsyncStorage.getItem('@Is_muted');
        if(is_muted){
            this.setState({is_muted})
        }

        /* if(userToken) {
            Config.apiPostToken('me')
            .then((user) => {
                    this.setState({
                        user,
                        token: true
                    });
            })
            .catch(Config.apiCatchErrors.bind(this));
        } */

    }

    UNSAFE_componentWillMount() {

        this.load();

        this.listener = EventRegister.addEventListener('updateProfile', () => {
            this.load();
        })

        fail_answer = new Sound(require('../assets/sound/fail_answer.mp3'))
        this.isMuted('false');
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    onPressRow(row){

        const navigateActionConsults = NavigationActions.navigate({
            routeName: 'Consults',
            action: NavigationActions.navigate({ routeName: 'Consults' }),
        });

        switch (row) {
            case 'Inicio': this.props.navigation.popToTop(); break;
            case 'Logros': this.props.navigation.navigate('Achievements'); break;
            case 'Perfil': this.props.navigation.navigate('MyProfile'); break;
            default: this.props.navigation.navigate('App');
        }
    }

    async pressLogOut() {
        try {
            await AsyncStorage.removeItem('@Token')
                .then(()=> this.props.navigation.navigate('AuthLoading'));

            return true;
        }
        catch(exception) {
            return false;
        }
    }

    async isMuted(is_muted){
        this.setState({is_muted})
        await AsyncStorage.setItem('@Is_muted', is_muted);
        EventRegister.emit('updateProfile');
        if(is_muted){
            if(is_muted === 'true'){
                fail_answer.setSystemVolume(0)
            }else{
                fail_answer.setSystemVolume(0.75)
            }
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={[styles.top, {backgroundColor: Colors.APHASIA_GREY3}]}>

                    <Avatar style={styles.avatar} rounded
                            source={require('../assets/images/icon_2.jpg')}
                    />

                    <View style={styles.nameAndCompany}>
                        <Text style={styles.name}>{this.state.token ? this.state.user.first_name : 'Anomia App'}</Text>
                        <Text style={[styles.name, {fontWeight:'100'}]}>{this.state.token ? (this.state.user.role_id === 3) ? 'Estudiante' : 'Terapeuta/Tutor' : 'Opciones'}</Text>
                    </View>
                </View>

        <TouchableOpacity
            style={styles.row}
            onPress={()=> this.isMuted((this.state.is_muted === 'false') ? 'true' : 'false')}
        >
            <Icon style={styles.icon} color={Colors.APHASIA_GREY3}
                name={(this.state.is_muted === 'true') ? 'volume-mute' : 'volume-up'}
                type='font-awesome-5'
            />
            <Text style={[styles.rowText, {color: Colors.APHASIA_GREY3}]}>
                {(this.state.is_muted === 'true') ? 'Sonido desactivado' : 'Sonido Activado'}
            </Text>
        </TouchableOpacity>

                {/* <TouchableOpacity style={styles.row} onPress={() => this.onPressRow('Inicio')}>
                    <Icon name='home' type={'font-awesome'} color={Colors.APHASIA_GREY3} style={20}/>
                    <Text style={[styles.rowText, {color: Colors.APHASIA_GREY3}]}>Inicio</Text>
                </TouchableOpacity> */}

                {/* {
                    (this.state.user.role_id === 3)
                    ?
                    <TouchableOpacity style={styles.row} onPress={() => this.onPressRow('Logros')}>
                        <Icon name='trophy' type={'font-awesome'} color={Colors.APHASIA_GREY3} style={20}/>
                        <Text style={[styles.rowText, {color: Colors.APHASIA_GREY3}]}>Mis logros</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.row} onPress={() => this.onPressRow('Logros')}>
                        <Icon name='users' type={'font-awesome'} color={Colors.APHASIA_GREY3} style={20}/>
                        <Text style={[styles.rowText, {color: Colors.APHASIA_GREY3}]}>Alumnos</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity style={styles.row} onPress={() => this.onPressRow('Perfil')}>
                    <Icon name='user' type={'font-awesome'} color={Colors.APHASIA_GREY3} style={20}/>
                    <Text style={[styles.rowText, {color: Colors.APHASIA_GREY3}]}>Mi Perfil</Text>
                </TouchableOpacity> */}

                {
                    this.state.token &&
                    <TouchableOpacity style={styles.row} onPress={this.pressLogOut.bind(this)}>
                        <Icon name='exit-to-app' color={Colors.APHASIA_GREY3} />
                        <Text style={[styles.rowText, {color: Colors.APHASIA_GREY3}]}>Cerrar sesión</Text>
                    </TouchableOpacity>
                }


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    avatar: {
        margin: 10,
        height: 70,
        width: 70,
    },

    container: {
        flex: 1,
        backgroundColor: Colors.APHASIA_WHITE,
    },

    name: {
        color: Colors.APHASIA_WHITE,
        fontWeight: 'bold',
        fontSize:18
    },

    company: {
        color: Colors.APHASIA_WHITE
    },

    top: {
        flexDirection: 'row',
        backgroundColor: Colors.APHASIA_GREY3_LIGHT,
        paddingTop:30,
        paddingBottom: 15,
        alignItems: 'center'
    },

    row: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.APHASIA_GREY2,
        alignItems: 'center'
    },

    rowText: {
        color: Colors.APHASIA_GREY3,
        fontWeight: 'bold',
        marginLeft: 10
    },

    subRow: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.APHASIA_GREY2,
        alignItems: 'center',
        marginLeft: 20
    },

    nameAndCompany:{
        flex:1
    }

});
