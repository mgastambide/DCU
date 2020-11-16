import React from 'react';
import {
    ActivityIndicator, Dimensions,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Sound from 'react-native-sound';
import Colors from '../../constants/Colors';
import {Icon} from 'react-native-elements';
import HeaderNavigator from '../../navigation/HeaderNavigator';

export default class ListeningExerciseScreen extends React.Component {

    static navigationOptions = {
        headerShown: null
    }

    _isMounted = false;

    constructor(properties) {
        super(properties);

        this.state = {
            sound: {},
            isLoop: false,
            words: [
                {
                    id: 0,
                    title: 'bicicleta',
                    sound: '../../assets/sounds/bicicleta.mp3',
                },
                {
                    id: 1,
                    title: 'paloma',
                    sound: '../../assets/sounds/paloma.mp3',
                },
                {
                    id: 2,
                    title: 'perro',
                    sound: '../../assets/sounds/perro.mp3',
                }
            ],
            letters: [
                {
                    id: 0,
                    title: 'm',
                    sound: '../../assets/sounds/m.mp3',
                },
                {
                    id: 1,
                    title: 'e',
                    sound: '../../assets/sounds/e.mp3',
                },
                {
                    id: 2,
                    title: 'g',
                    sound: '../../assets/sounds/g.mp3',
                }
            ],
            selectedItem: {},
            selected: '',
            border: Colors.APHASIA_GREY0,
            total_correct: 0,
            total_incorrect: 0,
        };
    }

    async UNSAFE_componentWillMount() {
        this._isMounted = true;

        let selectedItem = this.state.words[Math.floor(Math.random()*this.state.words.length)];
        this.setState({selectedItem})
        this.chargeSound(selectedItem.sound);
        let correct = this.props.navigation.getParam('correct');
        let incorrect = this.props.navigation.getParam('incorrect');
        (correct && incorrect) && this.setState({total_correct: correct, total_incorrect: incorrect});
    }

    chargeSound(soundSelected){

        Sound.setCategory('Playback', true); // true = mixWithOthers

        const bike = new Sound(require('../../assets/sounds/bicicleta.mp3'), '', error => {
            if (error) {
                console.log('error sound', error.message);
            }
        });

        const dog = new Sound(require('../../assets/sounds/perro.mp3'), '', error => {
            if (error) {
                console.log('error sound', error.message);
            }
        });

        const bird = new Sound(require('../../assets/sounds/paloma.mp3'), '', error => {
            if (error) {
                console.log('error sound', error.message);
            }
        });

        let itemSelected = '';
        switch (soundSelected){
            case '../../assets/sounds/bicicleta.mp3':
                itemSelected = bike;
                break;
            case '../../assets/sounds/perro.mp3':
                itemSelected = dog;
                break;
            default:
                itemSelected = bird;
                break;
        }

        this.setState({ sound: itemSelected });

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _play = () => {
        if(this.state.sound !== undefined){
            this.state.sound.play();
        }
    };

    _stop = () => {
        if(this.state.sound !== undefined) {
            this.state.sound.stop()
        }
    };

    _headerComponent = () => <View style={{paddingTop:20, width: Dimensions.get('window').width - 20}}>

        <Text style={{backgroundColor: Colors.APHASIA_GREY1, padding: 15, color: Colors.APHASIA_WHITE, textAlign: 'center',
            borderRadius:8, marginHorizontal:5
        }}>
            Total correctas: {this.state.total_correct} / Total incorrectas: {this.state.total_incorrect}
        </Text>

        {
            (this.state.selected === '') &&
            <View style={styles.containerImage}>
                <Image source={require('../../assets/images/Icons/boy_thinking.png')} style={styles.image} />
                <Text>
                    Presiona abajo para oir la palabra
                </Text>
            </View>
        }

        {
            (this.state.selected === 'correct') &&
            <View style={styles.containerImage}>
                <Image source={require('../../assets/images/Icons/boy_happy.png')} style={styles.image} />
                <Text style={{color: this.state.border}}>Muy bien!</Text>
            </View>
        }

        {
            (this.state.selected === 'bad') &&
            <View style={styles.containerImage}>
                <Image source={require('../../assets/images/Icons/boy_sad.png')} style={styles.image} />
                <Text style={{color: this.state.border}}>Ups, la elección es incorrecta!</Text>
            </View>
        }

        <TouchableOpacity onPress={() => this._play()} activeOpacity={1}
                          style={[styles.speaker, {borderColor: this.state.border}]}
        >
            <Icon name='volume-up' type={'font-awesome'}
                  color={(this.state.selected === '') ? Colors.APHASIA_WHITE : this.state.border} size={50}
            />
        </TouchableOpacity>

    </View>;

    _footerComponent = () =>  <View style={styles.buttons}>
        <TouchableOpacity onPress={() => null} style={styles.button}>
            <Icon name={'lightbulb-o'} type={'font-awesome'} size={20} color={Colors.APHASIA_WHITE} />
            <Text style={styles.textButton}>Ayuda</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.push('ListeningExercise', {correct: this.state.total_correct, incorrect: this.state.total_incorrect})}
                          style={[styles.button, {backgroundColor: Colors.APHASIA_LIGHT_GREEN}]}
        >
            <Icon name={'step-forward'} type={'font-awesome'} size={20} color={Colors.APHASIA_WHITE} />
            <Text style={styles.textButton}>Siguiente</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')} style={[styles.button, {backgroundColor: Colors.APHASIA_RED}]}>
            <Icon name={'times'} type={'font-awesome'} size={20} color={Colors.APHASIA_WHITE} />
            <Text style={styles.textButton}>Salir</Text>
        </TouchableOpacity>
    </View>

    clickItem(item){
        if(this.state.selectedItem.title === item.title){
            this.setState({selected: 'correct', border: Colors.APHASIA_LIGHT_GREEN, total_correct: this.state.total_correct + 1})
            setTimeout(() => {
                    this.setState({selected: '', border: Colors.APHASIA_GREY0})
                }, 5000
            )
        }else{
            this.setState({selected: 'bad', border: Colors.APHASIA_RED, total_incorrect: this.state.total_incorrect + 1})
            setTimeout(() => {
                    this.setState({selected: '', border: Colors.APHASIA_GREY0})
                }, 5000
            )
        }
    }

    render() {
        return(
            <ImageBackground source={require('../../assets/images/background-app-white.jpg')} style={styles.containerImageBackground}>
                <HeaderNavigator open={() => this.props.navigation.openDrawer()}/>
                <View style={styles.container}>
                    <FlatList
                        ListHeaderComponent={this._headerComponent}
                        data={this.state.words}
                        renderItem={({item}) => <Box category={item} callback={() => this.clickItem(item)}
                        />}
                        keyExtractor={item => item.id}
                        numColumns={3}
                        contentContainerStyle={styles.center}
                        ListFooterComponent={this._footerComponent}
                    />
                </View>
            </ImageBackground>
        );
    }
}

class Box extends React.Component {
    state={
        active: false
    }

    activeIcon(){
        this.setState({active: !this.state.active})
        setTimeout(() => {
                this.setState({active: false})
                this.props.callback()
            }, 1000
        )
    }

    render() {
        return (
            <TouchableOpacity style={styles.box}
                              onPress={this.activeIcon.bind(this)} activeOpacity={1}
            >
                <Text style={styles.nameCategory}>
                    {this.props.category.title}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerImageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box:{
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: Colors.APHASIA_BLUE
    },
    speaker:{
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: Colors.APHASIA_GREY0,
        borderWidth: 3
    },
    buttons:{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    button:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.APHASIA_ORANGE,
        borderRadius:8,
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton:{
        padding: 10,
        color: Colors.APHASIA_WHITE
    },
    containerImage:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width:150,
        height:150,
        resizeMode: 'contain',
        marginBottom: 5
    },
    center:{
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameCategory:{
        textTransform: 'capitalize',
        color: Colors.APHASIA_WHITE
    }
});
