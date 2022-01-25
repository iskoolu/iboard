import React from 'react';
import FBCollage from 'react-native-fb-collage';
import { styles } from './index.style';

class PostImages extends React.Component {
    static defaultProps = {
        imageUris: [],
        onImagePress: () => { }
    }

    constructor(props) {
        super(props);
    }

    _getSpacing = (images) => {
        if (images && images.length > 1) {
            return { spacing: 5, radius: 2 }
        } else {
            return { spacing: 0.1, radius: 0 }
        }
    }

    render() {
        let { imageUris } = this.props;
        imageUris = imageUris || [];
        const spacing = this._getSpacing(imageUris);

        return (
            <FBCollage
                style={styles.fbContainer}
                borderRadius={spacing.radius}
                spacing={spacing.spacing}
                images={imageUris}
                imageOnPress={(index, images) => this.props.onImagePress(index, images)}
            />
        )
    }
}


export default PostImages;