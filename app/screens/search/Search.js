import React, { Component, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Icon, Spinner, Tabs, Tab } from 'native-base';
import Header from '../../components/header/Header';
import useAxios from 'axios-hooks'
import Colors from '../../constants/color';
import { useGlobalState } from '../../state/GlobalState';
import SearchResultItem from './SearchResultItem';
import PostCard from '../home/components/PostCard';
import moment from 'moment'


const NoResultMessage = () => <Text style={{ textAlign: 'center', fontSize: 22, marginTop: '10%'}}>No results</Text>

const Search = (props) => {
  const [keyword, setKeyword] = useState('')
  const [profile] = useGlobalState('profile')

  //TODO: add missing data for post for each coach
  const [searchCoachesReq, searchCoaches] = useAxios({
    url: `/Users/SearchPost`,
    method: 'POST',
    data: { playerId: profile.Id, search: keyword }
  })

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
        <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Players">
          <View style={{ padding: '2%' }}>
            {searchCoachesReq.data && searchCoachesReq.data.Players.length == 0 && <NoResultMessage />}
            {searchCoachesReq.data && searchCoachesReq.data.Players.length != 0 && searchCoachesReq.data.Players.map(r => <SearchResultItem {...r} />)}
          </View>

        </Tab>
        <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Coach">
          <View style={{ padding: '2%' }}>
            {searchCoachesReq.data && searchCoachesReq.data.Coaches.length == 0 && <NoResultMessage />}
            {searchCoachesReq.data && searchCoachesReq.data.Coaches.length != 0 && searchCoachesReq.data.Coaches.map(r => <SearchResultItem {...r} />)}
          </View>
        </Tab>
        <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Hashtags">
          {searchCoachesReq.data && searchCoachesReq.data.Posts.length == 0 && <NoResultMessage />}
          {searchCoachesReq.data && searchCoachesReq.data.Posts.length != 0 && searchCoachesReq.data.Posts.map(p => {
            console.log(p)
            return {
              id: p.Id,
              name: p.Header,
              time: moment(p.CreatedDate).format('DD MMM HH:mm'),
              description: p.Body,
              createdBy: p.CreatedBy,
              profileImage: p.ProfileImage,
              comments: p.Comments || [],
              likes: p.Likes || [],
              imageUri: p.MediaURL ? p.MediaURL : undefined
            }
          }).map(r => <PostCard item={r} />)}
        </Tab>
      </Tabs>
    </View>
  );
}

export default Search;
