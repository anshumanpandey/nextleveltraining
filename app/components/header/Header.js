import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {Icon} from 'native-base'

import styles from './styles'
import screen from '../../utils/screen'
import {useGlobalState} from '../../state/GlobalState'
import Colors from '../../constants/color'
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess'

const Header = (props) => {
  const [profile] = useGlobalState('profile')

  return (
    <View style={styles.header_layout}>
      <View style={styles.header_item_container}>
        {props.menu ? (
          <TouchableOpacity
            style={{marginLeft: '3%'}}
            onPress={() => props.toggleDrawer()}>
            {HasCompletedVerificationProcess(profile) ? (
              <Icon
                name="menu"
                type="Entypo"
                style={styles.header_menu_icon}
                color="black"
              />
            ) : undefined}
          </TouchableOpacity>
        ) : (
          <View style={{marginLeft: '10.5%'}} />
        )}
        {props.title && (
          <Text
            style={{
              zIndex: -2,
              position: 'absolute',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              width: '100%',
            }}>
            {props.title}
          </Text>
        )}
        {props.hideCreatePost != true &&
          HasCompletedVerificationProcess(profile) && (
            <TouchableOpacity
              style={{width: '70%', marginLeft: 5}}
              onPress={() => props.navigate(screen.CreatePost)}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderWidth: 1,
                  borderColor: Colors.s_blue,
                  padding: '3%',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="edit"
                  type="FontAwesome"
                  style={{fontSize: 20, color: 'gray', marginRight: '2%'}}
                />
                <Text style={{color: 'gray'}}>Post about training here...</Text>
              </View>
            </TouchableOpacity>
          )}
        {props.customButton && props.customButton()}
      </View>
    </View>
  )
}

export default Header
