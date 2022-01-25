import React from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { Avatar, Colors, IconButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import PostImages from '../postCollage';
import { styles } from './index.style';


export default class PostInput extends React.Component {
    static defaultProps = {
        onChangeText: (text) => { },
        onSendPress: () => { }
    }
    postInputRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imageUris: []
        }
    }

    _setImages = (response) => {
        this.setState({
            images: response,
            imageUris: response.map(image => `data:${image.mime};base64,${image.data}`)
        })
    }

    _openCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 1500,
            compressImageMaxHeight: 1500,
            cropping: false,
            includeBase64: true,
            mediaType: 'photo'
        }).then(image => {
            this._setImages([image]);
        });
    }

    _openImages = () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 1500,
            compressImageMaxHeight: 1500,
            multiple: true,
            cropping: false,
            includeBase64: true,
            mediaType: 'photo'
        }).then(image => {
            this._setImages(image);
        });
    }

    _getPostImages = (images) => {
        if (images.length > 0) {
            return <PostImages
                imageUris={images || []}
            />
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.textContainer}>
                    <TextInput
                        ref={this.postInputRef}
                        style={styles.textInput}
                        placeholder={"Write a comment..."}
                        autoFocus
                        multiline
                        onChangeText={text => this.props.onChangeText(text)}
                    />
                    {this._getPostImages(this.state.imageUris)}
                </View>
                <View style={[styles.row, styles.spaceBetween]}>
                    <View style={styles.row}>
                        <Text style={styles.noteText}>Add to your post</Text>
                    </View>
                    <View style={styles.row}>
                        <IconButton
                            icon="camera"
                            color={Colors.red500}
                            size={22}
                            onPress={() => this._openCamera()}
                        />
                        <IconButton
                            icon="image-multiple"
                            color={Colors.red500}
                            size={22}
                            onPress={() => this._openImages()}
                        />
                        <IconButton
                            icon="send"
                            color={Colors.red500}
                            size={22}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}