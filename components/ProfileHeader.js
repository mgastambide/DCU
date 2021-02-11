import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Modal, FlatList,Dimensions} from "react-native";
import {Avatar, Icon} from 'react-native-elements';
import Colors from "../constants/Colors";


export default class ProfileHeader extends React.Component {

    state = {
        image: this.props.image,
        isvisible: false,
        visible: false,
        user:{},
        avatarSource: null,
        photo: this.props.image,
        load_image: false,
        url_image: ''
    };

    selectAvatarTapped() {
        this.setState({visible: true});
    }

    render(){
        return(

            <View style={[styles.header,this.props.style]}>

                {
                    (!this.props.isLoading) ?
                        <TouchableOpacity onPress={this.selectAvatarTapped.bind(this)}>
                            
                            <Avatar style={styles.avatar} rounded source={(this.state.url_image === '') ? require('../assets/images/icon.jpg') : {uri: this.state.url_image}}/>

                            <Icon name='edit' containerStyle={styles.iconContainer} color={Colors.APHASIA_WHITE} size={15}/>
                            {
                                this.state.load_image &&
                                <View style={styles.load_image}>
                                    <ActivityIndicator animating={true} color={Colors.APHASIA_WHITE}/>
                                </View>
                            }
                        </TouchableOpacity>
                    :
                        <Avatar style={styles.avatar} rounded source={require('../assets/images/icon.jpg')}/>

                }


                <View style={styles.nameAndTitle}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text style={styles.jobTitle}>{this.props.title === 2 ? 'Terapeuta' : 'Estudiante'}</Text>
                </View>

                <Modal
                    animationType="slide" // fade
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => this.setState({visible: false})}
                >
                    <View style={[styles.modal_container_one, styles.center]}>
                        <View style={[styles.modal_container_two, styles.center]}>
                            <View style={styles.modal_container_three}>
                            <Text style={[styles.textName, {paddingVertical:10}]}>SELECCIONE UN AVATAR</Text>
                                <FlatList
                                    data={[
                                        {name: 'Maximiliano', url:'https://thumbs.dreamstime.com/b/icono-masculino-del-avatar-en-estilo-plano-icono-masculino-del-usuario-avatar-del-hombre-de-la-historieta-91602735.jpg'},
                                        {name:'Luciana', url:'https://cdn1.iconfinder.com/data/icons/retro-4/512/_woman-512.png'},
                                        {name:'Jaqueline', url:'https://www.shareicon.net/data/512x512/2016/08/18/810209_user_512x512.png'},
                                        {name:'Nadia', url:'https://cdn2.iconfinder.com/data/icons/beautiful-and-sexy-women-avatar-with-different-hai/283/female-full-11-512.png'}
                                    ]}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={
                                        ({ item }) =>
                                            <View style={{backgroundColor:Colors.IUPI_SKY}}>
                                                <TouchableOpacity
                                                    onPress={() => this.setState({url_image: item.url, visible:false})}
                                                    activeOpacity={.9}
                                                >
                                                    <View
                                                        style={styles.countryStyle}>
                                                        <Avatar style={styles.avatar} rounded source={{uri: item.url}}/>
                                                        <Text style={styles.textName}>{item.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                    }
                                    numColumns={2}
                                />
                            </View>

                            <View style={{backgroundColor:Colors.IUPI_SKY}}>
                                <TouchableOpacity
                                    onPress={() => this.setState({visible: false})}
                                    style={[styles.closeButtonStyle, styles.center]}>
                                    <Text style={styles.textStyle}>
                                        Cerrar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>

        );
    }


}

const styles = StyleSheet.create({

    header: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        marginHorizontal: 20,
        borderWidth:1,
        borderColor: Colors.APHASIA_BLACK,
        borderRadius:8
    },
    nameAndTitle: {
        flex:1,
    },
    name: {
        color: Colors.APHASIA_SKY,
        fontSize: 20,
        fontWeight: 'bold'
    },
    jobTitle: {
        color: Colors.APHASIA_GREY1,
        marginTop: 5
    },

    subtitle: {
        backgroundColor: Colors.APHASIA_BLUE,

    },

    subtitleText: {
        color: Colors.APHASIA_WHITE,

    },

    buttonEdit:{
        paddingVertical:10,
        paddingHorizontal:20,
        minWidth:200,
        marginBottom:15,
        borderRadius:5,
        backgroundColor:Colors.APHASIA_GREY3,
    },

    buttonEditTitle:{
        textAlign:'center',
        fontSize: 16,
        color: Colors.APHASIA_GREY1
    },

    iconContainer:{
        backgroundColor:Colors.APHASIA_BLACK,
        padding:5,
        position:'absolute',
        top:0,
        right:20,
        borderTopRightRadius:8,
        borderColor: Colors.APHASIA_WHITE,
        borderWidth:1
    },
    load_image:{
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex:1,
        top:0,
        left:20,
        right:0,
        bottom:0,
        position: 'absolute',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:15,
        borderTopRightRadius:10,
        width: 80,
        height: 80,
    },
    modal_container_one:{
        flex: 1,
        width:'100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal_container_two:{
        flex: 1,
        width:'100%',
        marginVertical:60,
    },
    modal_container_three:{
        justifyContent:'flex-end',
        alignItems:'center',
        width:Dimensions.get('window').width - 30,
        backgroundColor: Colors.APHASIA_WHITE,
        marginHorizontal:15
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
    },
    textStyle: {
        padding: 10,
        fontSize: 18,
        color: Colors.APHASIA_WHITE,
        fontWeight: 'bold'
    },
    closeButtonStyle: {
        padding: 5,
        backgroundColor: Colors.APHASIA_SKY2,
        width:Dimensions.get('window').width - 30
    },
    textName:{
        fontSize: 16,
        paddingVertical:5,
        color: Colors.APHASIA_BLACK,
        textAlign:'center'
    },
    countryStyle: {
        flex: 1,
        backgroundColor: Colors.APHASIA_WHITE,
        borderTopColor: Colors.APHASIA_GREY2,
        borderTopWidth: 1,
        padding: 12,
    },

});
