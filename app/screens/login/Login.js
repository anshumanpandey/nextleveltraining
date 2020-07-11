import React, { Component } from 'react'
import {View,Text,Image,TouchableHighlight,TouchableOpacity,ScrollView,TextInput} from 'react-native'
import Images from '../../constants/image'
import styles from './styles.js';


class Login extends Component {

  componentDidMount(){
   
  }
  render() {
    return (
      <ScrollView style={styles.login_layout}>
      <View style={styles.login_container}>
        <View style={styles.login_logo_view}>
           <Image source={Images.Mlogo}/>
           <Text style={styles.login_logo_text}>Sign In</Text>
         </View>
         <View style={styles.login_info_input_view}>
           
            <View style={styles.login_info_view}>
              <TextInput
                placeholder="Email ID"
                keyboardType="email-address"
              />
            </View> 
            <View style={styles.login_info_view}>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>

         </View>
         <View style={styles.login_forgot_view}>
           <Text style={styles.login_forgot_title}>Forgot Password?</Text>
         </View>
         <View style={styles.login_btn_view}>
            <TouchableOpacity
             style={styles.login_btn_player}
            >
              <View style={styles.login_btn_player_view}>
                <Text style={styles.login_player_text}>Join Now</Text>
              </View>
            </TouchableOpacity>
         </View>
         <View style={styles.login_other_view}>
               <View style={styles.login_line}>
                 <Text style={styles.login_continue}>Or Continue with</Text>
               </View>
               <View style={styles.login_other_social_view}>
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

export default Login