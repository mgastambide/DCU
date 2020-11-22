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

export default class SurplusExerciseScreen extends React.Component {

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
                    title: 'Animales',
                    images: [
                        {
                            id: 0,
                            image: 'https://cdn.pixabay.com/photo/2012/04/12/12/36/pigeon-29841__340.png',
                        },
                        {
                            id: 1,
                            image: 'https://seeklogo.com/images/B/black-dog-circle-logo-7032FEC424-seeklogo.com.png',
                        },
                        {
                            id: 2,
                            image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/55ea2a5f168f4c609d51a9f1011a500d_9366/Pelota_Oficial_Partidos_Argentina_19_(UNISEX)_Blanco_DY2520_01_standard.jpg'
                        },
                        {
                            id: 3,
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cpLZOX8GZQKNkbayZOmoyxeONueTOUGa3g&usqp=CAU'
                        }
                    ],
                    image_correct: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/55ea2a5f168f4c609d51a9f1011a500d_9366/Pelota_Oficial_Partidos_Argentina_19_(UNISEX)_Blanco_DY2520_01_standard.jpg'
                },
                {
                    id: 1,
                    title: 'Frutas',
                    images: [
                        {
                            id: 0,
                            image: 'https://i.pinimg.com/736x/1a/c3/b0/1ac3b044aff578b925f6e052af617c3e.jpg',
                        },
                        {
                            id: 1,
                            image: 'https://st.depositphotos.com/2435397/3667/i/600/depositphotos_36673199-stock-photo-pineapple.jpg',
                        },
                        {
                            id: 2,
                            image: 'https://s.clipartkey.com/mpngs/s/28-282709_manzana-dibujo-animados-png.png'
                        },
                        {
                            id: 3,
                            image: 'https://st2.depositphotos.com/4187579/6211/v/950/depositphotos_62113727-stock-illustration-grapes.jpg'
                        }
                    ],
                    image_correct: 'https://i.pinimg.com/736x/1a/c3/b0/1ac3b044aff578b925f6e052af617c3e.jpg'
                },
                {
                    id: 2,
                    title: 'Deportes',
                    images: [
                        {
                            id: 0,
                            image: 'https://previews.123rf.com/images/leonido/leonido1009/leonido100900077/7797638-jugadores-de-f%C3%BAtbol-ilustraci%C3%B3n-color-para-dise%C3%B1adores-.jpg',
                        },
                        {
                            id: 1,
                            image: 'https://previews.123rf.com/images/leonido/leonido1009/leonido100900107/7797588-ilustraci%C3%B3n-de-jugadores-de-baloncesto-.jpg',
                        },
                        {
                            id: 2,
                            image: 'https://previews.123rf.com/images/kapona/kapona1701/kapona170100003/70666676-jugador-de-golf-ilustraci%C3%B3n.jpg'
                        },
                        {
                            id: 3,
                            image: 'https://image.freepik.com/vector-gratis/vector-hombre-leyendo-periodico_23-2147495891.jpg'
                        }
                    ],
                    image_correct: 'https://image.freepik.com/vector-gratis/vector-hombre-leyendo-periodico_23-2147495891.jpg'
                },
                {
                    id: 3,
                    title: 'Transportes',
                    images: [
                        {
                            id: 0,
                            image: 'https://image.freepik.com/vector-gratis/ilustracion-auto-clasico_169137-34.jpg',
                        },
                        {
                            id: 1,
                            image: 'https://3.bp.blogspot.com/-VTjKCaf59XI/TjDhYdzBBsI/AAAAAAAAAZE/94TNXPNRelA/s1600/colectivo.jpg',
                        },
                        {
                            id: 2,
                            image: 'https://static8.depositphotos.com/1404177/881/v/950/depositphotos_8819758-stock-illustration-chair-red-classic-detailed-vector.jpg'
                        },
                        {
                            id: 3,
                            image: 'https://fscomps.fotosearch.com/compc/CSP/CSP230/grande-azul-cami%C3%B3n-ilustraci%C3%B3n-dibujo__k23661093.jpg'
                        }
                    ],
                    image_correct: 'https://static8.depositphotos.com/1404177/881/v/950/depositphotos_8819758-stock-illustration-chair-red-classic-detailed-vector.jpg'
                },
                {
                    id: 4,
                    title: 'Ropa',
                    images: [
                        {
                            id: 0,
                            image: 'https://d26lpennugtm8s.cloudfront.net/stores/317/338/products/s-l1600-171-2c0ac1de2e4f1d77d315633429964761-1024-1024.jpg',
                        },
                        {
                            id: 1,
                            image: 'https://universoventura.vteximg.com.br/arquivos/ids/180780-500-500/Pantalon-Columbia-Silver-Ridge-Trekking-Cargo-Mujer-Fade-Ink-AL8003-419-2.jpg?v=637110806451470000',
                        },
                        {
                            id: 2,
                            image: 'https://static.mercadoshops.com/campera-casual-alpinestars-expo-bordo_iZ800501761XvZxXpZ1XfZ160126555-694821048-1.jpgXsZ160126555xIM.jpg'
                        },
                        {
                            id: 3,
                            image: 'https://ae01.alicdn.com/kf/HTB1m0h6aN_rK1RkHFqDq6yJAFXaM/Camiseta-con-estampado-de-insectos-para-mujer-remera-con-ilustraci-n-de-insectos-y-Entomolog-a.jpg_q50.jpg'
                        }
                    ],
                    image_correct: 'https://d26lpennugtm8s.cloudfront.net/stores/317/338/products/s-l1600-171-2c0ac1de2e4f1d77d315633429964761-1024-1024.jpg'
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
                    Seleccione la imagen errónea de cada grupo
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
                {this.state.selectedItem.title}
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

        <TouchableOpacity onPress={() => this.props.navigation.push('SurplusExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise})}
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
                    this.props.navigation.push('SurplusExercise', {total_correct: this.state.total_correct, total_incorrect: this.state.total_incorrect, idExercise: this.state.idExercise});
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
        backgroundColor: Colors.APHASIA_WHITE,
        minWidth: '20%'
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
        width:110,
        height:110,
        resizeMode: 'contain',
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
