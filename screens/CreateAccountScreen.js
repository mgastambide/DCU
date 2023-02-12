import React from 'react';
import {
    Text,
    View,
    TextInput,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, ScrollView, StyleSheet,
} from 'react-native';

import WhiteButton from "../components/WhiteButton";
import Colors from "../constants/Colors";
//import CheckBox from '@react-native-community/checkbox';

export default class CreateAccountScreen extends React.Component {

    state = {
        first_name:   '',
        last_name:   '',
        password: '',
        email: '',
        tutor: '',
        user:{},
        rewards:{},
        loadingRefresh: false,
        loading: false,
        error:'',
        from_welcome: false,
        checked: false,
        is_tutor: false,
    };

    static navigationOptions = {
        headerShown: false
    };

    async UNSAFE_componentWillMount() {

        let from_welcome = this.props.navigation.getParam('from_welcome');
        (from_welcome) && this.setState({from_welcome});

    }

    onPressCreateAccount() {
        this.props.navigation.navigate('App')
    }

    render() {
        return(
            <ImageBackground source={require('../assets/images/background-app-white.jpg')} style={styles.containerImageBackground}>
                <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>

                    {this.state.loading && <ActivityIndicator animating={this.state.loading} style={{marginVertical: Dimensions.get('window').height}}/>}

                    <KeyboardAvoidingView style={styles.item} behavior="height">
                        <ScrollView>

                            <View style={{alignItems:'center', justifyContent:'center', flexDirection: 'row'}}>
                                <Image source={require('../assets/images/puzzle_transparent.png')} style={{width: 20, height: 75, resizeMode: 'contain'}} />
                                <Image source={require('../assets/images/head_transparent.png')} style={{width: 50, height: 75, resizeMode: 'contain'}} />
                            </View>

                            <Text style={styles.titleSlider} numberOfLines={0}>
                                Vamos a crear tu cuenta!
                            </Text>

                            <TextInput  placeholder="Nombre/s*"
                                        style={styles.textInput}
                                        value={this.state.first_name}
                                        onChangeText={(first_name) => this.setState({first_name})}
                                        placeholderTextColor={Colors.APHASIA_WHITE}
                                        textContentType={'givenName'}
                            />

                            <TextInput  placeholder="Apellido/s*"
                                        style={styles.textInput}
                                        value={this.state.last_name}
                                        onChangeText={(last_name) => this.setState({last_name})}
                                        placeholderTextColor={Colors.APHASIA_WHITE}
                                        textContentType={'familyName'}
                            />

                            <TextInput  placeholder="Email*"
                                        style={styles.textInput}
                                        value={this.state.email}
                                        onChangeText={(email) => this.setState({email})}  keyboardType={'email-address'}
                                        placeholderTextColor={Colors.APHASIA_WHITE}
                                        textContentType={'emailAddress'}
                                        autoCapitalize="none"
                            />

                            <TextInput
                                style={styles.textInput}
                                value={this.state.password}
                                onChangeText={(password) => this.setState({password})}
                                placeholder="Contraseña*"
                                placeholderTextColor={Colors.APHASIA_WHITE}
                            />

                            <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', paddingBottom:10}} onPress={() => this.setState({is_tutor: !this.state.is_tutor, checked:false})}>
                                {/* <CheckBox
                                    value={this.state.is_tutor}
                                    onValueChange={() => this.setState({is_tutor: !this.state.is_tutor, checked:false})}
                                    style={{padding:0, margin:0}}
                                    tintColors={{ true: Colors.APHASIA_RED, false: Colors.APHASIA_GREY3 }}
                                /> */}
                                <Text style={{color:Colors.APHASIA_WHITE, fontSize:16}}>Soy Terapeuta o Tutor</Text>
                            </TouchableOpacity>

                            {
                            (!this.state.is_tutor) &&
                            <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', paddingBottom:10}} onPress={() => this.setState({checked: !this.state.checked})}>
                                {/* <CheckBox
                                    value={this.state.checked}
                                    onValueChange={() => this.setState({checked: !this.state.checked})}
                                    style={{padding:0, margin:0}}
                                    tintColors={{ true: Colors.APHASIA_RED, false: Colors.APHASIA_GREY3 }}
                                /> */}
                                <Text style={{color:Colors.APHASIA_WHITE, fontSize:16}}>¿Tiene un terapeuta/tutor?</Text>
                            </TouchableOpacity>
                            }
                            

                            {
                                this.state.checked &&
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.tutor}
                                    onChangeText={(tutor) => this.setState({tutor})}
                                    placeholder="Email de tu terapeuta/tutor" keyboardType={'email-address'}
                                    placeholderTextColor={Colors.APHASIA_WHITE}
                                />
                            }

                            <View style={styles.containerButton}>

                                {
                                    this.state.error !== '' &&
                                    <View style={[styles.errorContainerMessage, styles.containerError]}>
                                        <Text style={styles.errorMessage}>{this.state.error}</Text>
                                    </View>
                                }

                                <WhiteButton callback={this.onPressCreateAccount.bind(this)} value={'Crear mi cuenta'} style={{width:'100%'}}/>

                                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')} >
                                    <Text style={styles.secondaryText}>
                                        Iniciar sesión
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{paddingBottom:15}} onPress={ () => this.props.navigation.navigate('Welcome') } >
                                    <Text style={styles.secondaryText}>
                                        Volver
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    containerMessageAndButtons:{
        paddingVertical: 15
    },
    errorContainerMessage:{
        backgroundColor:'red',
        paddingVertical:5,
        paddingHorizontal:15,
        justifyContent:'center',
        marginHorizontal:15,
        borderRadius:8
    },
    errorMessage:{
        color:Colors.APHASIA_WHITE,
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold'
    },
    containerImageBackground:{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.APHASIA_BLUE_LIGHT,
        justifyContent: 'center',
        alignItems:'center',
        padding: 15
    },
    item: {
        minHeight: 260,
        backgroundColor:'rgba(0,0,0,0.2)',
        borderRadius:8,
        height:'auto',
        width: Dimensions.get('window').width - 30,
        padding:15,
        marginVertical:15
    },
    titleSlider:{
        fontSize:16,
        fontWeight: 'bold',
        paddingVertical:12,
        color:Colors.APHASIA_WHITE,
        textAlign:'center',
    },
    textInput:{
        borderWidth:1,
        borderColor:Colors.APHASIA_WHITE,
        padding:10,
        borderRadius:5,
        width: Dimensions.get('window').width - 80,
        fontSize:17,
        color: Colors.APHASIA_WHITE,
        marginBottom:20,
        marginLeft:10,
    },
    login:{
        marginHorizontal:15,
        marginBottom:10,
        backgroundColor:Colors.APHASIA_BLUE,
        paddingVertical:10,
        paddingHorizontal:40,
        borderRadius:5
    },
    containerButton:{
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10
    },
    containerError:{
        marginBottom:5,
        width:'100%'
    },
    secondaryText:{
        color:Colors.APHASIA_WHITE,
        fontWeight:'bold',
        fontSize:16,
        paddingTop:5,
        paddingBottom:15,
        textDecorationLine:'underline',
    }

});
