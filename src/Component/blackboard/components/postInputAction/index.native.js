import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, TouchableRipple, Card, TextInput } from 'react-native-paper';
import { styles } from './index.style';

const PostInputAction = ({ profileImageUri, placeholder, onPress }) => (
    <Card>
        <TouchableRipple
            onPress={() => onPress('Pressed')}
            rippleColor="rgba(0, 0, 0, .1)"
        >
            <Card.Content style={styles.container}>
                <Avatar.Image size={50} source={{ "uri": profileImageUri }} />
                <View style={styles.inputTextWrap}>
                    <Text style={styles.inputText}>{placeholder}</Text>
                </View>
            </Card.Content>
        </TouchableRipple>
    </Card>
)


export default PostInputAction;