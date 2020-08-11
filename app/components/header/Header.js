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
          style={{ marginLeft: '3%'}}
          onPress={() => props.toggleDrawer()}
        >
          {hasFullProfile(profile) ? <Icon name="menu" type="Entypo" style={styles.header_menu_icon} color="black" /> : undefined}
        </TouchableOpacity>
        {props.isNotificationScreen &&
            <Text style={{ fontSize:20,
            fontWeight:"bold",marginLeft:40}}>Notifications</Text>
          }
        {props.hideCreatePost != true && hasFullProfile(profile) &&<TouchableOpacity
        style={{ width: '85%'}}
          onPress={() => props.navigate(screen.CreatePost)}
        >
          <View style={{ flexDirection: 'row', width: '100%',borderWidth: 1, borderColor: Colors.s_blue, padding: '3%',borderRadius: 10, justifyContent: 'center', alignItems:'center'}}>
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
