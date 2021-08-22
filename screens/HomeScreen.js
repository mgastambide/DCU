import * as React from 'react';
import { Dimensions } from 'react-native';
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
        getWidth : '100%',
        getHeight: '100%',
        categories:[
            {
                id: '0',
                title: 'Emparejar',
                subtitle: 'sonido',
                icon: require('../assets/images/Icons/person_listening.png'),
                color: Colors.APHASIA_ORANGE,
                nav: 'Listening'
            },
            {
                id: '1',
                title: 'Elegi',
                subtitle: 'personaje',
                icon: require('../assets/images/Icons/persons_who_is_who.png'),
                color: Colors.APHASIA_YELLOW,
                nav: 'WhoIsWhoExercise'
            },
            {
                id: '2',
                title: 'Emparejar',
                subtitle: 'palabra',
                icon: require('../assets/images/Icons/person_group.png'),
                color: Colors.APHASIA_BLUE,
                nav: 'ToSelectExercise'
            },
            {
                id: '3',
                title: 'Uno',
                subtitle: 'sobra',
                icon: require('../assets/images/Icons/person_surplus.png'),
                color: Colors.APHASIA_PURPLE,
                nav: 'SurplusExercise'
            },
            {
                id: '4',
                title: 'Palabra',
                subtitle: 'Aislada',
                icon: require('../assets/images/Icons/person_isolated.png'),
                color: Colors.APHASIA_LIGHT_GREEN,
                nav: 'IsolatedExercise'
            },
        ]
    }

    UNSAFE_componentWillMount() {
        setTimeout(() =>{
                this.setState({loading: false})
            }, 1500
        )
        
        this.dimensionsScreen();

        Dimensions.addEventListener('change', this.dimensionsScreen)
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.dimensionsScreen);
    }
    
    dimensionsScreen = () => {
        this.setState({
            getWidth: Dimensions.get('window').width - 30,
            getHeight: Dimensions.get('window').height - 150
        });
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
                                <FlatList
                                    //ListHeaderComponent={this._headerComponent}
                                    data={this.state.categories}
                                    renderItem={({item}) => <Category category={item}
                                                                      redirect={(nav) => this.props.navigation.navigate(nav)}
                                    />}
                                    keyExtractor={item => item.id}
                                    numColumns={2}
                                    contentContainerStyle={[styles.contentArea, {minHeight: this.state.getHeight, width: this.state.getWidth, paddingTop:15}]}
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
        this.setState({active: !this.state.active})
        setTimeout(() => {
                this.setState({active: false})
                this.props.redirect(this.props.category.nav)
            }, 1000
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
                <Text style={styles.nameCategory}>
                    {this.props.category.subtitle}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    image:{
        width: 90,
        height: 90,
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
        width: '100%',
        flex:1
    },
    center:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        textAlign: 'center',
        fontSize: 25,
        paddingTop:15,
        paddingBottom: 10
    },
    contentArea:{
        justifyContent:'center'
    },
    nameCategory:{
        color: Colors.APHASIA_WHITE,
        fontSize: 14,
        textTransform: 'uppercase',
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
