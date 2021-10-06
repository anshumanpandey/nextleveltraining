import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Images from '../../constants/image'
import { LogoText, SignupPlayer, SignupCoach } from './LevelTexts'
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import Screens from '../../utils/screen';
import Colors from '../../constants/color';

const Level = (props) => {
  const [, setRole] = useState();

  useEffect(() => {
    const focusListener = props.navigation.addListener('didFocus', () => {
      AsyncStorage.getItem('role')
        .then((r) => {
          console.log(r)
          if (!r) return
          setRole(r)
        })
    });

    AsyncStorage.getItem('role')
      .then((r) => {
        if (!r) return
        setRole(r)
        NavigationService.navigate(Screens.Login)
      })

    return () => focusListener.remove()
  }, [])

  return (
    <View style={styles.level_container}>
      <View style={styles.level_logo_view}>
        <Image source={Images.Logo} style={{ width: 150, height: 150 }} />
        <Text style={styles.level_logo_text}>{LogoText}</Text>
      </View>
      <View style={styles.level_btn_view}>
        <TouchableOpacity
          style={styles.level_btn_player}
          onPress={() => NavigationService.navigate(Screens.SignUp, { role: "Player" })}
        >
          <View style={styles.level_btn_player_view}>
            <Image source={Images.PlayerIcon} style={styles.level_btn_icon_size} />
            <Text style={styles.level_player_text}>{SignupPlayer}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.level_btn_coach, { backgroundColor: Colors.nl_yellow }]}
          onPress={() => NavigationService.navigate(Screens.SignUp, { role: "Coach" })}
        >
          <View style={styles.level_btn_player_view}>
            <Image source={Images.CoachIcon} style={styles.level_btn_icon_size} />
            <Text style={styles.level_player_text}>{SignupCoach}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login", { role: props.navigation.getParam('role', "Player"), isFeatured: props.navigation.getParam('isFeatured') })}>
          <View style={[styles.signup_other_view, { color: 'black', paddingTop: '5%', paddingBottom: '5%' }]}>
            <Text style={styles.signup_continue}>Already have an account? Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Level
