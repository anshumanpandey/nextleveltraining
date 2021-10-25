import React from 'react'
import { Dimensions, View, TouchableOpacity, Platform } from 'react-native'
import { Icon } from 'native-base';
import ImageCropPicker from 'react-native-image-crop-picker';
import Colors from '../constants/color';

const NLCropperImagePicker = ({ onFileSelected }) => {

    const processImage = (image) => {
        image.type = image.mime
        image.uri = image.path
        image.uploadPath = image.path
        if (Platform.OS == "android") {
            image.uploadPath = image.path.replace("file://", "");
        }
        onFileSelected(image)
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: (Dimensions.get('screen').height / 100) * 10 }}>
            <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.s_blue, padding: '2%', borderRadius: 50 }} onPress={() => {
                ImageCropPicker.openCamera({ cropping: true, width: 1350, height: 1350 })
                    .then(processImage);
            }}>
                <Icon type="FontAwesome" name="camera" style={{ fontSize: 28, color: Colors.s_blue }} />
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.s_blue, padding: '2%', borderRadius: 50 }} onPress={() => {

                ImageCropPicker.openPicker({ cropping: true, mediaType: "photo", width: 1350, height: 1350 })
                    .then(processImage);
            }}>
                <Icon type="FontAwesome" name="photo" style={{ fontSize: 28, color: Colors.s_blue }} />
            </TouchableOpacity>
        </View>
    );
}

export default NLCropperImagePicker;