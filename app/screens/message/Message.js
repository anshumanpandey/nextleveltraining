import React, { useState, useCallback, useEffect } from 'react'
import {View,StatusBar} from 'react-native'
import {Icon} from 'native-base'
import Header from '../../components/header/Header'
import { GiftedChat ,Send,InputToolbar,Bubble} from 'react-native-gifted-chat'
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const Message =(props) =>{
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
  getMessages()
  }, [getMessages])



  const getMessages = () => {
    const config = {
      url: '/Users/GetMessagesBySenderAndReciever',
      method: 'POST',
  }
      const p = axiosInstance({
          ...config,
          data: {
            "senderID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "recieverID": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      }).then((r) => {
          if(r.data && r.data.length !== 0){
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
              }
          })

  }

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
    const config = {
      url: '/Users/GetLastMessage',
      method: 'POST',
  }
      const p = axiosInstance({
          ...config,
          data: {
            "senderID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "recieverID": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      }).then((r) => {
          if(r.data && r.data.length !== 0){
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
              }
          })
    
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
        <Header toggleDrawer={props.toggleDrawer} navigate={props.navigation.navigate}/>
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