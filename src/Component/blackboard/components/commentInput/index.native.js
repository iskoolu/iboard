import * as React from 'react';
import { View, Alert, TextInput } from 'react-native';
import { IconButton, Colors, Avatar } from 'react-native-paper';
import { styles } from './index.style';


class CommentInput extends React.Component {
    static defaultProps = {
        onChangeText: () => { },
        onSendPress: () => { }
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { visible } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.avatarContainer}>
                        <Avatar.Image 
                            size={34} 
                            source={{ "uri": "https://picsum.photos/100" }}
                            style={styles.avatar}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            mode="outlined"
                            placeholder={"Write a comment..."}
                            autoFocus
                            multiline
                            onChangeText={text => this.props.onChangeText(text)}
                            //value={value}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <IconButton
                        icon="camera"
                        color={Colors.red500}
                        size={22}
                        onPress={() => Alert.alert("Coming Soon!")}
                    />
                    <IconButton
                        icon="send"
                        color={Colors.red500}
                        size={22}
                        onPress={() => this.props.onSendPress()}
                    />
                </View>
            </View>
        )
    }
};

export default CommentInput;