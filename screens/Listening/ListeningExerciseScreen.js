import React from 'react';
import {
    BackHandler, Dimensions,
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
                    image: 'https://cdn1.iconfinder.com/data/icons/bikes-on-circle/256/circle_bike-cruiser-flyer-mens-circle-512.png'
                },
                {
                    id: 1,
                    title: 'paloma',
                    sound: '../../assets/sounds/paloma.mp3',
                    image: 'https://cdn.pixabay.com/photo/2012/04/12/12/36/pigeon-29841__340.png'
                },
                {
                    id: 2,
                    title: 'perro',
                    sound: '../../assets/sounds/perro.mp3',
                    image: 'https://seeklogo.com/images/B/black-dog-circle-logo-7032FEC424-seeklogo.com.png'
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
            idExercise: 0
        };
    }

    async UNSAFE_componentWillMount() {
        this._isMounted = true;
        let total_correct = this.props.navigation.getParam('total_correct');
        let total_incorrect = this.props.navigation.getParam('total_incorrect');
        let idExercise = this.props.navigation.getParam('idExercise');

        let selectedItem = this.state.words[Math.floor(Math.random()*this.state.words.length)];
        if(idExercise === '2'){
            selectedItem = this.state.letters[Math.floor(Math.random()*this.state.letters.length)];
            this.setState({words: this.state.letters})
        }

        (total_correct) && this.setState({total_correct});
        (total_incorrect) && this.setState({total_incorrect});
        (idExercise) && this.setState({idExercise});
        
        this.setState({selectedItem})
        this.chargeSound(selectedItem.sound, idExercise);

    }

    chargeSound(soundSelected, idExercise){

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

        const letter_m = new Sound(require('../../assets/sounds/m.mp3'), '', error => {
            if (error) {
                console.log('error sound', error.message);
            }
        });

        const letter_e = new Sound(require('../../assets/sounds/e.mp3'), '', error => {
            if (error) {
                console.log('error sound', error.message);
            }
        });

        const letter_g = new Sound(require('../../assets/sounds/g.mp3'), '', error => {
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
            case '../../assets/sounds/m.mp3':
                itemSelected = letter_m;
                break;
            case '../../assets/sounds/e.mp3':
                itemSelected = letter_e;
                break;
            case '../../assets/sounds/g.mp3':
                itemSelected = letter_g;
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
                <Text style={{fontSize:18, fontWeight: 'bold'}}>
                    Presiona abajo para oir la palabra
                </Text>
            </View>
        }

        {
            (this.state.selected === 'correct') &&
            <View style={styles.containerImage}>
                <Text style={{color: this.state.border, fontSize:16, fontWeight: 'bold'}}>Muy bien!</Text>
            </View>
        }

        {
            (this.state.selected === 'bad') &&
            <View style={styles.containerImage}>
                <Text style={{color: this.state.border, fontSize:16, fontWeight: 'bold'}}>Ups, la elección es incorrecta!</Text>
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

        <TouchableOpacity onPress={() => (this.state.words.length > 1) ? this.removeOneOptions() : null} style={[styles.button, {backgroundColor: (this.state.words.length > 1) ? Colors.APHASIA_ORANGE : Colors.APHASIA_GREY}]}
            activeOpacity={(this.state.words.length > 1) ? .8 : 1}
        >
            <Icon name={'lightbulb-o'} type={'font-awesome'} size={20} color={Colors.APHASIA_WHITE} />
            <Text style={styles.textButton}>Ayuda</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.push('ListeningExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise})}
                          style={[styles.button, {backgroundColor: Colors.APHASIA_LIGHT_GREEN}]}
        >
            <Icon name={'step-forward'} type={'font-awesome'} size={20} color={Colors.APHASIA_WHITE} />
            <Text style={styles.textButton}>Siguiente</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.popToTop()} style={[styles.button, {backgroundColor: Colors.APHASIA_RED}]}>
            <Icon name={'times'} type={'font-awesome'} size={20} color={Colors.APHASIA_WHITE} />
            <Text style={styles.textButton}>Salir</Text>
        </TouchableOpacity>

    </View>

    clickItem(item){
        if(this.state.selectedItem.title === item.title){
            this.setState({selected: 'correct', border: Colors.APHASIA_LIGHT_GREEN, total_correct: this.state.total_correct+1});
            setTimeout(() => {
                    this.props.navigation.push('ListeningExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise});
                }, 1000
            )
        }else{
            this.setState({selected: 'bad', border: Colors.APHASIA_RED, total_incorrect: this.state.total_incorrect + 1})
            setTimeout(() => {
                    this.setState({selected: '', border: Colors.APHASIA_GREY0})
                }, 5000
            )
        }
    }

    removeOneOptions(){
        let index = 0;
        let words = [...this.state.words]
        for (let i = 0; i < words.length; i++) {
            if(words[i].title !== this.state.selectedItem.title){
                index = words[i].id;
                break;
            }
        }
        let new_array = words.filter(item => item.id !== index);
        this.setState({words: new_array});
    }

    render() {
        return(
            <ImageBackground source={require('../../assets/images/background-app-white.jpg')} style={styles.containerImageBackground}>
                <HeaderNavigator open={() => this.props.navigation.openDrawer()}/>
                <View style={styles.container}>
                    <FlatList
                        ListHeaderComponent={this._headerComponent}
                        data={this.state.words}
                        renderItem={({item}) => <Box item={item} callback={() => this.clickItem(item)} idExercise={this.state.idExercise}
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
            <TouchableOpacity style={[styles.box, {paddingHorizontal: (this.props.idExercise === '1') ? 10 : 20}]}
                              onPress={this.activeIcon.bind(this)}
            >
                {
                    (this.props.idExercise === '1')
                    ?
                    <React.Fragment>
                        <Image source={{uri: this.props.item.image}} style={styles.imageIcon} />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Text style={styles.nameCategory}>
                            {this.props.item.title}
                        </Text>
                    </React.Fragment>
                }
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
        backgroundColor: Colors.APHASIA_BLUE,
        minWidth: '25%'
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
        alignItems: 'center',
        paddingTop:30
    },
    image:{
        width:150,
        height:150,
        resizeMode: 'contain',
        marginBottom: 5
    },
    imageIcon:{
        width:70,
        height:70,
        resizeMode: 'contain',
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
