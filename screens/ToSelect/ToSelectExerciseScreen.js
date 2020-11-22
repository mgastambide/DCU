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

export default class ToSelectExerciseScreen extends React.Component {

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
                    title: 'Bicicleta',
                    image: 'https://cdn1.iconfinder.com/data/icons/bikes-on-circle/256/circle_bike-cruiser-flyer-mens-circle-512.png'
                },
                {
                    id: 1,
                    title: 'Paloma',
                    image: 'https://cdn.pixabay.com/photo/2012/04/12/12/36/pigeon-29841__340.png'
                },
                {
                    id: 2,
                    title: 'Perro',
                    image: 'https://seeklogo.com/images/B/black-dog-circle-logo-7032FEC424-seeklogo.com.png'
                },
                {
                    id: 3,
                    title: 'Automovil',
                    image: 'https://1.bp.blogspot.com/-wh9z6x6pxyA/X3_vjw7rUOI/AAAAAAAA0sM/dicZ9x1vItAmV1_0nTfU28JvJPd2-sbVACLcBGAsYHQ/s2048/r8-01.png',
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
        let selectedItem = this.state.words[Math.floor(Math.random()*this.state.words.length)];

        (total_correct) && this.setState({total_correct});
        (total_incorrect) && this.setState({total_incorrect});
        this.setState({selectedItem})

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _headerComponent = () => <View style={{paddingTop:20, width: Dimensions.get('window').width - 20}}>

        <Text style={{backgroundColor: Colors.APHASIA_GREY1, padding: 15, color: Colors.APHASIA_WHITE, textAlign: 'center',
            borderRadius:8, marginHorizontal:5
        }}>
            Total correctas: {this.state.total_correct} / Total incorrectas: {this.state.total_incorrect}
        </Text>

        {
            (this.state.selected === '') &&
            <View style={styles.containerImage}>
                <Text style={{fontSize:18, fontWeight: 'bold', textAlign:'center'}}>
                    Seleecione la imagen correspondiente a la siguiente palabra
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

        <View style={[styles.speaker, {borderColor: this.state.border}]}>
            <Text style={{color: (this.state.selected === '') ? 'white' : this.state.border, fontSize:25, textAlign: 'center'}}>
                { this.state.selectedItem.title }
            </Text>
        </View>

    </View>;

    _footerComponent = () =>  <View style={styles.buttons}>

        <TouchableOpacity onPress={() => (this.state.words.length > 1) ? this.removeOneOptions() : null} style={[styles.button, {backgroundColor: (this.state.words.length > 1) ? Colors.APHASIA_ORANGE : Colors.APHASIA_GREY}]}
            activeOpacity={(this.state.words.length > 1) ? .8 : 1}
        >
            <Icon name={'lightbulb-o'} type={'font-awesome'} size={20} color={Colors.APHASIA_WHITE} />
            <Text style={styles.textButton}>Ayuda</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.push('ToSelectExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise})}
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
                    this.props.navigation.push('ToSelectExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise});
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
                        renderItem={({item}) => <Box item={item} callback={() => this.clickItem(item)}
                        />}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.center}
                        ListFooterComponent={this._footerComponent}
                    />
                </View>
            </ImageBackground>
        );
    }
}

class Box extends React.Component {

    render() {
        return (
            <TouchableOpacity style={[styles.box]} onPress={() => this.props.callback()} >
                <Image source={{uri: this.props.item.image}} style={styles.imageIcon} />
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
        width:80,
        height:80,
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
