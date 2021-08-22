import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert
} from 'react-native';

import Sound from 'react-native-sound';
import Colors from '../../constants/Colors';
import Config from '../../constants/Config';
import {Icon} from 'react-native-elements';
import HeaderNavigator from '../../navigation/HeaderNavigator';
//import Words from '../../assets/multimedia_content/content_general'
import CommonFeatures from '../../constants/CommonFeatures';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners'

let whoosh = '';
let success_answer = '';
let fail_answer = '';

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
            getWidth : '100%',
            getHeight: '100%',
            soundSelected: '',
            getSizeImage: 70,
            words: [],
            selectedItem: {},
            selected: '',
            border: Colors.APHASIA_GREY0,
            total_correct: 0,
            total_incorrect: 0,
            idExercise: 0,
            indexExercise: 0,
            press_sound: false,
            loading: true,
            speed: 0,
            progress: 0,
        };
    }

    async UNSAFE_componentWillMount() {
        this._isMounted = true;
        let total_correct = this.props.navigation.getParam('total_correct');
        let total_incorrect = this.props.navigation.getParam('total_incorrect');
        if(total_correct){this.setState({total_correct});}
        if(total_incorrect){this.setState({total_incorrect});}

        this.load();

        this.listener = EventRegister.addEventListener('updateListening', () => {
            this.load();
        })
    }

    async load(){
        let idExercise = this.props.navigation.getParam('idExercise');
        let indexExercise = await this.props.navigation.getParam('indexExercise');
        if(idExercise){this.setState({idExercise});}

        let url = 'sound_word';
        if(idExercise && idExercise === '0'){url = 'sound_word';}
        if(idExercise && idExercise === '1'){url = 'exercises';}
        
        Config.apiGet(url)
        .then((Words) => {
            /* let words = [];
            let max_number = Words.length;
            let number_one = CommonFeatures.getRandomNumer(max_number, [indexExercise]);
            let number_two = CommonFeatures.getRandomNumer(max_number, [indexExercise, number_one]);
            let number_three = CommonFeatures.getRandomNumer(max_number, [indexExercise, number_one, number_two]);
            let correct_element = {}; */
            let words = [];
            let selectedItem = {};

            if(indexExercise){
                if(indexExercise === Words.length){
                    indexExercise = 0;
                    //this.setState({indexExercise: 0})
                }else{
                    //this.setState({indexExercise})
                }
                selectedItem = Words[indexExercise];
                words = [{id: 0, word: Words[indexExercise].word, image: Words[indexExercise].image},
                        {id: 1, word: Words[indexExercise].prox_sem, image: Words[indexExercise].image_prox_sem},
                        {id: 2, word: Words[indexExercise].distant_sem, image: Words[indexExercise].image_distant_sem},
                        {id: 3, word: Words[indexExercise].fonol, image: Words[indexExercise].image_fonol}
                    ];
                /* let first_random = Words[number_one]
                let second_random = Words[number_two]
                let third_random = Words[number_three]
                correct_element = Words[indexExercise]
                words.push(first_random, second_random, correct_element);
                */
            }else{
                indexExercise = 0;
                selectedItem = Words[0];
                words = [{
                    id: 0, word: Words[0].word, image: Words[0].image},
                    {id: 1, word: Words[0].prox_sem, image: Words[0].image_prox_sem},
                    {id: 2, word: Words[0].distant_sem, image: Words[0].image_distant_sem},
                    {id: 3, word: Words[0].fonol, image: Words[0].image_fonol}
                ];
                /* words = Words.slice(0,4);
                words = CommonFeatures.shuffleArray(words);
                correct_element = Words[0] */
            }
            words = CommonFeatures.shuffleArray(words);
            this.setState({words, selectedItem, indexExercise, loading: false})

            //Search item
            /* let i;
            let selectedItem = {};
            for (i = 0; i < words.length; i++) {
                if(words[i].id === correct_element.id){
                    selectedItem = words[i]
                }
            } */

            //this.setState({selectedItem, soundSelected: selectedItem.sound})
            let sound = 'https://marilakpropiedades.com.ar/wp-content/themes/Theme Marilak/sounds/'+selectedItem.sound;
            whoosh = new Sound(sound, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    Alert.alert('No se pudo cargar el sonido', error+'. Por favor, cierre y vuelva a abrir la aplicación. Gracias!');
                    return;
                }
            });
            success_answer = new Sound(require('../../assets/sound/success_answer.mp3'))
            fail_answer = new Sound(require('../../assets/sound/fail_answer.mp3'))
        })
        .catch(Config.apiCatchErrors.bind(this));
        
        this.dimensionsScreen();

        Dimensions.addEventListener('change', this.dimensionsScreen)
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.dimensionsScreen);
        this._isMounted = false;
    }
    
    dimensionsScreen = () => {
        this.setState({
            getWidth: Dimensions.get('window').width - 30,
            getHeight: Dimensions.get('window').height - 150
        });
    }
    
    _play = () => {
        if(this.state.speed === 0){
            // Play the sound with an onEnd callback
            this.setState({press_sound: true, speed: 1, progress: 1});
            whoosh.play((success) => {
                if (success) {
                    this.setState({speed: 0, press_sound: false, progress: 0})
                } else {
                    Alert.alert('Anomia App Error','La reproducción falló debido a errores de decodificación de audio. Por favor, cierre y vuelva a abrir la aplicación. Gracias!');
                }
            });
        }else{
            this.setState({speed: 0, press_sound: false})
            whoosh.pause();
        }
    };

    _stop = () => {
        if(this.state.sound !== undefined) {
            this.state.sound.stop()
        }
    };

    _headerComponent = () => <View style={{paddingTop:20, width: '100%'}}>

        {/* <Text style={styles.total}>
            Correctas: {this.state.total_correct} / Incorrectas: {this.state.total_incorrect}
        </Text> */}

        {
            (this.state.selected === '') &&
            <View style={styles.containerImage}>
                <Text style={{fontSize:20, fontWeight: 'bold'}}>
                    Presiona abajo para oir la palabra
                </Text>
            </View>
        }

        {
            (this.state.selected === 'correct') &&
            <View style={styles.containerImage}>
                <Text style={{color: this.state.border, fontSize:20, fontWeight: 'bold'}}>Muy bien!</Text>
            </View>
        }

        {
            (this.state.selected === 'bad') &&
            <View style={styles.containerImage}>
                <Text style={{color: this.state.border, fontSize:20, fontWeight: 'bold'}}>Ups, la elección es incorrecta!</Text>
            </View>
        }

        <TouchableOpacity onPress={() => this._play()} activeOpacity={1}
                          style={[styles.speaker, {borderColor: this.state.border}]}
        >
            {/* <Icon name={(!this.state.press_sound) ? 'volume-down' : 'volume-up'} type={'font-awesome'}
                  color={(this.state.selected === '') ? Colors.APHASIA_WHITE : this.state.border} size={60}
            /> */}
            <LottieView
                ref={animation => {
                this.animation = animation;
                }}
                speed={this.state.speed}
                source={require('../../assets/json/sound_animation.json')}
                style={{width: '100%'}}
                progress={this.state.progress}
                autoPlay
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

        <TouchableOpacity onPress={() => this.props.navigation.push('ListeningExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise, indexExercise: this.state.indexExercise+1})}
                          style={[styles.button, {backgroundColor: Colors.APHASIA_LIGHT_GREEN, marginHorizontal: 10}]}
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

        //if(this.state.selectedItem.title === item.title){
        if(this.state.selectedItem.word === item.word){
            whoosh.stop();
            success_answer.play();
            this.setState({selected: 'correct', border: Colors.APHASIA_LIGHT_GREEN, speed:0, progress:0});
            setTimeout(() => {
                    this.props.navigation.push('ListeningExercise', {
                        total_correct: this.state.total_correct+1,
                        total_incorrect: this.state.total_incorrect,
                        idExercise: this.state.idExercise,
                        indexExercise: this.state.indexExercise+1,
                    });
                }, 1000
            )
        }else{
            fail_answer.play();
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
            if(words[i].word !== this.state.selectedItem.word){
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
                {
                    (this.state.loading)
                    ? <ActivityIndicator animating={this.state.loading} color={Colors.APHASIA_GREY2} style={{marginVertical: 300}}/>
                    :  
                    <View style={styles.container}>
                        <FlatList
                            ListHeaderComponent={this._headerComponent}
                            data={this.state.words}
                            renderItem={({item, index}) => <Box item={item} callback={() => this.clickItem(item)}
                                        idExercise={this.state.idExercise} index={index}
                            />}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            contentContainerStyle={[styles.contentArea, {minHeight: this.state.getHeight, width: this.state.getWidth}]}
                            ListFooterComponent={this._footerComponent}
                        />
                    </View>
                }
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
            <TouchableOpacity style={[styles.box, {marginLeft: (this.props.index === 1 || this.props.index === 3) ? 8 : 0}]}
                              onPress={this.activeIcon.bind(this)}
            >
                {
                    (this.props.idExercise === '1')
                    ?
                    <React.Fragment>
                        <Image source={{uri: this.props.item.image}} style={[styles.imageIcon]} resizeMethod='resize'/>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Text style={styles.nameCategory}>
                            {this.props.item.word}
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
        marginVertical: 5,
        padding: 10,
        backgroundColor: Colors.APHASIA_BLUE,
        width: '100%',
        flex:1
    },
    speaker:{
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        paddingHorizontal: 5,
        marginBottom:5,
        backgroundColor: Colors.APHASIA_GREY_LIGHT,
        borderWidth: 3
    },
    buttons:{
        flexDirection: 'row',
        paddingVertical: 10,
    },
    button:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.APHASIA_ORANGE,
        borderRadius:8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex:1
    },
    textButton:{
        padding: 10,
        color: Colors.APHASIA_WHITE
    },
    containerImage:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
    },
    image:{
        width:150,
        height:150,
        resizeMode: 'contain',
        marginBottom: 5
    },
    imageIcon:{
        resizeMode: 'contain',
        width: 140,
        height: 110,
        maxWidth: '100%',
    },
    center:{
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameCategory:{
        textTransform: 'capitalize',
        color: Colors.APHASIA_WHITE,
        fontSize:18
    },
    contentArea:{
        justifyContent:'center'
    },
    total:{
        backgroundColor: Colors.APHASIA_GREY1,
        padding: 15,
        color: Colors.APHASIA_WHITE,
        textAlign: 'center',
        borderRadius:8,
        fontSize: 20
    }
});
