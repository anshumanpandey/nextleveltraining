import React, { Component } from 'react';
import { View, FlatList, TextInput, Image } from 'react-native';
import { Icon } from 'native-base';
import PostSearchCard from './subcomponents/PostSearchCard';
import Images from '../../../constants/image';
import NavigationService from '../../../navigation/NavigationService';
import { useGlobalState } from '../../../state/GlobalState';
import useAxios from 'axios-hooks'

const SearchComponent = () => {
  const [profile] = useGlobalState('profile')

  const [searchCoachesReq, searchCoaches] = useAxios({
    url: `/Users/GetCoaches/${profile.Id}`,
  })

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View
          style={{
            borderColor: '#DEDEDE',
            borderWidth: 1,
            paddingHorizontal: 7,
            marginHorizontal: 10,
            borderRadius: 10,
            width: '70%',
          }}>
          <TextInput
            placeholder="Search..."
            style={{
              fontSize: 14,
              height: 40,
            }}
          />

          <View
            style={{
              backgroundColor: '#0F2F80',
              width: 30,
              height: 40,
              padding: 17,
              position: 'absolute',
              right: -3,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Icon
              type="EvilIcons"
              name="search"
              style={{
                position: 'absolute',
                zIndex: 1,
                color: 'white',
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            marginRight: 20,
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Image source={Images.Filter} />
        </View>
      </View>
      <FlatList
        horizontal={false}
        data={searchCoachesReq.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostSearchCard
            onPress={() => NavigationService.navigate('Information')}
          />
        )}
      />
    </View>
  );
}

export default SearchComponent;
