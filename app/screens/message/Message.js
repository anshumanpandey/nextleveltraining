import React from 'react'

// import { ApiCall } from '../config/Constant';
// import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import { View, Text, Dimensions, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import sendImage from '../../assets/images/send-button.png'
import { axiosInstance } from '../../api/AxiosBootstrap';
export default class Message extends React.Component {

  chatFlatList = null

  constructor(props) {
    super(props)
    this.state = {
      user1_id: props.navigation.getParam("SenderId"),
      user2_id: props.navigation.getParam("RecieverId"),
      chat_id: props.navigation.getParam("SenderId") > props.navigation.getParam("RecieverId") ? props.navigation.getParam("SenderId") + props.navigation.getParam("RecieverId") : props.navigation.getParam("RecieverId") + props.navigation.getParam("SenderId"),
      data: {},
      messages: [],
      text: '',
      _isTyping:false,
      // timer: null,
      keyboardOffset: 0,
      textMessage: '',
      isScroll: true
    }
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    console.disableYellowBox = true;
    this.getChat()

    database()
    .ref('/' + this.state.chat_id + '/status')
    .set({
      online: 'true'
    })
    .then(() => console.log('Data set.'));

  }
  componentWillUnmount() {
    database()
    .ref('/' + this.state.chat_id + '/status')
    .set({
      online: 'false'
    })
    .then(() => console.log('Data set.'));
  }

  _keyboardDidShow = (event) => {
    this.setState({
      keyboardOffset: event.endCoordinates.height,
    })
  }

  _keyboardDidHide = () => {
    this.setState({
      keyboardOffset: 0,
    })
  }

  _isTyping = (typing) => {


   if(this.typingTimer !== null ) {
  clearTimeout(this.typingTimer)


   }
  
  database()
    .ref('/' + this.state.chat_id + '/status')
    .set({
      [this.state.user1_id]:
      {typing: 'true'}
    })
    .then(() => console.log('Data set.'));

    this.typingTimer = setTimeout(() => {
      database()
      .ref('/' + this.state.chat_id + '/status')
      .set({
        [this.state.user1_id]:
        {typing: 'false'}
      })
      .then(() => console.log('Data set.'));
        }, 2000)
    
  }


  sendMessage = async (message) => {
    const newReference = database()
      .ref('/' + this.state.chat_id + '/messages')
      .push();

    const params = {
      'sender_id': this.state.user1_id + '',
      'recever_id': this.state.user2_id + '',
      'message': message + '',
      'timestamp': Date.now() + '',
      'id': newReference.key
    }

    newReference
      .set(params)
      .then(() => this.onSendApi());
  }
   onSendApi = async () => {
     const config = {
       url: '/Users/SendMessage',
       method: 'POST',
   }
       const p = axiosInstance({
           ...config,
           data: {
             "text": this.state.textMessage,
             "receiverId": this.props.navigation.getParam("ReceiverId")  ===  this.props.navigation.getParam("SenderId") ? this.props.navigation.getParam("SenderId") : this.props.navigation.getParam("ReceiverId"),
             "senderId":  this.props.navigation.getParam("SenderId"),
             "sentDate": new Date()
         }
       }).then((r) => { 
         console.log(r,'hheeee')
           if(r.data && r.data.length !== 0){ 
             console.log(r.data,'here')
             
               }
           })
           this.setState({
            textMessage: ''
          }) 
            
     
   }

  getChat = async () => {
    // const { navigation } = this.props;
    // const data = navigation.getParam('data');
    this.setState({
      isLoading: true
    })
    database()
    .ref('/' + this.state.chat_id + '/status')
    // .limitToLast(1)
    .on('value', snapshot => {
      console.log('User data: ', snapshot.val()[this.state.user2_id]);
      if(typeof snapshot.val()[this.state.user2_id] !== 'undefined'){
        if(typeof snapshot.val()[this.state.user2_id].typing !== "undefined") {
        this.setState({
          _isTyping: snapshot.val()[this.state.user2_id].typing == 'true'
        })
      }
      }
     

      // setTimeout(() => {
      //   { this.chatFlatList != null && this.chatFlatList.scrollToEnd({ animated: true }) }
      // }, 500)
    });


      database()
      .ref('/' + this.state.chat_id + '/messages')
      // .limitToLast(1)
      .on('value', snapshot => {
        console.log('User data: ', snapshot);
        let values = [];
        snapshot.forEach((child) => {
          values.push(child.val());
        });

        var messages = [...this.state.messages]
        // messages.push(snapshot.val())
        for(var i=0;i<values.length;i++) {
          var isAlreadyExist = false
          for(var j=0;j<messages.length;j++) {
            if(values[i].id == messages[j].id) {
              isAlreadyExist = true
            }
          }
          if(!isAlreadyExist) {
            messages = [values[i], ...messages]
          }
        }

        this.setState({
          messages: messages
        })

        // setTimeout(() => {
        //   { this.chatFlatList != null && this.chatFlatList.scrollToEnd({ animated: true }) }
        // }, 500)
      });
  }

  onSend(message) {
    this.sendMessage(message)
  }

  utcDate(date) {
    // var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1
      }}>
        {/* <KeyboardAvoidingView style={{
          flex: 1
        }}
          behavior='padding'
          enabled={Platform.OS == 'ios'}> */}
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',

          }}>
          <View style={{
            height: 44,
            // backgroundColor: colors.APPCOLOR,//'#414141',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <TouchableOpacity style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
              onPress={() => {
                // AsyncStorage.setItem('isChat', 'false')
                this.props.navigation.navigate('Message')
              }}>
              <Image style={{
                height: 26,
                width: 26,
                tintColor: 'black'
              }}
                resizeMode='contain'
                source={require('../../assets/images/back-icon.png')} />
            </TouchableOpacity>
            <Text style={{
             // √
             // fontSize: 17,
              // fontWeight: '600',
              //textAlign: 'center',
             // marginRight: 40,
             // flex: 1..
            }}>Chat   </Text>
            {this.state._isTyping &&  <Text style={{color:"black"}}>Typing.. </Text>}
          
         
          </View>
          <View style={{
            flex: 1,
            paddingBottom: 20,
            overflow: 'hidden'
          }}>
            <FlatList
              ref={(ref) => {
                this.chatFlatList = ref
              }}
              style={{
                // flex: 1,
                paddingTop: 0,
                overflow: 'visible',
                paddingBottom:10

                
              }}
              inverted={true}
              keyExtractor={item => item.id}
              data={this.state.messages}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    {item.sender_id == this.state.user1_id ? this.senderMessage(item, index) : this.receverMessage(item, index)}
                  </View>
                )

              }} />
          </View>

         

          <View style={{
            height: 60,
            backgroundColor: 'lightgray',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: Platform.OS == 'ios' ? this.state.keyboardOffset : 0
          }}>
            <TextInput style={{
              height: 40,
              marginLeft: 10,
              backgroundColor: 'white',
              borderRadius: 5,
              flex: 1,
              paddingHorizontal: 10,
              fontSize: 15,
            }}
              placeholder='Type your message'
              value={this.state.textMessage}
              onChangeText={(value) => {
                this._isTyping(true)
                this.setState({
                  textMessage: value
                })
              }}
              // autoFocus={true}
              autoCorrect={false} />
            <TouchableOpacity style={{
              justifyContent: 'center',
              marginHorizontal: 10,
              backgroundColor:"#0F2F80",
              width:45,
              alignItems:"center",
              height:35
            }}
              onPress={() => {
                if (this.state.textMessage != '') {
                  this.onSend(this.state.textMessage)
                }
              }}
            >
          <Image source={sendImage} style={{height:20,width:20}}/>
            </TouchableOpacity>
          </View>
        </View>
        {/* </KeyboardAvoidingView> */}
        {/* {this.state.isLoading && (
          <Loader size='small' />
        )} */}
      </SafeAreaView>
    )
  }

  senderMessage(item, index) {
    var { height, width } = Dimensions.get('window');
    return (
      <View style={{
        alignItems: 'flex-end'
      }}>
        <View style={{
          backgroundColor: '#0F2F80',
          marginHorizontal: 15,
          marginBottom: 5,
          padding: 10,
          borderRadius: 15,
          borderBottomRightRadius: 0
        }}>
          <Text style={{
            fontSize: 18,
            color: 'white'
          }}>
            {item.message}
          </Text>
          <Text style={{
            fontSize: 12,
            color: 'white',
            fontWeight: '300',
            // width: 90
          }}>
            {moment(item.created_at).format('DD-MM-YYYY') == moment(new Date()).format('DD-MM-YYYY') ? moment(item.created_at).format('hh:mm a') : moment(item.created_at).format('hh:mm a DD-MM-YYYY')}
          </Text>
        </View>
      </View>
    )
  }
  receverMessage(item, index) {
    var { height, width } = Dimensions.get('window');
    return (
      <View style={{
        alignItems: 'flex-start'
      }}>
        <View style={{
          backgroundColor: 'lightgray',
          marginHorizontal: 15,
          marginBottom: 5,
          padding: 10,
          borderRadius: 15,
          borderBottomLeftRadius: 0
        }}>
          <Text style={{
            fontSize: 18,
            color: 'black'
          }}>
            {item.message}
          </Text>
          <Text style={{
            fontSize: 12,
            color: 'black',
            fontWeight: '300',
            // width: 90
          }}>
            {moment(item.created_at).format('DD-MM-YYYY') == moment(new Date()).format('DD-MM-YYYY') ? moment(item.created_at).format('hh:mm a') : moment(item.created_at).format('hh:mm a DD-MM-YYYY')}
          </Text>
        </View>
      </View>
    )
  }
}