import React, { Component } from 'react'
import {View,TouchableOpacity,SafeAreaView, StatusBar} from 'react-native'
import {Icon} from 'native-base'
import styles from './styles'
class Header extends Component {
  render() {
    return (
      <View style={styles.header_layout}>
        
          <View style={styles.header_item_container}>
              <TouchableOpacity
               onPress={()=>this.props.toggleDrawer()}
              >
                 <Icon name="menu" type="Entypo" style={styles.header_menu_icon}/>
              </TouchableOpacity>
              <View style={{flexDirection:'row'}}>
                <Icon name='bell' type='EvilIcons' style={{fontSize:30,color:'white',marginRight:10}}/>
                {/* <Icon name='close' type='MaterialIcons' style={{fontSize:25,color:'white',marginRight:10}}/> */}
              </View>
              
          </View>
      </View>
    )
  }
}

export default Header
