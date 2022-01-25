import React from 'react';
import {
    StyleSheet
} from 'react-native';
import { Colors } from 'react-native-paper';

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: "column",
        // margin: 10
    },
    avatarContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%"
    },
    avatar:{
        margin: 8
    },
    textInput:{
        minHeight: 50,
        maxHeight: 150
    },
    content:{
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    footer:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 6
    }
})