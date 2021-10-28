import React, { useState, useEffect, useRef } from 'react';
import { ScrollView,FlatList, View, TextInput, Text, Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native';
import useAxios from 'axios-hooks'
import { Icon, Spinner } from 'native-base';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Comments from './components/Comments';
import styles from './styles';
import { useGlobalState } from '../../state/GlobalState';
import HeaderTitleBack from '../../components/header/HeaderTitleBack';

const CommentsScreen = ({ navigation }) => {
  const listRef = useRef()
  const post = navigation.getParam("post")
  const [profile] = useGlobalState('profile')
  const [commentText, setCommentText] = useState()
  const [thisComments, setThisComments] = useState([])
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  console.log(keyboardHeight)

  const [commentReq, postComment] = useAxios({
    url: '/Users/SaveComment',
    method: 'POST',
  }, { manual: true })

  const [, getThisComments] = useAxios({
    url: `/Users/GetComments/${post.id}`,
  }, { manual: true })

  useEffect(() => {
    setThisComments([...post.comments])
    const focusListener = navigation.addListener('didFocus', () => {
      listRef.current?.scrollToEnd({ animated: true })
    });

    return () => {
      focusListener.remove()
    }
  }, [post.id])

  const onKeyboardWillShow = e => {
    setKeyboardHeight(300);
  };

  const onKeyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    // These listeners on ios are a little more snappy but not available on Android
    // If you want to use this on Android use keyboardDidShow/Hide
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
      Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);
    }

    return () => {
      if (Platform.OS === 'ios') {
        Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow);
        Keyboard.removeListener('keyboardWillHide', onKeyboardWillHide);
      }
    };
  }, []);

  let commentBody = (
    <Text style={{ textAlign: 'center', fontSize: 18, marginTop: '10%' }}>No comments</Text>
  );

  if (thisComments !== 0) {
    commentBody = (
      <FlatList
        ref={(r) => { listRef.current = r }}
        horizontal={false}
        data={thisComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Comments item={item} />}
        onLayout={() => listRef.current?.scrollToEnd({ animated: true })}
      />
    );
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: "white", paddingBottom: keyboardHeight }}
    >
      <HeaderTitleBack onBackPress={() => navigation.goBack()} navigation={navigation} navigate={navigation.navigate} />
      {commentBody}
      <View style={[styles.inputContainer, { height: Dimensions.get('screen').height * 0.1 }]}>
        <View style={styles.inputText}>
          <TextInput
            value={commentText}
            onChangeText={(r) => setCommentText(r)}
            placeholder="Type your comment"
            style={{ fontSize: 14, height: 42, color: "black" }}
          />
        </View>
        <View style={styles.arrow_icon}>
          {commentReq.loading && <Spinner color={Colors.s_yellow} />}
          {!commentReq.loading && (
            <Icon
              onPress={() => {
                const data = {
                  postId: post.id,
                  "text": commentText,
                  "commentedBy": profile.Id
                }
                postComment({ data })
                  .then(() => setCommentText(""))
                  .then(() => getThisComments())
                  .then((r) => {
                    setThisComments(r.data)
                    Keyboard.dismiss()
                    listRef.current?.scrollToEnd({ animated: true })
                  })
              }}
              name="send"
              type="MaterialIcons"
              style={{ marginLeft: 6, fontSize: 25, color: 'white' }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default CommentsScreen;
