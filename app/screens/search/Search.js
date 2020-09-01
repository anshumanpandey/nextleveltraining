import React, { Component, useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Icon, Spinner, Tabs, Tab } from 'native-base';
import Header from '../../components/header/Header';
import useAxios from 'axios-hooks'
import Colors from '../../constants/color';
import { useGlobalState } from '../../state/GlobalState';
import PostCard from '../home/components/PostCard';
import moment from 'moment'
import PostSearchCard from './components/subcomponents/PostSearchCard';
import { FlatList } from 'react-native-gesture-handler';
import NavigationService from '../../navigation/NavigationService';
import getDistance from 'geolib/es/getDistance';

const NoResultMessage = () => <Text style={{ textAlign: 'center', fontSize: 22, marginTop: '10%' }}>No results</Text>

const Search = (props) => {
  const [keyword, setKeyword] = useState('')
  const [profile] = useGlobalState('profile')

  //TODO: add missing data for post for each coach
  const [searchCoachesReq, searchCoaches] = useAxios({
    url: `/Users/SearchPost`,
    method: 'POST',
    data: { playerId: profile?.Id, search: keyword }
  }, { manual: true })

  useEffect(() => {
    searchCoaches({ data: { playerId: profile?.Id, search: keyword } })
    const focusListener = props.navigation.addListener('didFocus', () => {
      searchCoaches({ data: { playerId: profile?.Id, search: keyword } })
    });
    return () => {
      focusListener?.remove();
    }
  }, [])

  let TabsName = ["Player", "Coach"]
  let propsToIterate = ["Players", "Coaches"]
  let screensToNavigate = ["PlayerInfo", "Information"]

  if (profile?.Role == "Player") {
    TabsName = ["Coach", "Player"]
    propsToIterate = ["Coaches", "Players"]
    screensToNavigate = ["Information", "PlayerInfo"]
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
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
                    playerId: profile?.Id,
                    search: keyword
                  }
                })
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
      <Tabs tabBarUnderlineStyle={{ backgroundColor: Colors.s_blue }}>
        <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading={TabsName[0]}>
          <View style={{ padding: '2%' }}>
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[0]].length == 0 && <NoResultMessage />}
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[0]].length != 0 && <FlatList
              keyExtractor={(item) => item.Id}
              data={searchCoachesReq.data[propsToIterate[0]]
                .sort((a,b) => {
                  if (propsToIterate[0] == "Player" || !a.Lat || !a.Lng || !b.Lat || !b.Lng || !profile?.Lat || !profile?.Lng) return 0

                  const distanceToCoachA = getDistance(
                    { latitude: profile?.Lat, longitude: profile?.Lng, },
                    { latitude: a.Lat, longitude: a.Lng }
                  )

                  const distanceToCoachB = getDistance(
                    { latitude: profile?.Lat, longitude: profile?.Lng, },
                    { latitude: b.Lat, longitude: b.Lng }
                  )

                  console.log("distanceToCoachA",distanceToCoachA)
                  console.log("distanceToCoachA",distanceToCoachA)
            
                  return distanceToCoachA - distanceToCoachB
                })
                } renderItem={({ item }) => <PostSearchCard hideCoachLevel={true} hideAddress={true} onPress={() => NavigationService.navigate(screensToNavigate[0], { player: item, ...item })} {...item} hideHeartIcon={true} />} />}
          </View>
        </Tab>
        <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading={TabsName[1]}>
          <View style={{ padding: '2%' }}>
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[1]].length == 0 && <NoResultMessage />}
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[1]].length != 0 && <FlatList
              keyExtractor={(item) => item.Id}
              data={searchCoachesReq
                .data[propsToIterate[1]]
                .sort((a,b) => {
                  if (propsToIterate[1] == "Player" || !a.Lat || !a.Lng || !b.Lat || !b.Lng || !profile?.Lat || !profile?.Lng) return 0
                  
                  const distanceToCoachA = getDistance(
                    { latitude: profile?.Lat, longitude: profile?.Lng, },
                    { latitude: a.Lat, longitude: a.Lng }
                  )

                  const distanceToCoachB = getDistance(
                    { latitude: profile?.Lat, longitude: profile?.Lng, },
                    { latitude: b.Lat, longitude: b.Lng }
                  )
            
                  return distanceToCoachA - distanceToCoachB
                })
              } renderItem={({ item }) => <PostSearchCard hideAddress={true} onPress={() => NavigationService.navigate(screensToNavigate[1], { player: item, ...item })} {...item} hideHeartIcon={true} />} />}
          </View>
        </Tab>

        <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Hashtags">
          {searchCoachesReq.data && searchCoachesReq.data.Posts.length == 0 && <NoResultMessage />}
          {searchCoachesReq.data && searchCoachesReq.data.Posts.length != 0 && (
            <FlatList
              keyExtractor={(item) => item.Id}
              data={searchCoachesReq.data.Posts
                .map(p => {
                  const j = {
                    id: p.Id,
                    name: p.Header,
                    time: moment(p.CreatedDate).format('DD MMM HH:mm'),
                    description: p.Body,
                    createdBy: p.CreatedBy,
                    profileImage: p.ProfileImage,
                    comments: p.Comments || [],
                    likes: p.Likes || [],
                    imageUri: p.MediaURL,
                  }

                  if (p.MediaURL) {
                    j.fileType = "image"
                    if (p.MediaURL.includes('MOV') || p.MediaURL.includes('mp4')) {
                      j.fileType = "video"
                    }
                  }
                  return j

                })}
              renderItem={({ item }) => <PostCard item={item} />} />
          )}


        </Tab>
      </Tabs>
    </View>
  );
}

export default Search;
