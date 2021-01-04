import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
    privateDirectory: true
  },
};

export const pickImage = async () => {
  return new Promise((resolve) => {
    try {
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.uri};
          resolve(source);
        }
      });
    } catch (error) {
      console.log('Error saving data');
      return false;
    }
  });
};
