import React, {Component} from 'react';
import {View, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import screen from '../../utils/screen'
import { useGlobalState } from '../../state/GlobalState';
import hasFullProfile from '../../utils/perType/profileResolver';

const Header = (props) => {
  const [profile] = useGlobalState('profile')

  return (
    <View style={styles.header_layout}>

      <View style={styles.header_item_container}>
        <TouchableOpacity
          onPress={() => props.toggleDrawer()}
        >
          {hasFullProfile(profile) ? <Icon name="menu" type="Entypo" style={styles.header_menu_icon} color="black" /> : undefined}
        </TouchableOpacity>

        {props.hideCreatePost != true && hasFullProfile(profile) &&<TouchableOpacity
          onPress={() => props.navigate(screen.CreatePost)}
        >
          <View style={{ flexDirection: 'row' }}>
            <Icon name='plus' type='EvilIcons' style={{ fontSize: 30, color: 'black', marginRight: 10 }} />
          </View>
        </TouchableOpacity>}
        {props.customButton && props.customButton()}
      </View>
    </View>
  );
}

export default Header;
