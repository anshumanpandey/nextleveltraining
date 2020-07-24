import React from 'react';
import {View, FlatList} from 'react-native';
import {Data} from '../../../home/components/data';
import ReviewCard from '../information/ReviewCard';
import { Text } from 'native-base';

const ReviewTab = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', marginTop: 10}}>
      <Text style={{ padding: '5%', textAlign: 'center', fontSize: 14 }}>No Reviews for this coach yet.</Text>

      {/*<FlatList
        horizontal={false}
        style={{width: '100%', height: '100%'}}
        data={Data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ReviewCard item={item} />}
      />*/}
    </View>
  );
};

export default ReviewTab;
