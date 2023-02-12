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
    ActivityIndicator
} from 'react-native';
import Config from '../../constants/Config';
import Colors from '../../constants/Colors';
import {Icon} from 'react-native-elements';
import HeaderNavigator from '../../navigation/HeaderNavigator';
import CommonFeatures from '../../constants/CommonFeatures';
import Sound from 'react-native-sound';
let success_answer = '';
let fail_answer = '';

export default class WhoIsWhoExerciseScreen extends React.Component {

    static navigationOptions = {
        headerShown: null
    }

    _isMounted = false;

    constructor(properties) {
        super(properties);

        this.state = {
            images: [],
            getWidth : '100%',
            getHeight: '100%',
            selectedItem: {},
            selected: '',
            border: Colors.APHASIA_GREY0,
            total_correct: 0,
            total_incorrect: 0,
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

        Config.apiGet('who_is_who')
        .then((Items) => {
            let images = [];
            let selectedItem = {};

            if(indexExercise){
                
                if(indexExercise === Items.length){
                    indexExercise = 0;
                }

                selectedItem = Items[indexExercise];
                images = [
                        {id: 0, image: Items[indexExercise].correct_image},
                        {id: 1, image: Items[indexExercise].wrong_image},
                    ];
            }else{
                indexExercise = 0;
                selectedItem = Items[0];
                images = [
                    {id: 0, image: Items[0].correct_image},
                    {id: 1, image: Items[0].wrong_image},
                ];
            }
            images = CommonFeatures.shuffleArray(images);
            this.setState({images, selectedItem, indexExercise, loading: false})
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
            Correctas: {this.state.total_correct} / Incorrectas: {this.state.total_incorrect}
        </Text> */}

        {
            (this.state.selected === '') &&
            <View style={styles.containerImage}>
                <Text style={{fontSize:20, fontWeight: 'bold', textAlign: 'center'}}>
                    Seleccione la imagen correcta, según la siguiente descripción
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

        <View style={[styles.speaker, {borderColor: this.state.border}]}>
            <Text style={{color: (this.state.selected === '') ? 'white' : this.state.border, fontSize:18, textAlign: 'center'}}>
                {this.state.selectedItem.description}
            </Text>
        </View>

    </View>;

    _footerComponent = () =>  <View style={styles.buttons}>

        <TouchableOpacity onPress={() => (this.state.images.length > 1) ? this.removeOneOptions() : null} style={[styles.button, {backgroundColor: (this.state.images.length > 1) ? Colors.APHASIA_ORANGE : Colors.APHASIA_GREY}]}
            activeOpacity={(this.state.images.length > 1) ? .8 : 1}
        >
            <Icon name={'lightbulb-o'} type={'font-awesome'} size={20} color={Colors.APHASIA_WHITE} />
            <Text style={styles.textButton}>Ayuda</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.push('WhoIsWhoExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise, indexExercise: this.state.indexExercise+1})}
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
        if(this.state.selectedItem.correct_image === item.image){
            success_answer.play();
            this.setState({selected: 'correct', border: Colors.APHASIA_LIGHT_GREEN, total_correct: this.state.total_correct+1});
            setTimeout(() => {
                    this.props.navigation.push('WhoIsWhoExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise, indexExercise: this.state.indexExercise+1});
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
        let words = [...this.state.images]
        for (let i = 0; i < words.length; i++) {
            if(words[i].image !== this.state.selectedItem.correct_image){
                index = words[i].id;
                break;
            }
        }
        let new_array = words.filter(item => item.id !== index);
        this.setState({images: new_array});
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
                            data={this.state.images}
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
            <TouchableOpacity style={[styles.box, {marginRight: (this.props.index === 0) ? 15 : 0}]}
                              onPress={() => this.props.callback()}
            >
                <Image source={{uri: this.props.item.image}} style={styles.imageIcon} resizeMethod={'resize'} />
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
        backgroundColor: Colors.APHASIA_BLUE,
        width:'100%',
        flex:1,
    },
    speaker:{
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: Colors.APHASIA_GREY0,
        borderWidth: 3
    },
    buttons:{
        flexDirection: 'row',
        paddingTop: 20
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
        paddingVertical:15,
    },
    imageIcon:{
        width:160,
        height:160,
        resizeMode: 'cover',
        borderRadius:8
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
