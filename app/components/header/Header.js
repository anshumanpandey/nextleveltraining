import React, {Component} from 'react';
import {View, TouchableOpacity, Text } from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import screen from '../../utils/screen'
import { useGlobalState } from '../../state/GlobalState';
import hasFullProfile from '../../utils/perType/profileResolver';
import Colors from '../../constants/color';

const Header = (props) => {
  const [profile] = useGlobalState('profile')

  return (
    <View style={styles.header_layout}>

      <View style={styles.header_item_container}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 10 }}
          onPress={() => props.toggleDrawer()}
        >
          {hasFullProfile(profile) ? <Icon name="menu" type="Entypo" style={styles.header_menu_icon} color="black" /> : undefined}
        </TouchableOpacity>

        {props.hideCreatePost != true && hasFullProfile(profile) &&<TouchableOpacity
          onPress={() => props.navigate(screen.CreatePost)}
        >
          <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.s_blue, padding: '3%',borderRadius: 25, justifyContent: 'center', alignItems:'center'}}>
            <Icon name="edit" type="FontAwesome" style={{ fontSize: 20, color: 'gray', marginRight: '2%'}} />
            <Text style={{ color: 'gray'}}>Post about training here...</Text>
          </View>
        </TouchableOpacity>}
        {props.customButton && props.customButton()}
      </View>
    </View>
  );
}

export default Header;
