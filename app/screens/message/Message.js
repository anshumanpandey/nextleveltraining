import React, { useState, useCallback, useEffect } from 'react'
import {View,StatusBar} from 'react-native'
import {Icon} from 'native-base'
import Header from '../../components/header/Header'
import { GiftedChat ,Send,InputToolbar,Bubble} from 'react-native-gifted-chat'
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const Message =(props) =>{
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello everyone!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Player',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  const customInputToolbar = props => {
    return (

       <InputToolbar
        {...props}
        containerStyle={{
          marginLeft: 10,
          marginRight: 10,
          borderWidth: 0.5,
          borderColor: 'grey',
          borderRadius: 25
        }}
      />
  
     
    );
  };
 const renderBubble = (props)=> {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0F2F80'
          }
        }}
      />
    )
  }
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
 
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      {/* <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: "#0F2F80"
           }}>
            <StatusBar
                barStyle="light-content"
            />
        </View> */}
        <Header toggleDrawer={props.toggleDrawer}/>
     <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderInputToolbar={props => customInputToolbar(props)}
      renderBubble={props=>renderBubble(props)}
      renderSend={(props) => (
        <Send
          {...props}
          containerStyle={{
            height: 50,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:'#0F2F80',
            borderRadius:5
          }}
        >
          <Icon type="MaterialIcons" name="send" style={{color:'#0F2F80'}}/>
        </Send>
       )
      }
      user={{
        _id: 1,
      }}
      alwaysShowSend={true}
    />
    </View>
   
  )
}

export default Message