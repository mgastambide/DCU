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
    ActivityIndicator
} from 'react-native';

import Colors from '../../constants/Colors';
import Config from '../../constants/Config';
import {Icon} from 'react-native-elements';
import HeaderNavigator from '../../navigation/HeaderNavigator';
import CommonFeatures from '../../constants/CommonFeatures';
import Sound from 'react-native-sound';
let success_answer = '';
let fail_answer = '';

export default class IsolatedExerciseScreen extends React.Component {

    static navigationOptions = {
        headerShown: null
    }

    _isMounted = false;

    constructor(properties) {
        super(properties);

        this.state = {
            sound: {},
            isLoop: false,
            words: [],
            getWidth : '100%',
            getHeight: '100%',
            selectedItem: {},
            selected: '',
            border: Colors.APHASIA_GREY0,
            total_correct: 0,
            total_incorrect: 0,
            idExercise: 0,
            indexExercise: 0,
            loading: true
        };
    }

    async UNSAFE_componentWillMount() {
        this._isMounted = true;
        let total_correct = this.props.navigation.getParam('total_correct');
        let total_incorrect = this.props.navigation.getParam('total_incorrect');
        let indexExercise = this.props.navigation.getParam('indexExercise');
        (total_correct) && this.setState({total_correct});
        (total_incorrect) && this.setState({total_incorrect});

        Config.apiGet('exercises')
        .then((Words) => {

            let words = [];
            let selectedItem = {};

            if(indexExercise){
                if(indexExercise === Words.length){
                    indexExercise = 0;
                }
                selectedItem = Words[indexExercise];
                words = [
                        {id: 0, word: Words[indexExercise].word, image: Words[indexExercise].image},
                        {id: 1, word: Words[indexExercise].prox_sem, image: Words[indexExercise].image_prox_sem},
                        {id: 2, word: Words[indexExercise].distant_sem, image: Words[indexExercise].image_distant_sem},
                        {id: 3, word: Words[indexExercise].fonol, image: Words[indexExercise].image_fonol}
                    ];
            }else{
                indexExercise = 0;
                selectedItem = Words[0];
                words = [
                    {id: 0, word: Words[0].word, image: Words[0].image},
                    {id: 1, word: Words[0].prox_sem, image: Words[0].image_prox_sem},
                    {id: 2, word: Words[0].distant_sem, image: Words[0].image_distant_sem},
                    {id: 3, word: Words[0].fonol, image: Words[0].image_fonol}
                ];
            }
            words = CommonFeatures.shuffleArray(words);
            this.setState({words, selectedItem, indexExercise, loading: false})
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

    _headerComponent = () => <View style={{paddingTop:20, width: '100%'}}>

        {/* <Text style={styles.total}>
            Ccorrectas: {this.state.total_correct} / Incorrectas: {this.state.total_incorrect}
        </Text> */}

        {
            (this.state.selected === '') &&
            <View style={styles.containerImage}>
                <Text style={{fontSize:18, fontWeight: 'bold', textAlign:'center'}}>
                    Seleccione la palabra correspondiente a la siguiente imagen
                </Text>
            </View>
        }

        {
            (this.state.selected === 'correct') &&
            <View style={styles.containerImage}>
                <Text style={{color: this.state.border, fontSize:18, fontWeight: 'bold'}}>Muy bien!</Text>
            </View>
        }

        {
            (this.state.selected === 'bad') &&
            <View style={styles.containerImage}>
                <Text style={{color: this.state.border, fontSize:18, fontWeight: 'bold'}}>Ups, la elección es incorrecta!</Text>
            </View>
        }

        <View style={[styles.speaker, {borderColor: this.state.border}]}>
            <Image source={{uri: this.state.selectedItem.image}} style={{width: 160, height:160, resizeMode:'contain'}} />
        </View>

    </View>;

    _footerComponent = () =>  <View style={styles.buttons}>

        <TouchableOpacity onPress={() => (this.state.words.length > 1) ? this.removeOneOptions() : null} style={[styles.button, {backgroundColor: (this.state.words.length > 1) ? Colors.APHASIA_ORANGE : Colors.APHASIA_GREY}]}
            activeOpacity={(this.state.words.length > 1) ? .8 : 1}
        >
            <Icon name={'lightbulb-o'} type={'font-awesome'} size={20} color={Colors.APHASIA_WHITE} />
            <Text style={styles.textButton}>Ayuda</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.push('IsolatedExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise, indexExercise: this.state.indexExercise+1})}
                          style={[styles.button, {backgroundColor: Colors.APHASIA_LIGHT_GREEN, marginHorizontal:15}]}
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
        if(this.state.selectedItem.word === item.word){
            success_answer.play();
            this.setState({selected: 'correct', border: Colors.APHASIA_LIGHT_GREEN, total_correct: this.state.total_correct+1});
            setTimeout(() => {
                    this.props.navigation.push('IsolatedExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise, indexExercise: this.state.indexExercise+1});
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
                            renderItem={({item, index}) => <Box item={item} callback={() => this.clickItem(item)} index={index}
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

    render() {
        return (
            <TouchableOpacity style={[styles.box, {marginRight: (this.props.index === 0 || this.props.index === 2) ? 15 : 0}]}
                onPress={() => this.props.callback()}
            >
                <Text style={{color: Colors.APHASIA_WHITE, fontSize:20, textAlign: 'center', textTransform: 'capitalize', paddingVertical:5}}>
                    { this.props.item.word }
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
        marginBottom: 10,
        padding: 5,
        backgroundColor: Colors.APHASIA_BLUE,
        width:'100%',
        flex:1
    },
    speaker:{
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 5,
        backgroundColor: Colors.APHASIA_GREY3,
        borderWidth: 3
    },
    buttons:{
        flexDirection: 'row',
        paddingVertical: 10
    },
    button:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.APHASIA_ORANGE,
        borderRadius:8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
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
        paddingVertical:15
    },
    imageIcon:{
        width:110,
        height:110,
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
