import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card, Paragraph, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PostClip from './clip';
import { styles } from './index.style';
import { PostActionButton } from '../index';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import PostImages from '../postCollage';

let facebook = <Icon family={'FontAwesome'} name={'flag'} color={'#000000'} size={30} />
let SheetView = RNBottomActionSheet.SheetView;
class Post extends React.Component {
    static defaultProps = {
        data: {
            id: 0,
            postedBy: {
                name: "",
                imageUri: ""
            },
            text: ``,
            likesCount: 0,
            userLiked: false,
            commentsCount: 0,
            postImages: [],
            createdAt: null
        },
        onImagePress: () => { },
        onLikePress: () => { },
        onCommentPress: () => { }
    }

    constructor(props) {
        super(props);
        this.state = {
            ...props.data
        }
    }

    componentDidMount() {

    }

    _onMenuClick = () => {
        SheetView.Show({
            title: "Options!",
            items: [
                { title: "Report", value: "fb", subTitle: "Facebook Description", icon: facebook },
            ],
            theme: "light",
            selection: 3,
            onSelection: (index, value) => {
                // value is optional
                console.log("selection: " + index + " " + value);
            },
            onCancel: () => console.log('Closing the bottom SheetView!!!')
        });
    }

    _getImageComponent = (imageUis) => {
        return <PostImages
            imageUris={imageUis}
            onImagePress={(index, images) => this.props.onImagePress(index, images)}
        />
    }

    _getImages = (images) => {
        if (images && images.length > 0) {
            return this._getImageComponent(images.map(img => img.imageUri))
        }
    }

    _getSingleImage = (image) => {
        return this._getImageComponent([image])
    }

    render() {
        const {
            text,
            postImages,
            postedBy,
            createdAt,
            userLiked,
            imageUri
        } = this.state;
        const { singleImage } = this.props;

        return (
            <Card>
                <Card.Title
                    title={postedBy.name}
                    subtitle={createdAt}
                    left={() => <Avatar.Image size={38} source={{ "uri": postedBy.imageUri }} />}
                    right={() => (
                        <IconButton
                            style={styles.menuIcon}
                            onPress={() => this._onMenuClick()}
                            icon="dots-vertical"
                            size={20}
                        />
                    )}
                />
                <Card.Content>
                    {text ? <Paragraph style={styles.paragraph}>{text}</Paragraph> : null}
                </Card.Content>
                {!singleImage ? this._getImages(postImages) : this._getSingleImage(imageUri)}
                <View style={styles.commentsRow}>
                    <PostClip value={5} text={"Like"} />
                    <View style={{ width: 10 }} />
                    <PostClip value={100} text={"Comments"} />
                </View>
                <Card.Actions style={styles.actionContainer}>
                    <PostActionButton
                        text="Like"
                        iconName={userLiked ? "thumb-up" : "thumb-up-outline"}
                        onPress={() => { this.setState({ userLiked: !userLiked }) }}
                        isActive={userLiked}
                    />
                    <PostActionButton
                        text="Comment"
                        iconName="comment-text"
                        onPress={() => this.props.onCommentPress()}
                    />
                </Card.Actions>
            </Card>
        )
    }
}


export default Post;