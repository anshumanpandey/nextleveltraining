import React, { Component } from 'react'
import {View,StatusBar,FlatList} from 'react-native'
import Header from '../../components/header/Header'
import BookCard from './components/BookCard'
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

class Booking extends Component {
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
        <FlatList
           horizontal={false}
           data={[1,2,3,4,5,6,7,8]}
           keyExtractor={item=>item.id}
           renderItem={({item})=>(
             <BookCard/>
           )}
          />
      </View>
    )
  }
}

export default Booking
