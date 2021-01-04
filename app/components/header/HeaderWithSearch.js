import React from 'react';
import {View, TouchableOpacity, TextInput, Image} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';
import Images from '../../constants/image';

const HeaderWithSearch = ({navigation}) => {
  return (
    <View style={styles.header_layout}>
      <View style={styles.header_item_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="keyboard-arrow-left"
            type="MaterialIcons"
            color="black"
            style={styles.header_menu_icon}
          />
        </TouchableOpacity>
        <Image source={Images.KobePlayer} style={styles.profile_user} />
        <View style={styles.inputContainer}>
          <Icon
            name="edit"
            type="Feather"
            style={{marginLeft: 6, fontSize: 16, color: 'gray'}}
          />
          <View style={styles.inputText}>
            <TextInput
              placeholder="Post about training here..."
              style={{fontSize: 14, padding: 0}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="bell"
            type="EvilIcons"
            style={{fontSize: 30, color: 'white', marginRight: 10}}
          />
        </View>
      </View>
    </View>
  );
};

export default HeaderWithSearch;
