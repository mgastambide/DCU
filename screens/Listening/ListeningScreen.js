import * as React from 'react';
import {
    View, Text, ImageBackground, ActivityIndicator, StyleSheet,
    FlatList, Image, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../constants/Colors';
import {Icon} from 'react-native-elements';
import HeaderNavigator from '../../navigation/HeaderNavigator';

export default class ListeningScreen extends React.Component {

    static navigationOptions = {
        headerShown: null
    }

    state={
        loading: true,
        categories:[
            {
                id: '0',
                title: 'Escuchar y elegir la palabra',
                icon: require('../../assets/images/Icons/boy_listening_one.png'),
                iconActive: require('../../assets/images/Icons/boy_listening_two.png'),
                color: Colors.APHASIA_ORANGE,
                nav: 'Listening'
            },
            {
                id: '1',
                title: 'Escuchar y elegir la imagen',
                icon: require('../../assets/images/Icons/girl_reading_one.png'),
                iconActive: require('../../assets/images/Icons/girl_reading_two.png'),
                color: Colors.APHASIA_YELLOW,
                nav: 'Listening'
            },
            {
                id: '2',
                title: 'Escuchar y elegir la letra',
                icon: require('../../assets/images/Icons/boy_spelling_one.png'),
                iconActive: require('../../assets/images/Icons/boy_spelling_two.png'),
                color: Colors.APHASIA_BLUE,
                nav: 'Listening'
            },
            {
                id: '3',
                title: 'Escuchar y escribir la palabra',
                icon: require('../../assets/images/Icons/boy_spelling_one.png'),
                iconActive: require('../../assets/images/Icons/boy_spelling_two.png'),
                color: Colors.APHASIA_RED,
                nav: 'Listening'
            },
        ]
    }

    UNSAFE_componentWillMount() {
        setTimeout(() =>{
                this.setState({loading: false})
            }, 2000
        )
    }

    _headerComponent = () => <Text style={styles.title}>Escuchando</Text>;

    // Render any loading content that you like here
    render() {
        return (
            <ImageBackground source={require('../../assets/images/background-app-white.jpg')} style={styles.containerImageBackground}>
                {
                    this.state.loading
                        ? <ActivityIndicator color={'grey'}/>
                        :
                        <View style={styles.container}>
                            <HeaderNavigator open={() => this.props.navigation.openDrawer()}/>
                            <FlatList
                                ListHeaderComponent={this._headerComponent}
                                data={this.state.categories}
                                renderItem={({item}) => <Category category={item}
                                                                  redirect={(nav) => this.props.navigation.navigate('ListeningExercise')}
                                />}
                                keyExtractor={item => item.id}
                                numColumns={2}
                                contentContainerStyle={styles.center}
                            />
                        </View>
                }
            </ImageBackground>
        );
    }
}

class Category extends React.Component {
    state={
        active: false
    }

    activeIcon(){
        this.setState({active: !this.state.active});
        setTimeout(() => {
                this.setState({active: false})
                this.props.redirect();
            }, 1500
        )
    }

    render() {
        return (
            <TouchableOpacity style={[styles.exercise, {backgroundColor: this.props.category.color}]}
                              onPress={this.activeIcon.bind(this)} activeOpacity={1}
            >
                <Icon name={(this.state.active) ? 'volume-up' : 'volume-down'} type={'font-awesome'} color={Colors.APHASIA_WHITE} size={50} />
                <Text style={styles.nameCategory}>
                    {this.props.category.title}
                </Text>
                {
                    this.state.active &&
                    <View style={styles.loading}>
                        <ActivityIndicator color={'white'}/>
                    </View>
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerImageBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    image:{
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    exercise:{
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    center:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        textAlign: 'center',
        fontSize: 25,
        paddingBottom: 10
    },
    safeAreaView:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameCategory:{
        color: Colors.APHASIA_WHITE,
        fontSize: 14,
        textTransform: 'uppercase',
        flexWrap: 'wrap',
        maxWidth: 100,
        textAlign: 'center',
        paddingTop:5
    },
    loading:{
        backgroundColor: 'rgba(0,0,0,.3)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 8,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    }
});
