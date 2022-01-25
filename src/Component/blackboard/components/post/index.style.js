import React from 'react';
import { 
    StyleSheet,
    Dimensions
} from 'react-native';

export const styles = StyleSheet.create({
    fbContainer: {
        width: Dimensions.get('window').width,
        marginTop: 10
    }, 
    menuIcon:{
        marginRight: 12
    },
    paragraph:{
        marginBottom: 10
    },  
    imageContainer: {
        marginTop: 10
    },
    actionContainer: {
        justifyContent: 'space-around',
        alignItems: "center"
    },
    iconStyle: {
        fontSize: 36
    },
    commentsRow: {
        flexDirection: "row", 
        marginTop: 8, 
        marginHorizontal: 15, 
        alignItems: "flex-end" 
    }
})