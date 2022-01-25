import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    SectionList,
    RefreshControl
} from 'react-native';
import { styles } from './BlackBoardView.styles';
import { PostInputAction, Post } from './components';

const postDatas = require('../../Data/posts.json');


export default class BlackBoardView extends React.Component {
    state = {
        refreshing: false
    }

    onRefresh = () => {
        this.setState({refreshing: true}, ()=>{
            setTimeout(()=>this.setState({refreshing: false}), 1000)
        })
    };

    _renderItem = (item, section) => {
        const { navigation } = this.props;

        if (section.title == "NEW_POST") {
            return (
                <PostInputAction
                    profileImageUri={"https://placeimg.com/100/100/people"}
                    placeholder={"Write something here..."}
                    onPress={() => {
                        navigation.navigate('PostInput')
                    }}
                />
            )
        } else {
            return (
                <Post
                    data={item}
                    onImagePress={(index, images) => {
                        var imageIndex = index;
                        if (images.length > 4 & index == 4) {
                            imageIndex = undefined
                        }
                        this.props.navigation.navigate('BBImageList', {
                            images: item.postImages,
                            postedBy: item.postedBy,
                            imageIndex: imageIndex
                        })
                    }}
                    onCommentPress={() => {
                        navigation.navigate('PostComment')
                    }}
                />
            )
        }
    }

    _renderSectionHeader = (section) => {
        if (section.title == "NEW_POST") {
            return (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionText}>Blackboard</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.sectionBreak} />
            )
        }
    }

    render() {
        const { refreshing } = this.state;

        return (
            <>
                <SafeAreaView style={styles.container}>
                    <SectionList
                        sections={[
                            { title: 'NEW_POST', data: ['newPost'] },
                            { title: 'FEED', data: postDatas.data },
                        ]}
                        renderItem={({ item, section }) => this._renderItem(item, section)}
                        renderSectionHeader={({ section }) => this._renderSectionHeader(section)}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                    />
                </SafeAreaView>
            </>
        )
    }
}