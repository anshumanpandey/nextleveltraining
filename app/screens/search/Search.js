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


const NoResultMessage = () => <Text style={{ textAlign: 'center', fontSize: 22, marginTop: '10%' }}>No results</Text>

const Search = (props) => {
  const [keyword, setKeyword] = useState('')
  const [profile] = useGlobalState('profile')

  //TODO: add missing data for post for each coach
  const [searchCoachesReq, searchCoaches] = useAxios({
    url: `/Users/SearchPost`,
    method: 'POST',
    data: { playerId: profile.Id, search: keyword }
  }, { manual: true })

  useEffect(() => {
    searchCoaches({ data: { playerId: profile.Id, search: keyword } })
    const focusListener = props.navigation.addListener('didFocus', () => {
      searchCoaches({ data: { playerId: profile.Id, search: keyword } })
    });
    return () => {
      focusListener?.remove();
    }
  }, [])

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
        {profile.Role == "Player" && (
          <>
            <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Coach">
              <View style={{ padding: '2%' }}>
                {searchCoachesReq.data && searchCoachesReq.data.Coaches.length == 0 && <NoResultMessage />}
                {searchCoachesReq.data && searchCoachesReq.data.Coaches.length != 0 && <FlatList keyExtractor={(item) => item.Id} data={searchCoachesReq.data.Coaches} renderItem={({ item }) => <PostSearchCard onPress={() => NavigationService.navigate("Information", { ...item })} {...item} />} />}
              </View>
            </Tab>
            <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Players">
              <View style={{ padding: '2%' }}>
                {searchCoachesReq.data && searchCoachesReq.data.Players.length == 0 && <NoResultMessage />}
                {searchCoachesReq.data && searchCoachesReq.data.Players.length != 0 && <FlatList keyExtractor={(item) => item.Id} data={searchCoachesReq.data.Players} renderItem={({ item }) => <PostSearchCard onPress={() => NavigationService.navigate("PlayerInfo", { player: item })} {...item} />} />}
              </View>

            </Tab>
          </>
        )}
        {profile.Role == "Role" && (
          <>
            <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Players">
              <View style={{ padding: '2%' }}>
                {searchCoachesReq.data && searchCoachesReq.data.Players.length == 0 && <NoResultMessage />}
                {searchCoachesReq.data && searchCoachesReq.data.Players.length != 0 && <FlatList keyExtractor={(item) => item.Id} data={searchCoachesReq.data.Players} renderItem={({ item }) => <PostSearchCard onPress={() => NavigationService.navigate("PlayerInfo", { player: item })} {...item} />} />}
              </View>

            </Tab>
            <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Coach">
              <View style={{ padding: '2%' }}>
                {searchCoachesReq.data && searchCoachesReq.data.Coaches.length == 0 && <NoResultMessage />}
                {searchCoachesReq.data && searchCoachesReq.data.Coaches.length != 0 && <FlatList keyExtractor={(item) => item.Id} data={searchCoachesReq.data.Coaches} renderItem={({ item }) => <PostSearchCard onPress={() => NavigationService.navigate("Information", { ...item })} {...item} />} />}
              </View>
            </Tab>
          </>
        )}

        <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Hashtags">
          {searchCoachesReq.data && searchCoachesReq.data.Posts.length == 0 && <NoResultMessage />}
          {searchCoachesReq.data && searchCoachesReq.data.Posts.length != 0 && searchCoachesReq.data.Posts
            .map(p => ({
              id: p.Id,
              name: p.Header,
              time: moment(p.CreatedDate).format('DD MMM HH:mm'),
              description: p.Body,
              createdBy: p.CreatedBy,
              profileImage: p.ProfileImage,
              comments: p.Comments || [],
              likes: p.Likes || [],
              imageUri: p.MediaURL
            }))
            .map(r => <PostCard item={r} />)}
        </Tab>
      </Tabs>
    </View>
  );
}

export default Search;
