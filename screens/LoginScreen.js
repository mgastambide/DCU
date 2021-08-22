import React from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import WhiteButton from '../components/WhiteButton';
import Config from '../constants/Config';

export default class LoginScreen extends React.Component {
  state = {
    image: require('../assets/images/background-app-white.jpg'),
    user: {},
    rewards: {},
    loadingRefresh: false,
    loading: false,
    userName: '',
    placeholderUserName: 'email@ejemplo.com',
    from_welcome: false,
    from_app: false,
    from_membership: false,
    error: '',
    password: '',
  };

  async UNSAFE_componentWillMount() {
    let program_id = await AsyncStorage.getItem('@Program_id');
  }

  static navigationOptions = {
    headerShown: false,
  };

  handleInputChange = (userName) => {
    this.setState({userName});
  };

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({
        error: 'Por favor ingrese una dirección de correo electronico valida.',
      });
      setTimeout(() => {
        this.setState({error: ''});
      }, 2000);
      return false;
    } else {
      this.props.navigation.navigate('App', {userName: this.state.userName});
    }
  };

  onPressLogin() {
    this.setState({status: true});

    Config.apiPost('login', {email: this.state.userName, password:this.state.password})
        .then(async (user) => {
          await AsyncStorage.setItem('@Token', user.api_token);
          this.setState({status: false});
          if(user.role_id === 3){
            this.props.navigation.navigate('App');
          }else{
              this.props.navigation.navigate('Therapist');
          }

        })
        .catch(Config.apiCatchErrors.bind(this));
}

  render() {
    return (
      <ImageBackground
        source={this.state.image}
        style={styles.containerImageBackground}>
        {this.state.loading && (
          <ActivityIndicator
            animating={this.state.loading}
            style={{marginVertical: Dimensions.get('window').height}}
          />
        )}

        <KeyboardAvoidingView style={styles.item} behavior="padding">
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/images/puzzle_transparent.png')}
              style={{width: 20, height: 75, resizeMode: 'contain'}}
            />
            <Image
              source={require('../assets/images/head_transparent.png')}
              style={{width: 50, height: 75, resizeMode: 'contain'}}
            />
          </View>

          <Text style={styles.titleSlider} numberOfLines={0}>
            Ingrese su dirección de correo electronico
          </Text>

          <TextInput
            style={[styles.textInput, {textAlign: 'center'}]}
            value={this.state.userName}
            onChangeText={this.handleInputChange}
            placeholder={this.state.placeholderUserName}
            keyboardType={'email-address'}
            placeholderTextColor={Colors.APHASIA_WHITE}
            autoCapitalize={'none'}
          />

          <TextInput
            style={[styles.textInput, {textAlign: 'center'}]}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            placeholder={'********'}
            placeholderTextColor={Colors.APHASIA_WHITE}
            autoCapitalize={'none'}
            textContentType={'password'}
          />

          <View style={styles.containerButton}>
            {this.state.error !== '' && (
              <View
                style={[styles.errorContainerMessage, styles.containerError]}>
                <Text style={styles.errorMessage}>{this.state.error}</Text>
              </View>
            )}

            <WhiteButton
              callback={this.onPressLogin.bind(this)}
              value={'Iniciar sesión'}
              style={{
                width: '100%',
                backgroundColor:
                  this.state.userName.length < 5
                    ? Colors.APHASIA_GREY2
                    : Colors.APHASIA_WHITE,
                borderColor:
                  this.state.userName.length < 5
                    ? Colors.APHASIA_GREY3
                    : Colors.APHASIA_BLUE,
              }}
              styleText={{
                color:
                  this.state.userName.length < 5
                    ? Colors.APHASIA_GREY3
                    : Colors.APHASIA_BLUE,
              }}
            />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.secondaryText}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Welcome')}>
              <Text style={styles.secondaryText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  containerMessageAndButtons: {
    paddingVertical: 15,
  },
  errorContainerMessage: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 8,
  },
  errorMessage: {
    color: Colors.APHASIA_WHITE,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  containerImageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.APHASIA_BLUE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  item: {
    minHeight: 260,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    height: 'auto',
    width: Dimensions.get('window').width - 30,
    padding: 15,
    marginVertical: 15,
  },
  titleSlider: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 12,
    color: Colors.APHASIA_WHITE,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.APHASIA_WHITE,
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width - 80,
    fontSize: 17,
    color: Colors.APHASIA_WHITE,
    marginBottom: 20,
    marginLeft: 10,
  },
  login: {
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: Colors.APHASIA_BLUE,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  containerError: {
    marginBottom: 5,
    width: '100%',
  },
  secondaryText: {
    color: Colors.APHASIA_WHITE,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 15,
    textDecorationLine: 'underline',
  },
});
