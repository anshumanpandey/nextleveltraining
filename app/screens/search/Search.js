import React, { Component, useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon, Spinner, Tabs, Tab, Button } from 'native-base';
import Header from '../../components/header/Header';
import useAxios from 'axios-hooks'
import Colors from '../../constants/color';
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import PostCard from '../home/components/PostCard';
import moment from 'moment'
import PostSearchCard from './components/subcomponents/PostSearchCard';
import Modal from 'react-native-modal';
import NavigationService from '../../navigation/NavigationService';
import getDistance from 'geolib/es/getDistance';

const NoResultMessage = () => <Text style={{ textAlign: 'center', fontSize: 22, marginTop: '10%' }}>No results</Text>

const FilterModal = ({ isModalVisible, onClose }) => {
  const initialsValues = { orderBy: null, rate: null }
  const [filterValues, setFilterValues] = useState({ ...initialsValues, orderBy: 'asc' })

  const starStyles = { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '20%'}
  const normalStyles = { borderRadius: 25, width: '45%', padding: '3%', marginBottom: '1%', borderColor: '#00000005', borderWidth: 0, color: '#00000040', backgroundColor: '#00000005' }
  const selectedStyles = { borderRadius: 25, width: '45%', padding: '3%', marginBottom: '1%', borderColor: Colors.nl_yellow, borderWidth: 1, color: '#00000095', backgroundColor: `${Colors.nl_yellow}30` }

  const resolveStyles = (selected) => {
    if (selected) return selectedStyles
    return normalStyles
  }


  const setFilterValueFor = (category, val) => {
    setFilterValues(prev => {
      let newValue = { [category]: val }

      if (category == 'rate') {
        newValue = { [category]: prev[category] == val ? 0 : val }
      }
      return {
        ...prev,
        ...newValue
      }
    })
  }
  return (
    <Modal style={{ alignItems: 'center' }} isVisible={isModalVisible} onBackdropPress={() => onClose()}>
      <View style={{ padding: '3%', flexGrow: 0.6, backgroundColor: 'white', height: '40%', width: '80%' }}>
        <Text style={{ fontSize: 24 }}>Filter by</Text>

        <View style={{ justifyContent: 'space-around', flex: 1, marginTop: '5%', backgroundColor: '#00000001' }}>
          <View>
            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Distance</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => setFilterValueFor('orderBy', 'asc')} style={[resolveStyles(filterValues.orderBy == 'asc')]}>
                <Text style={{ padding: '1%', textAlign: 'center', color: resolveStyles(filterValues.orderBy == 'asc').color }}>Nearest ones</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterValueFor('orderBy', 'desc')} style={[resolveStyles(filterValues.orderBy == 'desc')]}>
                <Text style={{ padding: '1%', textAlign: 'center', color: resolveStyles(filterValues.orderBy == 'desc').color }}>Farest ones</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Rate</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              <TouchableOpacity onPress={() => setFilterValueFor('rate', 1)} style={[resolveStyles(filterValues.rate == 1), starStyles]}>
                <Text style={{ padding: '1%' }}>1</Text>
                <Icon
                  type="AntDesign"
                  name="star"
                  style={{
                    fontSize: 14,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterValueFor('rate', 2)} style={[resolveStyles(filterValues.rate == 2), starStyles]}>
                <Text style={{ padding: '1%', textAlign: 'center' }}>2</Text>
                <Icon
                  type="AntDesign"
                  name="star"
                  style={{
                    fontSize: 14,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterValueFor('rate', 3)} style={[resolveStyles(filterValues.rate == 3), starStyles]}>
                <Text style={{ padding: '1%', textAlign: 'center' }}>3</Text>
                <Icon
                  type="AntDesign"
                  name="star"
                  style={{
                    fontSize: 14,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterValueFor('rate', 4)} style={[resolveStyles(filterValues.rate == 4), starStyles]}>
                <Text style={{ padding: '1%', textAlign: 'center' }}>4</Text>
                <Icon
                  type="AntDesign"
                  name="star"
                  style={{
                    fontSize: 14,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterValueFor('rate', 5)} style={[resolveStyles(filterValues.rate == 5), starStyles]}>
                <Text style={{ padding: '1%', textAlign: 'center' }}>5</Text>
                <Icon
                  type="AntDesign"
                  name="star"
                  style={{
                    fontSize: 14,
                  }}
                />
              </TouchableOpacity>
            </View>

          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (filterValues.orderBy) {
              onClose({ orderBy: filterValues.orderBy })
            }
            if (filterValues.rate) {
              onClose({ rate: filterValues.rate })
            }
          }}
          style={[{ height: 40, backgroundColor: Colors.s_blue, justifyContent: 'center' }]}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Filter</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
}

const Search = (props) => {
  const [keyword, setKeyword] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [orderingType, setOrderingType] = useState({ orderBy: 'asc' });
  const [profile] = useGlobalState('profile')

  //TODO: add missing data for post for each coach
  const [searchCoachesReq, searchCoaches] = useAxios({
    url: `/Users/SearchPost`,
    method: 'POST',
    data: { playerId: profile?.Id, search: keyword }
  }, { manual: true })

  const [getconnectedUserReq, refetch] = useAxios({
    url: '/Users/GetConnectedUsers',
  }, { manual: true })

  useEffect(() => {
    if (getconnectedUserReq.loading == false) {
      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.CONNECTED_USER, state: getconnectedUserReq.data })
    }
  }, [getconnectedUserReq.loading])

  useEffect(() => {
    searchCoaches({ data: { playerId: profile?.Id, search: keyword } })
    const focusListener = props.navigation.addListener('didFocus', () => {
      searchCoaches({ data: { playerId: profile?.Id, search: keyword } })
    });
    return () => {
      focusListener?.remove();
    }
  }, [])

  const tabStyle = { color: Colors.s_blue }
  const activeTabStyle = { color: Colors.nl_yellow }
  let TabsName = ["Players", "Coaches"]
  let propsToIterate = ["Players", "Coaches"]
  let screensToNavigate = ["PlayerInfo", "Information"]

  if (profile?.Role == "Player") {
    TabsName = ["Coaches", "Players"]
    propsToIterate = ["Coaches", "Players"]
    screensToNavigate = ["Information", "PlayerInfo"]
  }

  const [currentTab, setCurrentTab] = useState({ i: TabsName[0] == "Coaches" ? 0 : 1 })

  const displayFilter = () => {
    return currentTab.i == 0 && TabsName[0] == "Coaches" || currentTab.i == 1 && TabsName[1] == "Coaches"
  }

  const rateFilter = (coach, val) => {
    return coach.Rate == val
  }

  const distanceFilter = (a, b, order = 'asc') => {
    const distanceToCoachA = getDistance(
      { latitude: profile?.Lat, longitude: profile?.Lng, },
      { latitude: a.Lat, longitude: a.Lng }
    )

    const distanceToCoachB = getDistance(
      { latitude: profile?.Lat, longitude: profile?.Lng, },
      { latitude: b.Lat, longitude: b.Lng }
    )

    if (order == 'asc') return distanceToCoachA - distanceToCoachB
    if (order == 'desc') return distanceToCoachB - distanceToCoachA
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            borderColor: '#DEDEDE',
            borderWidth: 1,
            paddingHorizontal: 7,
            marginHorizontal: 10,
            borderRadius: 10,
            width: displayFilter() ? '85%' : '95%',
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
              backgroundColor: Colors.nl_yellow,
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
        {displayFilter() && (
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon
              onPress={() => {
                setModalVisible(true);
              }}
              type="AntDesign"
              name="filter"
              style={{
                color: Colors.s_blue,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <Tabs onChangeTab={(current) => setCurrentTab(current)} tabBarUnderlineStyle={{ backgroundColor: Colors.nl_yellow }}>
        <Tab textStyle={tabStyle} activeTextStyle={activeTabStyle} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading={TabsName[0]}>
          <View style={{ padding: '2%' }}>
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[0]].length == 0 && <NoResultMessage />}
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[0]].length != 0 && <FlatList
              keyExtractor={(item) => item.Id}
              data={searchCoachesReq.data[propsToIterate[0]]
                .sort((a, b) => {
                  if (propsToIterate[0] == "Player" || !a.Lat || !a.Lng || !b.Lat || !b.Lng || !profile?.Lat || !profile?.Lng) return 0

                  if (orderingType.orderBy) {
                    return distanceFilter(a, b, orderingType.orderBy)
                  }
                  return 0
                })
                .filter(coach => {
                  if (propsToIterate[0] == "Player") return true
                  if (orderingType.rate) {
                    return rateFilter(coach, orderingType.rate)
                  }

                  return true
                })
              } renderItem={({ item }) => <PostSearchCard hideCoachLevel={true} hideAddress={true} onPress={() => NavigationService.navigate(screensToNavigate[0], { player: item, ...item })} {...item} hideHeartIcon={true} />} />}
          </View>
        </Tab>
        <Tab textStyle={tabStyle} activeTextStyle={activeTabStyle} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading={TabsName[1]}>
          <View style={{ padding: '2%' }}>
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[1]].length == 0 && <NoResultMessage />}
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[1]].length != 0 && <FlatList
              keyExtractor={(item) => item.Id}
              data={searchCoachesReq
                .data[propsToIterate[1]]
                .sort((a, b) => {
                  if (propsToIterate[1] == "Player" || !a.Lat || !a.Lng || !b.Lat || !b.Lng || !profile?.Lat || !profile?.Lng) return 0

                  if (orderingType.orderBy) {
                    return distanceFilter(a, b, orderingType.orderBy)
                  }
                  return 0
                })
                .filter(coach => {
                  if (propsToIterate[1] == "Player") return true
                  if (orderingType.rate) {
                    return rateFilter(coach, orderingType.rate)
                  }

                  return true
                })
              } renderItem={({ item }) => <PostSearchCard hideAddress={true} onPress={() => NavigationService.navigate(screensToNavigate[1], { player: item, ...item })} {...item} hideHeartIcon={true} />} />}
          </View>
        </Tab>

        <Tab textStyle={tabStyle} activeTextStyle={activeTabStyle} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Hashtags">
          {searchCoachesReq.data && searchCoachesReq.data?.Featured?.length == 0 && <NoResultMessage />}
          {searchCoachesReq.data && searchCoachesReq.data?.Featured?.length != 0 && (
            <FlatList
              keyExtractor={(item) => item.Id}
              data={searchCoachesReq?.data
                ?.Featured
                .sort((a, b) => {
                  if (!a.Lat || !a.Lng || !b.Lat || !b.Lng || !profile?.Lat || !profile?.Lng) return 0

                  if (orderingType.orderBy) {
                    return distanceFilter(a, b, orderingType.orderBy)
                  }
                  return 0
                })
              }
              renderItem={({ item }) => <PostSearchCard item={item} />} />
          )}


        </Tab>
      </Tabs>
      <FilterModal onClose={(ordering) => {
        setOrderingType(ordering)
        setModalVisible(false)
      }} isModalVisible={isModalVisible} />
    </View>
  );
}

export default Search;
