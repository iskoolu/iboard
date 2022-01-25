import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './clip.style';


const PostClip = ({value, text}) => (
    <View style={styles.clip}>
        <Text style={styles.clipText}>{value} {text}</Text>
    </View>
)

export default PostClip;