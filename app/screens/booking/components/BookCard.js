import React from 'react';
import {View,Text} from 'react-native'
import styles from './styles'
import {Icon} from 'native-base'

const BookCard =() => {
  return (
    <View style={{flexDirection:'row',padding:10,borderBottomColor:'#DEDEDE',borderBottomWidth:1,backgroundColor:'white'}}>
      <View style={styles.book_arrow_view}>
        <Icon type="AntDesign" name="arrowright" style={{fontSize:20,color:'white'}}/>
      </View>
      <View style={{marginLeft:10}}>
          <Text style={{fontSize:16,color:'#0F2F80'}}>Oder Paid</Text>
          <Text style={{fontWeight:'500',marginTop:5}}>John James</Text>
          <View style={{marginTop:5}}>
              <Text>106 Richmond Road England United Kingdom</Text>
              <View style={{flexDirection:'row',marginTop:5}}>
                  <Text style={{fontWeight:'500',color:"#0F2F80"}}>Season for:</Text>
                  <Text style={{marginLeft:5}}>Jan 20 ,09:00-11:00</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:5}}>
                  <Text style={{fontWeight:'500',color:"#0F2F80"}}>Job fees:</Text>
                  <View style={{flexDirection:'row',marginLeft:5}}>
                      <Text>{'\u00A3'}</Text>
                      <Text>200/per hour</Text>
                  </View>
              </View>
          </View>
      </View>
    </View>
  );
}

export default BookCard
