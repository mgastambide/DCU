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

export default class WhoIsWhoExerciseScreen extends React.Component {

    static navigationOptions = {
        headerShown: null
    }

    _isMounted = false;

    constructor(properties) {
        super(properties);

        this.state = {
            words: [
                {
                    id: 0,
                    title: 'bicicleta',
                    words: 'Hombre / Rubrio / Con Bigote / Con Lentes',
                    images: [
                        {
                            id: 0,
                            image: 'https://image.freepik.com/foto-gratis/chico-rubio-gafas-solo-retrato_53876-60070.jpg',
                        },
                        {
                            id: 1,
                            image: 'https://i.blogs.es/e8b5dc/color-de-ropa-para-cabello-rubio-18-/450_1000.jpg',
                        }
                    ],
                    image_correct: 'https://image.freepik.com/foto-gratis/chico-rubio-gafas-solo-retrato_53876-60070.jpg'
                },
                {
                    id: 1,
                    title: 'paloma',
                    words: 'Adulto / Sin Sombrero / Pelo Negro / Ojos Azules',
                    images: [
                        {
                            id: 0,
                            image: 'https://piruliru.com/wp-content/uploads/2019/10/sombrero-nino-ballenas02.jpg',
                        },
                        {
                            id: 1,
                            image: 'https://c8.alamy.com/compes/p96cn8/milan-junio-18-hombre-con-ojos-azules-y-pelo-negro-retrato-antes-de-giorgio-armani-fashion-show-la-semana-de-la-moda-de-milan-street-style-el-18-de-junio-de-2018-en-mi-p96cn8.jpg',
                        }
                    ],
                    image_correct: 'https://c8.alamy.com/compes/p96cn8/milan-junio-18-hombre-con-ojos-azules-y-pelo-negro-retrato-antes-de-giorgio-armani-fashion-show-la-semana-de-la-moda-de-milan-street-style-el-18-de-junio-de-2018-en-mi-p96cn8.jpg'
                },
                {
                    id: 2,
                    title: 'perro',
                    words: 'Mujer / Pelirroja / Camisa Blanca / Con Lentes',
                    images: [
                        {
                            id: 0,
                            image: 'https://image.freepik.com/foto-gratis/mujer-negocios-pelirroja-gafas_151013-726.jpg',
                        },
                        {
                            id: 1,
                            image: 'https://c8.alamy.com/compes/w9mcg8/retrato-de-una-joven-gordito-hombre-pelirroja-en-una-camisa-negra-que-se-enfrenta-a-la-camara-aislado-en-un-fondo-blanco-w9mcg8.jpg',
                        }
                    ],
                    image_correct: 'https://image.freepik.com/foto-gratis/mujer-negocios-pelirroja-gafas_151013-726.jpg'
                },
                {
                    id: 3,
                    title: 'perro',
                    words: 'Hombre / Asiatico / Con Traje / Pelo Con Canas',
                    images: [
                        {
                            id: 0,
                            image: 'https://images.pexels.com/users/avatars/563038/rokibul-hasan-766.jpeg?w=256&h=256&fit=crop&auto=compress',
                        },
                        {
                            id: 1,
                            image: 'https://ae01.alicdn.com/kf/HTB15bZqKpXXXXb7XXXXq6xXFXXXj/Hombre-Pelucas-Corto-Negro-Blanco-Hombres-de-Mediana-Edad-Pelo-Sint-tico-Falso-Transpirable-Gris-Viejo.jpg_Q90.jpg',
                        }
                    ],
                    image_correct: 'https://ae01.alicdn.com/kf/HTB15bZqKpXXXXb7XXXXq6xXFXXXj/Hombre-Pelucas-Corto-Negro-Blanco-Hombres-de-Mediana-Edad-Pelo-Sint-tico-Falso-Transpirable-Gris-Viejo.jpg_Q90.jpg'
                },
                {
                    id: 4,
                    title: 'perro',
                    words: 'Bebe / Durmiendo / Con Gorro / Con Mamadera',
                    images: [
                        {
                            id: 0,
                            image: 'https://previews.123rf.com/images/ferli/ferli1507/ferli150700623/42160996-retrato-de-cuerpo-entero-del-peque%C3%B1o-beb%C3%A9-adorable-acostado-en-el-piso.jpg',
                        },
                        {
                            id: 1,
                            image: 'https://http2.mlstatic.com/original-bebe-reborn-vinilo-cuerpo-completo-realista-D_Q_NP_897926-MLM27495406231_062018-F.webp',
                        }
                    ],
                    image_correct: 'https://http2.mlstatic.com/original-bebe-reborn-vinilo-cuerpo-completo-realista-D_Q_NP_897926-MLM27495406231_062018-F.webp'
                },
            ],
            selectedItem: {},
            selected: '',
            images: [],
            border: Colors.APHASIA_GREY0,
            total_correct: 0,
            total_incorrect: 0,
        };
    }

    async UNSAFE_componentWillMount() {
        this._isMounted = true;
        let total_correct = this.props.navigation.getParam('total_correct');
        let total_incorrect = this.props.navigation.getParam('total_incorrect');
        let selectedItem = this.state.words[Math.floor(Math.random()*this.state.words.length)];

        (total_correct) && this.setState({total_correct});
        (total_incorrect) && this.setState({total_incorrect});
        (selectedItem) && console.log(selectedItem);
        (selectedItem) && this.setState({selectedItem, images: selectedItem.images});

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
                <Text style={{fontSize:18, fontWeight: 'bold', textAlign: 'center'}}>
                    Seleccione la imagen correcta, según la siguiente descripción
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
            <Text style={{color: (this.state.selected === '') ? 'white' : this.state.border, fontSize:16, textAlign: 'center'}}>
                {this.state.selectedItem.words}
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

        <TouchableOpacity onPress={() => this.props.navigation.push('WhoIsWhoExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise})}
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
        if(this.state.selectedItem.image_correct === item.image){
            this.setState({selected: 'correct', border: Colors.APHASIA_LIGHT_GREEN, total_correct: this.state.total_correct+1});
            setTimeout(() => {
                    this.props.navigation.push('WhoIsWhoExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise});
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
        let words = [...this.state.images]
        for (let i = 0; i < words.length; i++) {
            if(words[i].image !== this.state.selectedItem.image_correct){
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
                <View style={styles.container}>
                    <FlatList
                        ListHeaderComponent={this._headerComponent}
                        data={this.state.images}
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
            <TouchableOpacity style={[styles.box]}
                              onPress={() => this.props.callback()}
            >
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
        backgroundColor: Colors.APHASIA_BLUE,
        minWidth: '30%'
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
        width:150,
        height:150,
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
    }
});
