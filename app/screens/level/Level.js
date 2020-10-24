import React, { Component, useEffect, useState } from 'react'
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import Images from '../../constants/image'
import { LogoText, SignupPlayer, SignupCoach, CheckText, SigninText } from './LevelTexts'
import styles from './styles.js';
import NavigationService from '../../navigation/NavigationService';
import Screens from '../../utils/screen';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../constants/color';

const Level = (props) => {
  const [role, setRole] = useState();

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
          onPress={() => NavigationService.navigate("AskFeatured", { role: "Player" })}
        >
          <View style={styles.level_btn_player_view}>
            <Image source={Images.PlayerIcon} style={styles.level_btn_icon_size} />
            <Text style={styles.level_player_text}>{SignupPlayer}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.level_btn_coach, { backgroundColor: Colors.nl_yellow }]}
          onPress={() => NavigationService.navigate("AskFeatured", { role: "Coach" })}
        >
          <View style={styles.level_btn_player_view}>
            <Image source={Images.CoachIcon} style={styles.level_btn_icon_size} />
            <Text style={styles.level_player_text}>{SignupCoach}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Level
