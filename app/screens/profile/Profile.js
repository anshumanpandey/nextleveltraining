import React, { Component } from 'react'
import {View,StatusBar,FlatList,Image,Text,ScrollView} from 'react-native'
import {Icon} from 'native-base'
import Header from '../../components/header/Header'
import Images from '../../constants/image';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

class Profile extends Component {
  render() {
    return (
      <View style={{flex:1}}>
          {/* <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: "#0F2F80"
        }}>
            <StatusBar
                barStyle="light-content"
            />
        </View> */}
        <Header toggleDrawer={this.props.toggleDrawer}/>
        <ScrollView>
        <View>
          <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
              <View style={{position:'relative'}}>
                <Image source={Images.MessiPlayer} style={{width:100,height:100,borderRadius:50}}/>
                <View  style={{position:'absolute',width:30,height:30,backgroundColor:'#0F2F80',borderRadius:15,right:0,top:3}}>
                   <Icon type="EvilIcons" name="pencil" style={{color:'white'}}/>
                </View>
              </View>
          </View>
        
          <View style={{backgroundColor:'white',padding:10,marginTop:30}}>
             <View style={{justifyContent:'space-between',display:'flex',flexDirection:'row'}}>
              <Text style={{fontSize:16,color:"#0F2F80"}}>About Me</Text>
              <Icon type="EvilIcons" name="pencil" style={{color:'#0F2F80'}}/>
              </View>
              <View style={{marginTop:20}}>
                {/* <Text>I'm a professional player .I like to play football and basketball.</Text> */}
              </View>
          </View>
          <View style={{backgroundColor:'white',padding:10,marginTop:20}}>
             <View style={{justifyContent:'space-between',display:'flex',flexDirection:'row'}}>
              <Text style={{fontSize:16,color:"#0F2F80"}}>Achievements</Text>
              <Icon type="EvilIcons" name="pencil" style={{color:'#0F2F80'}}/>
              </View>
              <View style={{marginTop:20}}>
                {/* <Text>I'm a professional player .I like to play football and basketball.</Text> */}
              </View>
          </View>
          <View style={{backgroundColor:'white',padding:10,marginTop:20}}>
             <View style={{justifyContent:'space-between',display:'flex',flexDirection:'row'}}>
              <Text style={{fontSize:16,color:"#0F2F80"}}>Teams</Text>
              <Icon type="EvilIcons" name="pencil" style={{color:'#0F2F80'}}/>
              </View>
              <View style={{marginTop:20}}>
                {/* <Text>I'm a professional player .I like to play football and basketball.</Text> */}
              </View>
          </View>
          <View style={{backgroundColor:'white',padding:10,marginTop:20}}>
             <View style={{justifyContent:'space-between',display:'flex',flexDirection:'row'}}>
              <Text style={{fontSize:16,color:"#0F2F80"}}>Upcoming Matches</Text>
              <Icon type="EvilIcons" name="pencil" style={{color:'#0F2F80'}}/>
              </View>
              <View style={{marginTop:20}}>
                {/* <Text>I'm a professional player .I like to play football and basketball.</Text> */}
              </View>
          </View>
          </View>
          </ScrollView>
       
      </View>
    )
  }
}

export default Profile
