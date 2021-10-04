import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { Spinner } from 'native-base';
import useAxios from 'axios-hooks'
import Colors from '../../../../constants/color';
import PostCard from '../../../home/components/PostCard';

const ParsePost = (p) => AsyncStorage.getItem(`post-${p.Id}-file`)
  .then(fileString => {
    const j = {
      id: p.Id,
      name: p.Header,
      time: moment(p.CreatedDate).format('DD MMM HH:mm'),
      description: p.Body,
      createdBy: p.CreatedBy,
      profileImage: p.ProfileImage,
      comments: p.Comments || [],
      likes: p.Likes || [],
      width: p.Width,
      height: p.Height,
    }

    if (p.MediaURL) {
      j.fileType = "image"
      if (p.MediaURL.includes('MOV') || p.MediaURL.includes('mp4')) {
        j.fileType = "video"
      }
      j.imageUri = p.MediaURL
      console.log("nmedia yurl from mediatab", j.imageUri)
    } else if (fileString) {
      const jsonFile = JSON.parse(fileString)
      j.imageUri = jsonFile.file.uri
      j.fileType = jsonFile.file.type
    }
    return j
  })

const MediaTab = ({ posts = [], selectedTab, fetchPost }) => {
  const [parsed, setParsed] = useState(false);
  const [postToShow, setPostToShow] = useState([]);

  const [getPostReq, getPost] = useAxios({}, { manual: true })

  useEffect(() => {
    if (fetchPost) {
      getPost({ url: `/Users/GetPostsByUser/${fetchPost}` })
        .then(r => {
          const p = r.data.map(ParsePost)
          Promise.all(p)
            .then(posts => {
              setPostToShow(posts.sort((a, b) => moment(b.time, 'DD MMM HH:mm').unix() - moment(a.time, 'DD MMM HH:mm').unix()))
              setParsed(true)
            })
        })
    }

    const p = posts
      .map(ParsePost)

    Promise.all(p)
      .then(posts => {
        setPostToShow(posts.sort((a, b) => moment(b.time, 'DD MMM HH:mm').unix() - moment(a.time, 'DD MMM HH:mm').unix()))
        setParsed(true)
      })
  }, [selectedTab])

  return (
    <View style={{ flex: 1, backgroundColor: 'white', marginTop: 10 }}>
      {!parsed && <Spinner color={Colors.s_yellow} size={48} />}
      <FlatList
        horizontal={false}
        refreshing={!parsed || getPostReq.loading}
        onRefresh={() => null}
        ListEmptyComponent={<Text style={{ padding: '5%', textAlign: 'center', fontSize: 14 }}>No Post for this coach yet.</Text>}
        style={{ width: '100%', height: '100%' }}
        data={postToShow}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            onClickItem={() => { }}
            onPressOfComment={() => { }}
          />
        )}
      />
    </View>
  );
};

export default MediaTab;
