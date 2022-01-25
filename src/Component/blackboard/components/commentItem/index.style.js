import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row', 
    },
    column:{
        flex: 1
    },
    avatarColumn:{
        marginRight: 12
    },
    avatarStyle:{
        marginTop: 1
    },  
    nameContainer:{

    },
    nameText:{
        fontWeight: "600"
    },
    textContainer:{
        backgroundColor: "lightgray",
        padding: 10,
        borderRadius: 14
    },
    text:{

    },
    footer:{
        flexDirection: 'row', 
        marginTop: 5
    },
    dateText:{
        fontSize: 12,
        paddingLeft: 10
    }
})