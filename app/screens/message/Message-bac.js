// import React, { useState, useCallback, useEffect } from 'react'
// import {View,StatusBar} from 'react-native'
// import {Icon} from 'native-base'
// import Header from '../../components/header/Header'
// import { GiftedChat ,Send,InputToolbar,Bubble} from 'react-native-gifted-chat'
// import { axiosInstance } from '../../api/AxiosBootstrap';
// import { useGlobalState } from '../../state/GlobalState';
// const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
// const Message =(props) =>{
//   const [messages, setMessages] = useState([]); 

//   const [value, setValue] = useState("");
//   const [profile] = useGlobalState('profile');
  
//   useEffect(() => {
//     console.log( props.navigation.getParam("ReceiverId"),'rec1ID')
//     console.log( props.navigation.getParam("SenderId"),'send1ID')
//     console.log(profile.Id,'profileID')
//     //const intervalId = setInterval(() => {
//       getMessages()
//   // }, 4000);

//    //return () => clearInterval(intervalId);
  
//   }, [])



//   const getMessages = () => {
//    // alert("hii")
   
//     const config = {
//       url: '/Users/GetMessagesBySenderAndReciever',
//       method: 'POST',
//   }
//       const p = axiosInstance({
//           ...config,
//           data: {
//             "receiverId": props.navigation.getParam("ReceiverId"),
//             "senderId":  props.navigation.getParam("SenderId"),
//         }
//       }).then((r) => {
//        // console.log(r,'sssss')
//           if(r.data && r.data.length !== 0){
//             var message = []
//             r.data.map((item) => {
//                       messages.push({
//                         _id: parseInt(item.Id),
//                         text: item.Text + '',
//                         createdAt: item.SentDate,
//                         user: {
//                           _id: parseInt(item.SenderId),
//                           // name: item.sfn + '',
//                           avatar: item.ImageUrl,
//                         },
//                       })
//                     })
//             setMessages(previousMessages => GiftedChat.append(previousMessages, message))
//               }else{
//                 setMessages([])
//               }
//           })

//   }

//   const customInputToolbar = props => {
//     return (

//        <InputToolbar
//         {...props}
//         containerStyle={{
//           marginLeft: 10,
//           marginRight: 10,
//           borderWidth: 0.5,
//           borderColor: 'grey',
//           borderRadius: 25
//         }}
//       />
  
     
//     );
//   };
//  const renderBubble = (props)=> {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#0F2F80'
//           }
//         }}
//       />
//     )
//   }
//   const onSend = useCallback((sendMessage = []) => {
//    // console.log(props.navigation.getParam("SenderId") ===  profile.Id ? profile.Id : props.navigation.getParam("ReceiverId"),'senderId')
//     const config = {
//       url: '/Users/SendMessage',
//       method: 'POST',
//   }
//       const p = axiosInstance({
//           ...config,
//           data: {
//             "text": sendMessage[0].text,
//             "receiverId": props.navigation.getParam("ReceiverId")  ===  profile.Id ? props.navigation.getParam("SenderId") : props.navigation.getParam("ReceiverId"),
//             "senderId":  profile.Id,
//             "sentDate": sendMessage[0].createdAt
//         }
//       }).then((r) => {
//           if(r.data && r.data.length !== 0){ 
//             // r.data.map((item) => {
//             //   sendMessage.push({
//             //     _id: parseInt(item.ReceiverId),
//             //     text: item.Text + '',
//             //     createdAt: item.SentDate,
//             //     user: {
//             //       _id: parseInt(profile.Id),
//             //       // name: item.sfn + '',
//             //       avatar: item.ImageUrl,
//             //     },
//             //   })
//             // })
//             setMessages(previousMessages => GiftedChat.append(previousMessages, sendMessage))
//               }
//           })
    
//   }, [])
 
//   return (
//     <View style={{flex:1,backgroundColor:'white'}}>
//       {/* <View style={{
//             width: "100%",
//             height: STATUS_BAR_HEIGHT,
//             backgroundColor: "#0F2F80"
//            }}>
//             <StatusBar
//                 barStyle="light-content"
//             />
//         </View> */}
//         <Header toggleDrawer={props.toggleDrawer} navigate={props.navigation.navigate}/>
//      <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       renderInputToolbar={props => customInputToolbar(props)}
//       renderBubble={props=>renderBubble(props)}
//     //  onInputTextChanged={text => setValue(text)}
//      // text={value}
//       renderSend={(props) => (
//         <Send
//           {...props}
//           containerStyle={{
//             height: 50,
//             width: 60,
//             justifyContent: 'center',
//             alignItems: 'center',
//             // backgroundColor:'#0F2F80',
//             borderRadius:5
//           }}
//         >
//           <Icon type="MaterialIcons" name="send" style={{color:'#0F2F80'}}/>
//         </Send>
//        )
//       }
//       user={{
//         _id: parseInt(profile.Id),
//         avatar:profile.ProfileImage
//       }}
//       alwaysShowSend={true}
//     />
//     </View>
   
//   )
// }

// export default Message