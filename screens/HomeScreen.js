import * as React from 'react';
import {
    View, Text, ImageBackground, ActivityIndicator, StyleSheet,
    FlatList, Image, TouchableOpacity, StatusBar
} from 'react-native';
import Colors from '../constants/Colors';
import HeaderNavigator from '../navigation/HeaderNavigator';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        headerShown: null
    }

    state={
        loading: true,
        categories:[
            {
                id: '0',
                title: 'Escuchar',
                icon: require('../assets/images/Icons/person_listening.png'),
                color: Colors.APHASIA_ORANGE,
                nav: 'Listening'
            },
            {
                id: '1',
                title: '¿Quién es quién?',
                icon: require('../assets/images/Icons/persons_who_is_who.png'),
                color: Colors.APHASIA_YELLOW,
                nav: 'WhoIsWhoExercise'
            },
            {
                id: '2',
                title: 'Seleccionar',
                icon: require('../assets/images/Icons/person_group.png'),
                color: Colors.APHASIA_BLUE,
                nav: 'ToSelectExercise'
            },
            {
                id: '3',
                title: 'Sobra',
                icon: require('../assets/images/Icons/person_surplus.png'),
                color: Colors.APHASIA_BLUE,
                nav: 'SurplusExercise'
            },
        ]
    }

    UNSAFE_componentWillMount() {
        setTimeout(() =>{
                this.setState({loading: false})
            }, 1500
        )
    }

    _headerComponent = () => <Text style={styles.title}>Elija un ejercicio</Text>;

    // Render any loading content that you like here
    render() {
        return (
            <ImageBackground source={require('../assets/images/background-app-white.jpg')} style={styles.containerImageBackground}>
                <StatusBar barStyle={'dark-content'} translucent={false} backgroundColor={Colors.APHASIA_GREY2} animated />
                {
                    this.state.loading
                        ? <ActivityIndicator color={'grey'}/>
                        :
                        <View style={styles.container}>
                            <HeaderNavigator open={() => this.props.navigation.openDrawer()}/>
                            <View style={styles.safeAreaView}>
                                <FlatList
                                    ListHeaderComponent={this._headerComponent}
                                    data={this.state.categories}
                                    renderItem={({item}) => <Category category={item}
                                                                      redirect={(nav) => this.props.navigation.navigate(nav)}
                                    />}
                                    keyExtractor={item => item.id}
                                    numColumns={2}
                                    contentContainerStyle={styles.center}
                                />
                            </View>
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
        this.setState({active: !this.state.active})
        setTimeout(() => {
                this.setState({active: false})
                this.props.redirect(this.props.category.nav)
            }, 1500
        )
    }

    render() {
        return (
            <TouchableOpacity style={[styles.exercise, {backgroundColor: this.props.category.color}]}
                              onPress={this.activeIcon.bind(this)} activeOpacity={1}
            >
                <Image source={this.props.category.icon}
                       style={styles.image}/>
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
        width: 110,
        height: 110,
        resizeMode: 'contain',
        marginBottom:5
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
        textTransform: 'uppercase'
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
