import React, { Component, useState, useEffect, useRef } from 'react';
import { ScrollView, FlatList, View, TextInput, Text, Dimensions, Keyboard } from 'react-native';
import PostComment from './components/PostComment';
import Comments from './components/Comments';
import useAxios from 'axios-hooks'
import styles from './styles.js';
import { Icon, Spinner } from 'native-base';
import { useGlobalState } from '../../state/GlobalState';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from '../../components/header/Header';

const CommentsScreen = (props) => {
  const listRef = useRef()
  const post = props.navigation.getParam("post")
  const [profile] = useGlobalState('profile')
  const [commentText, setCommentText] = useState()
  const [thisComments, setThisComments] = useState([])

  const [commentReq, postComment] = useAxios({
    url: '/Users/SaveComment',
    method: 'POST',
  }, { manual: true })

  const [thisCommentsReq, getThisComments] = useAxios({
    url: `/Users/GetComments/${post.id}`,
  }, { manual: true })

  useEffect(() => {
    setThisComments(post.comments)
    const focusListener = props.navigation.addListener('didFocus', () => {
      listRef.current?.scrollToEnd({ animated: true })
    });

    return () => focusListener.remove()
  }, [])

  let commentBody = (
    <Text style={{ textAlign: 'center', fontSize: 18 }}>No comments</Text>
  );

  if (thisComments != 0) {
    commentBody = (
      <FlatList
        horizontal={false}
        style={{ marginBottom: 60 }}
        data={thisComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <Comments item={item} />}
      />
    );
  }
  return (
    <>
      <ScrollView innerRef={(r) => listRef.current = r} style={styles.home_container}>
        <Header hideCreatePost={true} navigation={props.navigation} navigate={props.navigation.navigate} />
        <PostComment item={post} />
        {commentBody}
      </ScrollView>
      <View style={[styles.inputContainer, { height: Dimensions.get('screen').height * 0.1 }]}>
        <View style={styles.inputText}>
          <TextInput
            value={commentText}
            onChangeText={(r) => setCommentText(r)}
            placeholder="Type your comment"
            style={{ fontSize: 14, height: 42 }}
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
                console.log(data)
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
    </>
  );
}

export default CommentsScreen;
