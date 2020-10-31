import React, { Component, useEffect, useState } from 'react'
import { View, Text, Image, Alert, TouchableOpacity, ScrollView, Platform } from 'react-native'
var jwtDecode = require('jwt-decode');
import Images from '../../constants/image'
import styles from './styles.js';
import Colors from '../../constants/color';
import NavigationService from '../../navigation/NavigationService';
import Screens from '../../utils/screen';

const AskFeatured = (props) => {

  return (
    <View style={styles.level_container}>
      <View style={styles.level_logo_view}>
        <Image source={Images.Logo} style={{ width: 150, height: 150 }} />
        <Text style={styles.level_logo_text}>1 week on feature tab. Expose your profile to the wider audience which includes post on social media.</Text>
      </View>
      <View style={styles.level_btn_view}>
        <TouchableOpacity
          style={styles.level_btn_player}
          onPress={() => NavigationService.navigate(Screens.SignUp, { isFeatured: true,role: props.navigation.getParam("role", "Player") })}
        >
          <View style={styles.level_btn_player_view}>
            <Text style={styles.level_player_text}>Go Featured</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.level_btn_coach, { backgroundColor: Colors.nl_yellow }]}
          onPress={() => NavigationService.navigate(Screens.SignUp, { isFeatured: false,role: props.navigation.getParam("role", "Coach") })}
        >
          <View style={styles.level_btn_player_view}>
            <Text style={styles.level_player_text}>Not Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AskFeatured;