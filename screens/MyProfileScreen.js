import React from 'react';
import {Text, ScrollView, StyleSheet, View, ImageBackground, TouchableOpacity} from 'react-native';
import Config from "../constants/Config";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTitle from "../components/ProfileTitle";
import ProfileDataRow from "../components/ProfileDataRow";
import Colors from "../constants/Colors";
import SecondaryButton from "../components/SecondaryButton";
import ProfileEditDataRow from "../components/ProfileEditDataRow";
import stylesError from '../constants/ErrorStyles';
import {EventRegister} from "react-native-event-listeners";
import ActivityLoader from "../components/ActivityLoader";
import ButtonWithLoader from "../components/ButtonWithLoader";
import HeaderNavigator from '../navigation/HeaderNavigator';
import {Icon} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MyProfileScreen extends React.Component {

    _isMounted = false;

    static navigationOptions = {
        headerShown: null
    }

    state = {
        loading: true,
        status:false,
        user: [],
        picture: require('../assets/images/icon.jpg'),
        photo: '',
        name: 'Invitado',
        isLogin: true,
        showPencilEdit: false,
        editAvailable:false,
        firstNameEdit: '',
        lastNameEdit: '',
        bioEdit: '',
        dateEdit: '',
        phoneEdit: '',
        emailEdit: '',
        nivelEdit:'Principiante',
        provinceEdit: 'Seleccioná una Provincia',
        cityEdit: 'Primero seleccioná una Provincia',
        cityIDEdit: '',
        countryEdit: '',
        countries: [{id:0, name:'Argentina'}],
        provinces_ready: false,
        provinces: [],
        province: 'Seleccioná una Provincia',
        province_id: null,
        cities: [],
        city_id: null,
        error:'',
    };

    UNSAFE_componentWillMount() {
        this._isMounted = true;
        this.load();

        this.listener = EventRegister.addEventListener('updateProfile', () => {
            this.load();
        });

        Config.apiGet('provinces')
            .then((provinces) => {
                this.setState({provinces});
            })
            .catch(Config.apiCatchErrors.bind(this));
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener);
        this._isMounted = false;
    }

    load = () => {
        Config.apiPostToken('me')
            .then((user) => {
                if (this._isMounted) {
                    this.setState({
                        user,
                        name: user.first_name + " " + user.last_name,
                        firstNameEdit: user.first_name,
                        lastNameEdit: user.last_name,
                        bioEdit: user.bio,
                        dateEdit: user.date_of_birth,
                        phoneEdit: user.phone,
                        photo: user.photo,
                        emailEdit: user.email,
                        countryEdit: user.country,
                        loading: false,
                        isLogin: false,
                        showPencilEdit: true,
                    });
                    if(user.city){
                        Config.apiGet('provinces/'+user.city.province.id)
                            .then((cities) => {
                                this.setState({
                                    cities,
                                    provinceEdit: user.city.province.name,
                                    province_id: user.city.province.id,
                                    city_id: user.city.id,
                                    cityEdit: user.city.name,
                                })
                            })
                            .catch(Config.apiCatchErrors.bind(this));
                    }

                }
            })
            .catch(Config.apiCatchErrors.bind(this));
    };

    onPressConfirm = () => {
        this.setState({status: true});
        Config.apiPostToken('update-account',{
            first_name: this.state.firstNameEdit,
            last_name: this.state.lastNameEdit,
            date_of_birth: this.state.dateEdit,
            bio: this.state.bioEdit,
            email: this.state.emailEdit,
            phone: this.state.phoneEdit,
            city_id: this.state.city_id,
            country: 'Argentina',
        }).then((res) => {
            this.load();
            this.toggleEdition();
            this.setState({showPencilEdit:true});
            EventRegister.emit('updateProfile');
            EventRegister.emit('updateHeaderUser');
        }).catch(Config.apiCatchErrors.bind(this));

        this.ScrollToTopWithDelay();
    };

    updateLocalState(fill, value){
        this.setState({ [fill]: value });
    }

    selectProvince(fill, value){
        this.setState({province_id: value.id, provinceEdit: value.name, cityEdit:'Cargando...'});
        Config.apiGet('provinces/'+value.id)
            .then((cities) => {
                this.setState({cityEdit:'Seleccioná una ciudad', cities})
            })
            .catch(Config.apiCatchErrors.bind(this));
    }

    selectCity(fill, value){
        this.setState({city_id: value.id, cityEdit: value.name})
    }

    ScrollToTopWithDelay=()=> {
        setTimeout(() => {
            this.scroll.scrollTo({y: 0});
            this.setState({status:false})
        }, 1000);
    };

    ScrollToTopWithLessDelay=()=> {
        setTimeout(() => {
            this.scroll.scrollTo({y: 0});
            this.setState({status:false})
        }, 500);
    };

    toggleEdition = () => {
        this.setState({ editAvailable: !this.state.editAvailable });
        if(!this.state.editAvailable === true){
            this.setState({showPencilEdit:false})
        }else{

            this.state.user.city
            ? this.setState({
                    provinceEdit:this.state.user.city.province.name,
                    cityEdit: (this.state.user.city.name !== undefined) ? this.state.user.city.name : '',
                    showPencilEdit:true
            })
            : this.setState({showPencilEdit:true});

            this.ScrollToTopWithLessDelay();
        }
    };

    async pressLogOut() {
        console.log('Quieo cerrar')
        await AsyncStorage.removeItem('@Token')
        this.props.navigation.navigate('AuthLoading');
    }

    render() {

        // let phone = (this.state.user.phone)
        //     ? <ProfileDataRow title='Teléfono' data={this.state.user.phone} icon='phone' url={'tel:' + this.state.user.phone}/>
        //     : null;

        let email = (this.state.user.email)
            ? <ProfileDataRow title='Email' data={this.state.user.email} icon='envelope' url={'mailto:' + this.state.user.email}/>
            : null;

        let city = (this.state.user.city && this.state.user.city.name !== undefined && this.state.user.city.province.name !== undefined && this.state.user.country !== undefined)
            ? <ProfileDataRow title='Ubicación' data={this.state.user.city.name + ', ' + this.state.user.city.province.name + ', ' + this.state.user.country}
                              icon='map' url={this.state.user.city}
              />
            : null;

        return (
            <ImageBackground source={require('../assets/images/background-app-white.jpg')} style={styles.containerImageBackground}>
                <HeaderNavigator open={() => this.props.navigation.openDrawer()}/>
                <ScrollView style={styles.container} ref={(c) => {this.scroll = c}}>
                {
                    this.state.loading
                    ? <ActivityLoader status={this.state.loading} />
                    :
                    <View style={{marginVertical: 30}}>

                            <ProfileHeader style={{marginBottom: 15}} name={this.state.name} user={this.state.user} title={this.state.user.role_id} image={this.state.photo} isLoading={this.state.isLogin}/>

                            <ProfileTitle style={{marginBottom: 10}} text={'Info'} edit={this.state.showPencilEdit} callback={this.toggleEdition}/>

                            { !this.state.editAvailable
                                ?

                                <View>

                                    {email}

                                    {city}

                                    {
                                        (this.state.user.role_id === 3) &&
                                        <ProfileDataRow title='Nivel' data={'Principiante'} icon='star' url={null}/>
                                    }

                                    {
                                        (this.state.user.email) ?
                                        <TouchableOpacity onPress={this.pressLogOut.bind(this)} style={{paddingVertical:30, flexDirection:'row', alignItems:'center'}}>
                                            <Icon name='exit-to-app' color={Colors.APHASIA_GREY3} size={25} containerStyle={{marginLeft:15}} />
                                            <Text style={styles.logout}>
                                                Cerrar sesión
                                            </Text>
                                        </TouchableOpacity>
                                        : <Text style={{paddingBottom:20, fontSize:18, paddingHorizontal:15}}>
                                            Para poder seleccionar un nivel, cambiar avatar y utilizar más funciones, por favor inicie sesión o cree una cuenta.
                                        </Text>
                                    }


                                </View>

                                :

                                <View>

                                    <Text style={{color: Colors.IUPI_GREY1, paddingBottom:10, paddingLeft:20}}>(*) campos obligatorios</Text>

                                    <ProfileEditDataRow title='Nombre/s*' fill='firstNameEdit' data={this.state.user.first_name} icon='edit' callback={this.updateLocalState.bind(this)} />

                                    <ProfileEditDataRow title='Apellido/s*' fill='lastNameEdit' data={this.state.user.last_name} icon='edit' callback={this.updateLocalState.bind(this)} />

                                    <ProfileEditDataRow title='Email' fill='emailEdit' data={this.state.user.email} icon='edit' callback={this.updateLocalState.bind(this)} keyboardType={'email-address'} editable={false}/>

                                    {/* <ProfileEditDataRow title='Teléfono' fill='phoneEdit' data={this.state.user.phone} icon='edit' callback={this.updateLocalState.bind(this)} keyboardType={'phone-pad'} editable={false}/> */}

                                    {
                                        this.state.user.role_id === 2 ?
                                        <>
                                            <ProfileEditDataRow title={'Contanos sobre vos*'} fill='bioEdit' data={this.state.user.bio} icon='edit' callback={this.updateLocalState.bind(this)} style={{height:100}} multiline={true} maxLength={700}/>

                                            {/* <ProfileEditDateDataRow title='Fecha de nacimiento' fill='dateEdit' data={this.state.user.date_of_birth} icon='edit' callback={this.updateLocalState.bind(this)} editable={false}/> */}


                                            <ProfileEditDataRow title='País' fill='countryEdit'
                                                                data={this.state.user.country} icon='edit' callback={this.updateLocalState.bind(this)} options={this.state.countries}
                                            />

                                            <ProfileEditDataRow title='Provincia' fill='provinceEdit'
                                                                data={this.state.provinceEdit} icon='edit'
                                                                callback={this.selectProvince.bind(this)} options={this.state.provinces}
                                            />

                                            <ProfileEditDataRow title='Ciudad' fill='cityEdit'
                                                                data={this.state.cityEdit} icon='edit'
                                                                callback={this.selectCity.bind(this)} options={this.state.cities}
                                            />
                                            
                                        </>
                                        :
                                        <ProfileEditDataRow title='Nivel' fill='nivelEdit'
                                                                data={this.state.nivelEdit} icon='edit'
                                                                callback={()=> null} options={[{id:0, name:'Principiante'}, {id:1, name:'Intermedio'}, {id:2, name: 'Experto'}]}
                                            />
                                    }

                                    <View style={stylesError.containerMessageAndButtons}>
                                        {
                                            this.state.error !== '' &&
                                            <View style={stylesError.errorContainerMessage}>
                                                <Text style={stylesError.errorMessage}>{this.state.error}</Text>
                                            </View>
                                        }

                                        <ButtonWithLoader value='Guardar' style={stylesError.buttonConfirm} callback={this.onPressConfirm.bind(this)} status={this.state.status} />
                                        <SecondaryButton value='Cancelar' style={stylesError.buttonCancel} callback={this.toggleEdition} />
                                    </View>

                                </View>

                            }

                            {
                                this.state.isLogin &&
                                    <View style={{flex:1, padding:15}}>
                                        <SecondaryButton value={'Iniciar sesión'} callback={() => this.props.navigation.navigate('Login', {route: 'MyProfile', iComeFromMyProfile: true})} />
                                        <ButtonWithLoader value='Crear cuenta' style={stylesError.buttonConfirm} callback={() => this.props.navigation.navigate('Register', {route: 'MyProfile'})} status={this.state.status} style={[styles.touchableOpacity]} />
                                    </View>
                            }

                        </View>
                }
                </ScrollView>
            </ImageBackground>
        );
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
    logout:{
        color: Colors.CHALLENGE_GREY,
        fontSize:15,
        fontWeight:'bold',
        paddingLeft:7,
        flex:1,
        flexWrap: 'wrap'
    },
});
