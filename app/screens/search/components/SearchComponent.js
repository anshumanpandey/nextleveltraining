import React, { Component, useState, useEffect } from 'react';
import { View, FlatList, TextInput, Image } from 'react-native';
import { Icon, Spinner } from 'native-base';
import PostSearchCard from './subcomponents/PostSearchCard';
import Images from '../../../constants/image';
import NavigationService from '../../../navigation/NavigationService';
import { useGlobalState } from '../../../state/GlobalState';
import useAxios from 'axios-hooks'
import Header from '../../../components/header/Header';

const SearchComponent = (props) => {
  const [profile] = useGlobalState('profile')
  const [keyword, setKeyword] = useState('')
  const [coaches, setCoaches] = useState([])

  //TODO: add missing data for post for each coach
  const [searchCoachesReq, searchCoaches] = useAxios({
    url: `/Users/GetCoaches`,
    method: 'POST',
  }, { manual: true })

  const fnInit = () => {
    if (profile.Role == "Player") {
      searchCoaches({
        data: {
          playerId: profile.Id,
          search: keyword
        }
      })
      .then((r) => setCoaches([...r.data]))
    }
  }

  useEffect(() => {
    fnInit()
    const unsubscribe = props.navigation.addListener('tabPress', e => {
      fnInit()
    });

    return unsubscribe;
  }, [props.navigation]);

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
            width: '95%',
          }}>
          <TextInput
            onChangeText={(txt) => setKeyword(txt)}
            value={keyword}
            placeholder="Search..."
            style={{
              fontSize: 14,
              height: 40,
              color: 'black'
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
            {!searchCoachesReq.loading && (
              <Icon
                onPress={() => {
                  searchCoaches({
                    data: {
                      playerId: profile.Id,
                      search: keyword
                    }
                  })
                    .then((r) => setCoaches([...r.data]))
                }}
                type="EvilIcons"
                name="search"
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  color: 'white',
                }}
              />
            )}

            {searchCoachesReq.loading && (
              <Spinner size={26} />
            )}
          </View>
        </View>
      </View>
      <FlatList
        horizontal={false}
        data={coaches.filter(c => c.Status != 'Saved').map(i => ({...i, Role: "Coach"}))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostSearchCard
            {...item}
            onPress={() => NavigationService.navigate('Information', { ...item })}
            refreshCb={() => {
              searchCoaches({
                data: {
                  playerId: profile.Id,
                  search: keyword
                }
              })
                .then((r) => setCoaches([...r.data]))
            }}
          />
        )}
      />
    </View>
  );
}

export default SearchComponent;
