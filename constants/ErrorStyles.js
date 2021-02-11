import { StyleSheet} from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({

    containerMessageAndButtons:{
        paddingVertical: 15
    },

    buttonConfirm:{
        marginHorizontal: 15,
        marginBottom:20
    },

    buttonCancel:{
        marginHorizontal: 15
    },

    errorContainerMessage:{
        backgroundColor:Colors.APHASIA_RED,
        paddingVertical:10,
        paddingHorizontal:3,
        justifyContent:'center',
        marginHorizontal:15,
        marginBottom:10,
        borderRadius:8
    },

    errorContainerMessageWhitoutMargin:{
        backgroundColor:Colors.APHASIA_RED,
        paddingVertical:10,
        paddingHorizontal:3,
        justifyContent:'center',
        width:'100%',
        marginBottom:10,
        borderRadius:3
    },

    errorMessage:{
        color:Colors.APHASIA_WHITE,
        textAlign:'center',
        fontSize:17,
        fontWeight:'bold'
    }
});