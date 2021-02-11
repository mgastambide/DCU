import React from 'react'
import {Dimensions, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import { Icon } from 'react-native-elements'
import Colors from "../constants/Colors";

export default class ProfileEditDataRow extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            text: this.props.data,
            user: this.props.user,
            editable: this.props.editable,
            modalVisible:false,
            value2:'',
            data: [],
            noData: false
        };
    }

    changeText(text){
        this.setState({
            text:   text,
        });

        this.props.callback(this.props.fill, text);
    }

    getCountry(text) {
        this.setState({
            text:   text.name,
        });

        this.props.callback(this.props.fill, text);

        this.hideModal();
    }

    hideModal() {
        this.setState({ modalVisible: false });
    }

    searchText = (e) => {
        this.setState({value2: e});
        let text = e.toLowerCase();
        let trucks = this.props.options;
        let filteredName = trucks.filter((item) => {
            return item.name.toLowerCase().match(text)
        });

        if (!text || text === '') {
            this.setState({
                data: this.props.options
            })
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
            // set no data flag to true so as to render flatlist conditionally
            this.setState({
                noData: true
            })
        } else if (Array.isArray(filteredName)) {
            this.setState({
                noData: false,
                data: filteredName
            })
        }
    };

    render(){
        return (
            <View style={styles.wrapper}>

                <View style={styles.leftSide}>
                    <Icon style={styles.icon} color={this.props.editable === undefined ? Colors.IUPI_SKY : Colors.IUPI_GREY1} name={this.props.icon} type='font-awesome' />
                    <Text style={styles.pipe}>|</Text>
                </View>

                {
                    this.props.options //Pregunto si tiene un arreglo con opciones (Listado de provincias por ej.)
                        ?
                        <TouchableOpacity style={styles.rightSide} onPress={() => this.setState({modalVisible: true})} >
                            <Text style={styles.title}>{this.props.title}</Text>
                            <TextInput
                                style={[styles.data, {textTransform:'capitalize'}]} value={this.props.data}
                                placeholder={this.props.data}
                                onChangeText={(text) => this.changeText(text)}
                                editable={false}
                                placeholderTextColor={Colors.APHASIA_GREY1}
                            />
                            {
                                this.props.message && <Text style={styles.titleMessage}> {this.props.message} </Text>
                            }
                        </TouchableOpacity>
                        :
                        <View style={styles.rightSide}>
                            <Text style={styles.title}>{this.props.title}</Text>

                            <TextInput
                                style={[styles.data, {color: this.props.editable === undefined ? Colors.APHASIA_BLACK : Colors.APHASIA_ORANGE}]}
                                value={this.state.text}
                                placeholder={this.state.text}
                                onChangeText={(text) => this.changeText(text)}
                                keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                                editable={this.props.editable !== undefined ? this.props.editable : true}
                                placeholderTextColor={Colors.APHASIA_GREY1}
                            />

                            {
                                this.props.message && <Text style={styles.titleMessage}> {this.props.message} </Text>
                            }
                        </View>
                }

                <Modal
                    animationType="slide" // fade
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({modalVisible: false})}
                >
                    <View style={[styles.modal_container_one, styles.center]}>
                        <View style={[styles.modal_container_two, styles.center]}>
                            <View style={styles.modal_container_three}>
                                {
                                    (this.props.title === 'Ciudad*' || this.props.title === 'Ciudad') &&
                                    <View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', width: Dimensions.get('window').width - 30}}>
                                            <TextInput
                                                placeholder={'Buscá una ciudad'}
                                                value={this.state.value2}
                                                onChangeText={(value2) => this.searchText(value2)}
                                                autoCapitalize={'none'}
                                                placeholderTextColor={Colors.IUPI_GREY6}
                                                style={{paddingLeft:10}}
                                            />
                                            {
                                                (this.state.value2 === '')
                                                    ? <Icon name={'search'} type={'font-awesome'} size={15} color={Colors.IUPI_GREY6} containerStyle={{paddingHorizontal:10}} />
                                                    : <TouchableOpacity onPress={() => this.setState({value2: ''})}>
                                                        <Icon name={'times'} type={'font-awesome'} size={15} color={Colors.IUPI_SKY2} containerStyle={{paddingHorizontal:10}} />
                                                    </TouchableOpacity>
                                            }
                                        </View>
                                        {
                                            (this.state.data && this.state.data.length === 0 && this.state.value2 !== '') &&
                                            <Text style={{padding:5, backgroundColor: 'white'}}>No se encontraron resultados</Text>
                                        }
                                    </View>
                                }
                                <FlatList
                                    data={(this.state.value2.length === 0 ) ? this.props.options : this.state.data}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={
                                        ({ item }) =>
                                            <View style={{backgroundColor:Colors.IUPI_SKY}}>
                                                <TouchableOpacity
                                                    onPress={() => this.getCountry(item)}
                                                    activeOpacity={.9}
                                                >
                                                    <View
                                                        style={styles.countryStyle}>
                                                        <Text style={styles.textName}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                    }
                                />
                            </View>

                            {
                                (this.props.data && this.props.data.length === 0) &&
                                <View style={[styles.dataEmpty, styles.center]}>
                                    <Text style={styles.textName}>
                                        No hay {this.props.title} cargados aún
                                    </Text>
                                </View>
                            }
                            <View style={{backgroundColor:Colors.IUPI_SKY}}>
                                <TouchableOpacity
                                    onPress={() => this.hideModal()}
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

    data: {
        color: Colors.APHASIA_BLACK,
        fontWeight: 'bold',
        width:'100%'
    },

    icon: {
        flex: 1,
    },

    leftSide: {
        flexDirection: 'row',
        marginLeft: 5,
        width: 40,
        justifyContent: 'flex-end'
    },

    pipe: {
        marginLeft: 10,
        fontSize: 20
    },

    rightSide: {
        flexDirection: 'column',
        marginLeft: 10,
        flex:1,
        flexWrap:'wrap'
    },

    title: {
        color: Colors.APHASIA_GREY1,
        fontWeight: 'bold'
    },

    titleMessage:{
        marginTop: 5,
        color: Colors.APHASIA_GREY1,
        fontSize: 12,
        paddingRight:5
    },

    wrapper: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.APHASIA_GREY3,
        paddingVertical: 10,
        marginHorizontal: 15,
    },
    textName:{
        fontSize: 16,
        paddingVertical:5,
        color: Colors.APHASIA_BLACK
    },
    countryStyle: {
        flex: 1,
        backgroundColor: Colors.APHASIA_WHITE,
        borderTopColor: Colors.APHASIA_GREY2,
        borderTopWidth: 1,
        padding: 12,
        width:Dimensions.get('window').width - 30,
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
    dataEmpty:{
        paddingHorizontal: 5,
        paddingVertical:30,
        backgroundColor: Colors.APHASIA_WHITE,
        width:Dimensions.get('window').width - 30
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
        width:'100%'
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
    }
});
