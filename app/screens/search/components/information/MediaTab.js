import React from 'react';
import {View, FlatList} from 'react-native';
import {Data} from '../../../home/components/data';
import PostCard from '../../../home/components/PostCard';

const MediaTab = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', marginTop: 10}}>
      <FlatList
        horizontal={false}
        style={{width: '100%', height: '100%'}}
        data={Data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <PostCard
            item={item}
            onClickItem={() => {}}
            onPressOfComment={() => {}}
          />
        )}
      />
    </View>
  );
};

export default MediaTab;
