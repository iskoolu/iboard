import React from 'react';
import { Modal, BackHandler } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


export default class PostImageViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            activeIndex: 0,
            visible: false
        }
    }

    show = (images, index) => {
        const imageList = images.map(img => ({ url: img.imageUri }))
        this.setState({
            activeIndex: index,
            images: imageList,
            visible: true
        })
    }

    handleBackButtonClick = () => {
        this.setState({
            activeIndex: 0,
            images: [],
            visible: false
        })
    }

    render() {
        const { visible, images, activeIndex } = this.state;
        return (
            <Modal visible={visible} transparent={true} onRequestClose={this.handleBackButtonClick}>
                <ImageViewer imageUrls={images} index={activeIndex} />
            </Modal>
        )
    }
}