import React from 'react';
import {View, FlatList} from 'react-native';
import {Data} from '../../../home/components/data';
import ReviewCard from '../information/ReviewCard';
import { Text } from 'native-base';
import useAxios from 'axios-hooks'

const ReviewTab = ({ coachId }) => {
  const [reviewReq, refetch] = useAxios({
    url: `/Users/GetReviews/${coachId}`,
  })

  console.log(reviewReq.data)

  return (
    <View style={{flex: 1, backgroundColor: 'white', marginTop: 10}}>
      <FlatList
        ListEmptyComponent={
          <Text style={{ padding: '5%', textAlign: 'center', fontSize: 14 }}>No Reviews for this coach yet.</Text>
        }
        refreshing={reviewReq.loading}
        onRefresh={() => refetch()}
        horizontal={false}
        style={{width: '100%', height: '100%'}}
        data={reviewReq.data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ReviewCard item={item} />}
      />
    </View>
  );
};

export default ReviewTab;
