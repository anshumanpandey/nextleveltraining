import React, {Component} from 'react';
import {View, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import screen from '../../utils/screen'

class Header extends Component {
  render() {
    return (
      <View style={styles.header_layout}>

        <View style={styles.header_item_container}>
          <TouchableOpacity
            onPress={() => this.props.toggleDrawer()}
          >
            <Icon name="menu" type="Entypo" style={styles.header_menu_icon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigate(screen.CreatePost)}
          >
            <View style={{ flexDirection: 'row' }}>
              <Icon name='plus' type='EvilIcons' style={{ fontSize: 30, color: 'white', marginRight: 10 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Header;
