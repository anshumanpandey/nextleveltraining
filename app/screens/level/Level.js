import React, { Component, useEffect, useState } from 'react'
import {View,Text,Image,TouchableHighlight,TouchableOpacity} from 'react-native'
import Images from '../../constants/image'
import {LogoText,SignupPlayer,SignupCoach,CheckText,SigninText} from './LevelTexts'
import styles from './styles.js';
import NavigationService from '../../navigation/NavigationService';
import Screens from '../../utils/screen';
import AsyncStorage from '@react-native-community/async-storage';

const Level = () => {
  useEffect(() => {
    AsyncStorage.getItem('role')
    .then((r) => {
      if (!r) return 
      NavigationService.navigate(Screens.Login)
    })
  },[])

  return (
    <View style={styles.level_container}>
      <View style={styles.level_logo_view}>
         <Image source={Images.Logo} style={{width:150,height:150}}/>
         <Text style={styles.level_logo_text}>{LogoText}</Text>
       </View>
       <View style={styles.level_btn_view}>
          <TouchableOpacity
           style={styles.level_btn_player}
           onPress={()=> NavigationService.navigate(Screens.SignUp, { role: "Coach"})}
          >
            <View style={styles.level_btn_player_view}>
              <Image source={Images.PlayerIcon} style={styles.level_btn_icon_size}/>
              <Text style={styles.level_player_text}>{SignupPlayer}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
           style={styles.level_btn_coach}
           onPress={()=> NavigationService.navigate(Screens.SignUp, { role: "Coach"})}
          >
            <View style={styles.level_btn_player_view}>
              <Image source={Images.CoachIcon} style={styles.level_btn_icon_size}/>
              <Text style={styles.level_player_text}>{SignupCoach}</Text>
            </View>
          </TouchableOpacity>
       </View>
       <View style={styles.level_other_view}>
             <View style={styles.level_line}></View>
             <View style={styles.level_other_check_view}>
               <Text style={styles.level_check_text}>{CheckText}</Text>
               <TouchableHighlight
                onPress={()=> NavigationService.navigate(Screens.Login)}
               >
                  <Text style={styles.level_signin_text}>{SigninText}</Text>
               </TouchableHighlight>
              
             </View>
            
       </View>
    </View>
  )
}

export default Level
