import * as React from 'react';
import { FlatList, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import CommentItem from '../commentItem';
import CommentInput from '../commentInput';
import { styles } from './index.style';

const commentsData = require('../../../../Data/comments.json');


const CommentViewHeader = ({ navigation }) => (
    <View style={styles.header}>
        <IconButton
            style={styles.closeButton}
            icon="close"
            size={20}
            onPress={() => navigation.goBack()}
        />
    </View>
)

class PostComment extends React.Component {
    state = {
        comments: commentsData
    }

    _renderItem = (item) => {
        return (
            <CommentItem
                data={item}
                onCommentPress={() => { }}
            />
        )
    }

    onChangeText = (text) => {

    }

    render() {
        const { navigation } = this.props;
        const { comments } = this.state;

        return (
            <View
                style={styles.container}
            >
                <CommentViewHeader navigation={navigation}/>
                <FlatList
                    style={styles.listContainer}
                    data={comments}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
                <CommentInput
                    onChangeText={text => this.onChangeText(text)}
                    onSendPress={() => {}}
                    //value={value}
                />
            </View>
        )
    }
};

export default PostComment;