import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        flex: 1
    },
    separator: {
        height: 6
    },
    listContainer:{
        padding: 20,
        paddingTop: 10
    },
    header:{
        flexDirection: "row",
        justifyContent: "flex-end",
        borderBottomWidth: 0.5,
        borderColor: "lightgray"
    },
    closeButton:{
        marginRight: 10
    }
})