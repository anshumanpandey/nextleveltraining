import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import moment from 'moment';
import PostCard from '../../../home/components/PostCard';
import AsyncStorage from '@react-native-community/async-storage';
import { Spinner } from 'native-base';
import Colors from '../../../../constants/color';

const MediaTab = ({ posts = [], selectedTab }) => {
  const [parsed, setParsed] = useState(false);
  const [postToShow, setPostToShow] = useState([]);

  useEffect(() => {
    const p = posts
    .sort((a,b) => moment(a.CreatedDate).format('YYYYMMDD') - moment(b.CreatedDate).format('YYYYMMDD'))
    .map(p => {
      return AsyncStorage.getItem(`post-${p.Id}-file`)
        .then(fileString => {
          console.log(p)
          const j = {
            id: p.Id,
            name: p.Header,
            time: moment(p.CreatedDate).format('DD MMM HH:mm'),
            description: p.Body,
            createdBy: p.CreatedBy,
            profileImage: p.ProfileImage,
            comments: p.Comments || [],
            likes: p.Likes || [],
          }

          if (p.MediaURL) {
            j.fileType = "image"
            if (p.MediaURL.includes('MOV')) {
              j.fileType = "video"
            }
            j.imageUri = p.MediaURL
          } else if (fileString) {
            const jsonFile = JSON.parse(fileString)
            j.imageUri = jsonFile.file.uri
            j.fileType = jsonFile.file.type
          }
          return j
        })
    })

    Promise.all(p)
      .then(posts => {
        setPostToShow(posts)
        setParsed(true)
      })
  }, [selectedTab])

  return (
    <View style={{ flex: 1, backgroundColor: 'white', marginTop: 10 }}>
      {!parsed && <Spinner color={Colors.s_yellow} size={48} />}
      <FlatList
        horizontal={false}
        refreshing={!parsed}
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
