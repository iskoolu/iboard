import React from 'react';
import { 
    StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    inputTextWrap: {
        flex: 1, 
        height: 55,
        marginVertical: 15,
        marginLeft: 14,
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 30,
        justifyContent: "center",
    },
    inputText:{
        fontSize: 16,
        marginLeft: 30
    }
})