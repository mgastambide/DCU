import React from 'react';
import {Alert, Text, Modal, ScrollView, StyleSheet, View, ImageBackground, Image, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import Config from "../constants/Config";
import Colors from "../constants/Colors";
import {Avatar} from 'react-native-elements';
import SecondaryButton from "../components/SecondaryButton";
import stylesError from '../constants/ErrorStyles';
import {EventRegister} from "react-native-event-listeners";
import ActivityLoader from "../components/ActivityLoader";
import ButtonWithLoader from "../components/ButtonWithLoader";
import HeaderNavigator from '../navigation/HeaderNavigator';
import AsyncStorage from '@react-native-community/async-storage';

export default class AchievementsScreen extends React.Component {

    _isMounted = false;

    static navigationOptions = {
        headerShown: null
    }

    state = {
        loading: true,
        status:false,
        isLogin: false,
        user:{},
        alumn:{},
        error:'',
        alumns:[
            {id: 0, name: 'Maximiliano E. Gastambide', age: '22', city: '9 de julio, Bs As', color: Colors.APHASIA_ORANGE, url:'https://thumbs.dreamstime.com/b/icono-masculino-del-avatar-en-estilo-plano-icono-masculino-del-usuario-avatar-del-hombre-de-la-historieta-91602735.jpg'},
            {id: 1, name:'Luciana Gancia', age: '8', city: 'Bragado, Bs As', color: Colors.APHASIA_YELLOW, url:'https://cdn1.iconfinder.com/data/icons/retro-4/512/_woman-512.png'},
            {id: 2, name:'Jaqueline Monzón', age: '11', city: 'La Plata, Bs As', color: Colors.APHASIA_BLUE, url:'https://www.shareicon.net/data/512x512/2016/08/18/810209_user_512x512.png'},
            {id: 3, name:'Nadia Valdez', age: '16', city: 'Punta Lara, Bs As', color: Colors.APHASIA_BLUE, url:'https://cdn2.iconfinder.com/data/icons/beautiful-and-sexy-women-avatar-with-different-hai/283/female-full-11-512.png'}
        ],
        visible: false
    };

    async UNSAFE_componentWillMount() {
        this._isMounted = true;
        const userToken = await AsyncStorage.getItem('@Token');
        if(userToken){
            Config.apiPostToken('me')
            .then((user) => {
                    this.setState({
                        user,
                        isLogin: true,
                        loading: false
                    });
            })
            .catch(Config.apiCatchErrors.bind(this));
        }else{
            setTimeout(()=>{this.setState({isLogin: false, loading: false});}, 1000)
        }
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener);
        this._isMounted = false;
    }

    openModalAlumn(alumn){
        this.setState({alumn, visible: true});
    }

    render() {

        return (
            <ImageBackground source={require('../assets/images/background-app-white.jpg')} style={styles.containerImageBackground}>
                <HeaderNavigator open={() => this.props.navigation.openDrawer()}/>
                <ScrollView style={styles.container} ref={(c) => {this.scroll = c}}>
                {
                    this.state.loading
                    ? <ActivityLoader status={this.state.loading} />
                    :
                    <View style={{marginVertical: 30}}>

                        {
                            (!this.state.isLogin) ?
                                <View style={{padding:15}}>
                                    <Text style={{paddingBottom:20, fontSize:18}}>Para poder acceder a un historico de sus logros y actividades, por favor inicie sesión o cree una cuenta.</Text>
                                    <SecondaryButton value={'Iniciar sesión'} callback={() => this.props.navigation.navigate('Login', {route: 'MyProfile', iComeFromMyProfile: true})} />
                                    <ButtonWithLoader value='Crear cuenta' style={stylesError.buttonConfirm} callback={() => this.props.navigation.navigate('Register', {route: 'MyProfile'})} status={this.state.status} style={[styles.touchableOpacity]} />
                                </View>
                                :<View style={{marginHorizontal:15, alignItems:'flex-start', justifyContent:'flex-start'}}>
                                    {
                                        (this.state.user.role_id === 3)
                                        ?
                                        <>
                                            <Image source={require('../assets/images/graph_app.png')} style={{width:'100%', resizeMode:'contain', maxHeight:350}} />
                                            <Text style={{fontSize:18, paddingTop:15}}>Ejercicio Preferido: <Text style={{fontWeight:'bold'}}>Seleccionar</Text></Text>
                                            <Text style={{fontSize:18, paddingTop:15}}>Racha semanal: <Text style={{fontWeight:'bold'}}>36 ejercicios</Text></Text>
                                        </>
                                        :
                                        <>
                                            <Text style={{fontSize: 30, paddingBottom: 15, fontWeight:'bold'}}>Alumnos</Text>
                                            <FlatList
                                                ListHeaderComponent={this._headerComponent}
                                                data={this.state.alumns}
                                                renderItem={({item}) => <Alumn alumn={item}
                                                                                callback={(alumn) => this.openModalAlumn(alumn)}
                                                />}
                                                keyExtractor={item => item.id}
                                                numColumns={1}
                                                contentContainerStyle={styles.center}
                                            />
                                            <TouchableOpacity style={[styles.alumn, {borderColor: Colors.APHASIA_BLACK}]}
                                                            onPress={() => Alert.alert('Agregar Alumno', 'Lo sentimos, esta función aún no esta completa.')} activeOpacity={1}
                                            >
                                                <Image source={{uri: 'https://img.icons8.com/cotton/2x/plus--v3.png'}}
                                                    style={styles.image}/>
                                                <View style={{paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
                                                    <Text style={styles.name}>
                                                        Agregar alumno
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </>
                                    }
                                    
                                </View>
                        }

                    </View>
                }
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => this.setState({visible:false})}
                >
                    <View style={styles.modal} >
                    <TouchableOpacity onPress={() => this.setState({visible: false})} style={[ styles.touchClose]}>
                            <Text style={styles.close}>
                                x
                            </Text>
                        </TouchableOpacity>

                        <ScrollView style={{padding: 15}}>
                            <View style={{paddingBottom:15, flexDirection: 'row'}}>
                                <Avatar style={styles.avatar} rounded source={{uri: this.state.alumn.url}}/>
                                <View style={{flexWrap:'wrap', paddingBottom:10}}>
                                    <Text style={{fontWeight:'bold'}}>{this.state.alumn.name}</Text>
                                    <Text style={{fontWeight:'bold'}}>{this.state.alumn.age} años</Text>
                                    <Text style={{fontWeight:'bold'}}>{this.state.alumn.city}</Text>
                                </View>
                            </View>
                            <Image source={require('../assets/images/graph_app.png')} style={{width:'100%', resizeMode:'contain', maxHeight:350}} />
                            <Text style={{fontSize:18, paddingTop:15}}>Ejercicio Preferido: <Text style={{fontWeight:'bold'}}>Seleccionar</Text></Text>
                            <Text style={{fontSize:18, paddingTop:15}}>Racha semanal: <Text style={{fontWeight:'bold'}}>36 ejercicios</Text></Text>
                        </ScrollView>
                    </View>
                </Modal>

            </ImageBackground>
        );
    }
}

class Alumn extends React.Component {
    state={
        active: false
    }

    activeIcon(){
        this.setState({active: !this.state.active})
        setTimeout(() => {
                this.setState({active: false})
                this.props.redirect(this.props.category.nav)
            }, 1500
        )
    }

    render() {
        return (
            <TouchableOpacity style={[styles.alumn, {borderColor: this.props.alumn.color}]}
                              onPress={() => this.props.callback(this.props.alumn)} activeOpacity={1}
            >
                <Image source={{uri: this.props.alumn.url}}
                       style={styles.image}/>
                <View style={{paddingHorizontal:15}}>
                    <Text style={styles.name}>
                        {this.props.alumn.name}
                    </Text>
                    <Text style={styles.detail}>
                        {this.props.alumn.age} años
                    </Text>
                    <Text style={styles.detail}>
                        {this.props.alumn.city}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
    },
    touchableOpacity:{
        marginTop:15,
    },
    containerImageBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    touchableOpacity:{
        marginTop:15,
    },
    alumn: {
        flexDirection: 'row',
        borderWidth:1,
        marginVertical:5,
        borderRadius:8,
        padding:10,
        width:'100%'
    },
    name:{
        fontSize: 16,
        fontWeight:'bold'
    },
    image:{
        width:50,
        height:50, 
        resizeMode: 'cover'
    },
    center:{
        width: Dimensions.get('window').width - 30
    },
    modal:{
        flex:1,
        backgroundColor: Colors.APHASIA_WHITE,
    },
    touchClose:{
        backgroundColor: Colors.APHASIA_GREY2,
        width: '100%'
    },
    close:{
        paddingVertical:10,
        paddingHorizontal:30,
        textAlign: 'right',
        fontSize: 30,
        color:Colors.APHASIA_WHITE,
    },
    avatar: {
        width: 80,
        height: 80,
        marginHorizontal: 20,
        borderWidth:1,
        borderColor: Colors.APHASIA_BLACK,
        borderRadius:8
    },
});
