import React from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { styles } from './BlackBoardView.styles';
import { Post } from './components';
import PostImageViewer from './components/ImageViewer';

export default class BlackBoardImageListView extends React.Component {
    static defaultProps = {
        data: []
    }

    state = {
        data: [],
        postedBy: {}
    }

    componentDidMount() {
        const { params } = this.props.route;
        this.setState({ 
            data: params.images,
            postedBy: params.postedBy,
        }, ()=>{
            // WIP
            // if (params.imageIndex != undefined){
            //     this.flatListRef.scrollToIndex({ animated: true, index: params.imageIndex });
            // }
        })
    }

    _renderItem = (item, index) => {
        const { navigation } = this.props;
        const { data } = this.state;
        item.postedBy = this.state.postedBy

        return (
            <Post
                data={item}
                singleImage
                onImagePress={(__, _) => {
                    this.imageViewerRef.show(data, index)
                }}
            />
        )
    }

    _renderSectionHeader = (section) => {
        return (
            <View style={styles.sectionBreak} />
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    ref={(ref) => this.flatListRef = ref}
                    data={this.state.data}
                    renderItem={({ item, index }) => this._renderItem(item, index)}
                    renderSectionHeader={({ section }) => this._renderSectionHeader(section)}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
                <PostImageViewer ref={(ref)=>this.imageViewerRef = ref}/>
            </SafeAreaView>
        )
    }
}