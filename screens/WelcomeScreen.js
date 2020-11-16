import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,
    Modal, UIManager, Platform,
    Image, LayoutAnimation, TouchableOpacity, ImageBackground, Dimensions
} from 'react-native';
import {EventRegister} from "react-native-event-listeners";
import Colors from "../constants/Colors";
import AppIntroSlider from 'react-native-app-intro-slider';

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const screenHeight = Math.round(Dimensions.get('window').height);

const CustomLayoutAnimation = {
    duration: 800,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
    },
};

export default class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.timer = null;
        this.timer_2 = null;
        this.state = {
            position: "space-between",
            loadingRefresh: false,
            loading: true,
            visible: false,
            animationValue : 1,
            slides:[
                {
                    key: "0",
                    title: "Paso 1",
                    text: "La mejor terapia para la afasia está diseñada para usted por un patólogo del habla.\n" +
                        "Debe basarse en sus fortalezas y debilidades.\n" +
                        "Debería ayudarlo a practicar habilidades para la vida real. Debe usar más que solo palabras e imágenes.\n" +
                        "Esta App puede ser parte de esa terapia, o si ha terminado la terapia, puede ayudarlo a seguir practicando ",
                    image: "https://data.pixiz.com/output/user/frame/preview/400x400/0/3/8/4/2374830_d94a1.jpg",
                    backgroundColor: Colors.APHASIA_ORANGE
                },
                {
                    key: "1",
                    title: "Paso 2",
                    text: "Elija un idioma y elija en qué quiere trabajar: leer, deletrear, escuchar o nombrar .\n" +
                        "Luego, elija una tarea . Cambie la configuración de la tarea para que sea más difícil o más fácil.\n" +
                        "Hay listas de palabras según la dificultad o los temas.",
                    image: "https://data.pixiz.com/output/user/frame/preview/400x400/0/3/8/4/2374830_d94a1.jpg",
                    backgroundColor: Colors.APHASIA_GREY3
                },
                {
                    key: "2",
                    title: "Paso 3",
                    text: "Intente decir el nombre de la imagen que se muestra. Si necesitas ayuda, sigue presionando el ícono: Si crees que dijiste la palabra correctamente, presiona la marca: Esta tarea no te escucha hablar, pero puedes verificar la respuesta.",
                    image: "https://data.pixiz.com/output/user/frame/preview/400x400/0/3/8/4/2374830_d94a1.jpg",
                    backgroundColor: Colors.APHASIA_RED
                }
            ]
        }
    }

    static navigationOptions = {
        headerShown: false
    };

    UNSAFE_componentWillMount() {
        this.timer = setTimeout(() => {
            this.changePosition("center")
        }, 2000);

        this.timer_2 = setTimeout(() => {
            this.setState({loading: false})
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        clearTimeout(this.timer_2);
    }

    changePosition = position => {
        LayoutAnimation.configureNext(CustomLayoutAnimation);
        this.setState({
            position,
            position_2: position,
            animatedValue:.75
        });

    };

    _renderItem = props => (
        <View style={{flex:1, backgroundColor:props.item.backgroundColor}}>
            <View style={styles.containerImage}>
                <Image source={{uri: props.item.image}} style={styles.step_image}/>
            </View>
            <View style={styles.containerInfo}>
                <ScrollView style={{flex:1, paddingBottom: 30}}>
                    <View>
                        <Text style={styles.titleSlider}>{props.item.title}</Text>
                        <Text style={styles.texts}>{props.item.text}</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );

    _onDone = () => {
        this.setState({visible: false})
    };

    render() {
        return(

            <View style={styles.container}>

                {
                    this.state.loading ? <ActivityIndicator animating={this.state.loading} style={{marginVertical: 340}} color={Colors.PRIMARY_COLOR}/>
                        :
                        <ImageBackground source={require('../assets/images/background-app-white.jpg')} style={styles.containerImageBackground}>

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>


                                <View style={{opacity: (this.state.position === 'center') ? 1 : 0}}>
                                    <Text style={styles.title}>Bienvenido a</Text>
                                    <Text style={styles.subtitle}>Afasia DCU</Text>
                                </View>

                                <View style={{
                                    justifyContent: this.state.position,
                                    alignItems: 'center',
                                    width: '100%',
                                    flexDirection:'row',
                                    padding:10,
                                    transform : [
                                        {
                                            scale : this.state.animationValue
                                        }
                                    ]
                                }}
                                >
                                    <Image source={require('../assets/images/puzzle_transparent.png')} style={styles.imagePuzzle} />
                                    <Image source={require('../assets/images/head_transparent.png')} style={styles.image} />
                                </View>

                                <View style={[styles.buttonsContainer, {opacity: (this.state.position === 'center') ? 1 : 0}]}>
                                    <View>
                                        <Buttons title={'Iniciar Sesión'} callback={() => this.props.navigation.navigate('Login', {from_welcome: true})} background={Colors.APHASIA_GREY3} border={Colors.APHASIA_GREY_LIGHT} title_color={Colors.APHASIA_WHITE} />
                                        <Buttons title={'Crear cuenta'} callback={() => this.props.navigation.navigate('Register', {from_welcome: true})} background={Colors.APHASIA_GREY_LIGHT} border={Colors.APHASIA_GREY3} title_color={Colors.APHASIA_GREY3} />
                                        <Buttons title={'¿Qué es Afasia DCU ?'} callback={() => this.setState({visible: !this.state.visible})} background={Colors.APHASIA_WHITE} border={Colors.APHASIA_GREY3} title_color={Colors.APHASIA_GREY3} />
                                    </View>
                                </View>

                            </View>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('App', {from_welcome: true})} style={{paddingVertical:30, position: 'absolute', bottom:0, right:0}}>
                                <Text style={[styles.textWhite, {textAlign:'right', paddingHorizontal: 20, textDecorationLine:'underline', color: Colors.APHASIA_GREY3}]}>
                                    Saltar
                                </Text>
                            </TouchableOpacity>

                        </ImageBackground>
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => this.setState({visible:false})}
                >
                    <View style={styles.modal} >
                        <AppIntroSlider
                            data={this.state.slides}
                            renderItem={this._renderItem}
                            onDone={this._onDone}
                            showPrevButton
                            nextLabel={'Siguiente'}
                            prevLabel={'Anterior'}
                            doneLabel={'Finalizar'}
                        />
                        <TouchableOpacity onPress={() => this.setState({visible: false})} style={[ styles.touchClose]}>
                            <Text style={styles.close}>
                                x
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

            </View>

        );
    }
}

class Buttons extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.boxDone, {backgroundColor: this.props.background, borderColor: this.props.border}]}
                onPress={this.props.callback.bind(this)}
            >
                <Text style={[styles.textWhite, {color: this.props.title_color}]}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImageBackground:{
        flex: 1,
        resizeMode: 'cover',
        position: 'relative'
    },
    contentContainer:{
        flex:1,
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        color:Colors.APHASIA_GREY3,
        textAlign: 'center'
    },
    subtitle:{
        fontSize:30,
        fontWeight:'bold',
        color:Colors.APHASIA_RED,
        textAlign: 'center'
    },
    imagePuzzle:{
        width:30,
        height:100,
        resizeMode:'contain',
    },
    image:{
        width:60,
        height:100,
        resizeMode:'contain',
    },
    buttonsContainer:{
        justifyContent:'space-between',
        width: '100%'
    },
    boxDone:{
        borderWidth:1,
        borderColor:Colors.APHASIA_GREY3,
        backgroundColor:'#e6e6e6',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        width:'auto',
        marginTop:15,
        marginHorizontal: 15,
        ...Colors.shadowBox
    },
    textWhite:{
        color: Colors.APHASIA_WHITE,
        padding:10,
        fontSize:17,
    },
    modal:{
        flex:1,
    },
    step_image:{
        width: Dimensions.get('window').width,
        height: 350,
        resizeMode:'cover'
    },
    touchClose:{
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.5)',
        top:(screenHeight > 800 ) ? 30 : 0,
        right:0,
        margin:15,
        justifyContent:'center',
        alignItems:'center',
        overflow: 'hidden',
        borderRadius: Platform.OS === 'android' ? 40 : 14,
    },
    close:{
        paddingTop:0,
        paddingBottom:5,
        paddingHorizontal:9,
        fontSize:Platform.OS === 'android' ? 16 : 20,
        color:Colors.PRIMARY_COLOR,
    },
    containerImage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:20,
    },
    containerInfo:{
        flex:1,
        padding:20
    },
    titleSlider:{
        fontSize:30,
        fontWeight:'bold',
        color:Colors.APHASIA_WHITE,
        textAlign:'center'
    },
    texts:{
        fontSize:17,
        color:Colors.APHASIA_WHITE,
        textAlign:'center',
        paddingTop: 10,
        paddingBottom: 30
    }
});
