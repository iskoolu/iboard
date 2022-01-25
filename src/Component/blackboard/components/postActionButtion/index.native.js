import React from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './index.style';


const PostActionButton = ({ iconName, text, onPress, isActive=false }) => (
    <TouchableRipple
        onPress={() => onPress()}
        rippleColor="rgba(0, 0, 0, .1)"
    >
        <View style={styles.button}>
            <Icon name={iconName} size={24} color={isActive ? "#ffd700" : "#000" } />
            <Text style={styles.buttonText}>{text}</Text>
        </View>
    </TouchableRipple>
)


export default PostActionButton;