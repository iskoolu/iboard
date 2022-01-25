import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { styles } from './index.style';


class CommentItem extends React.Component {
    static defaultProps = {
        data: {
            id: null,
            postId: null,
            postedBy: {
                name: "",
                imageUri: null
            },
            text: "",
            createdAt: null,
            updatedAt: null,
            deletedAt: ""
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            ...props.data
        }
    }

    render() {
        const { postedBy, text, createdAt } = this.props.data;

        return (
            <View style={styles.container}>
                <View style={styles.avatarColumn}>
                    <Avatar.Image 
                        size={38} 
                        source={{ "uri": "https://picsum.photos/100" }} 
                        style={styles.avatarStyle}
                    />
                </View>
                <View style={styles.column}>
                    <View style={styles.textContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>{postedBy.name}</Text>
                        </View>
                        <Text style={styles.text}>
                            {text}
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.dateText}>{createdAt}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default CommentItem;