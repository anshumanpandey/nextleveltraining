import React, { Component } from 'react'
import {View,Text,Image,TouchableHighlight,TouchableOpacity,ScrollView,TextInput} from 'react-native'
import Images from '../../constants/image'
import styles from './styles.js';
import NavigationService from '../../navigation/NavigationService';
import Screens from '../../utils/screen';


class Signup extends Component {

  componentDidMount(){
   
  }
  render() {
    return (
      <ScrollView style={styles.signup_layout}>
      <View style={styles.signup_container}>
        <View style={styles.signup_logo_view}>
           <Image source={Images.Mlogo}/>
           <Text style={styles.signup_logo_text}>Sign Up as Player</Text>
         </View>
         <View style={styles.signup_info_input_view}>
            <View style={styles.signup_info_view}>
              <TextInput
                placeholder="Full Name"
                keyboardType="default"
              />
            </View>
            <View style={styles.signup_info_view}>
              <TextInput
                placeholder="Postcode"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.signup_info_view}>
              <TextInput
                placeholder="Email ID"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.signup_info_view}>
              <TextInput
                placeholder="Mobile Number"
                keyboardType='numeric'
              />
            </View>
            <View style={styles.signup_info_view}>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>

         </View>
         <View style={styles.signup_btn_view}>
            <TouchableOpacity
             style={styles.signup_btn_player}
             onPress={()=>NavigationService.navigate(Screens.LandingPage)}
            >
              <View style={styles.signup_btn_player_view}>
                <Text style={styles.signup_player_text}>Join Now</Text>
              </View>
            </TouchableOpacity>
         </View>
         <View style={styles.signup_other_view}>
               <View style={styles.signup_line}>
                 <Text style={styles.signup_continue}>Or Continue with</Text>
               </View>
               <View style={styles.signup_other_social_view}>
                   <TouchableOpacity
                     style={styles.fb_btn_view}
                   >
                       <Text style={styles.fb_title}>Facebook</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                     style={styles.google_btn_view}
                    
                   >
                       <Text style={styles.google_title}>Google +</Text>
                   </TouchableOpacity>
               </View>    
         </View>
      </View>
      </ScrollView>
    )
  }
}

export default Signup