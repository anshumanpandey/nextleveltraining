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

const FilterOptionItem = ({ onPress, selected, styles, children, text }) => {
  const normalStyles = { borderRadius: 25, width: '45%', padding: '3%', marginBottom: '1%', borderColor: '#00000005', borderWidth: 0, color: '#00000040', backgroundColor: '#00000005' }
  const selectedStyles = { borderRadius: 25, width: '45%', padding: '3%', marginBottom: '1%', borderColor: Colors.nl_yellow, borderWidth: 1, color: '#00000095', backgroundColor: `${Colors.nl_yellow}30` }

  return (
    <TouchableOpacity onPress={onPress} style={[selected ? selectedStyles : normalStyles, { ...styles }]}>
      {text ?
        <Text style={{ padding: '1%', textAlign: 'center', color: selected ? selectedStyles.color : normalStyles.color }}>{text}</Text>
        :
        children
      }
    </TouchableOpacity>
  );
}

const StartOptionItem = ({ onPress, selected, value }) => {
  const starStyles = { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '20%' }

  return (
    <FilterOptionItem onPress={onPress} selected={selected} styles={starStyles}>
      <Text style={{ padding: '1%', textAlign: 'center' }}>{value}</Text>
      <Icon
        type="AntDesign"
        name="star"
        style={{
          fontSize: 14,
        }}
      />
    </FilterOptionItem>
  );
}

const initialsValues = { orderBy: null, rate: null, dayOfWeek: [], level: null }

const UseFilters = () => {
  const [filterValues, setFilterValues] = useState({ ...initialsValues, orderBy: 'asc' })

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
  const addValueFor = (category, val) => {
    const selectedValues = filterValues[category]
    const uniqueValues = new Set(selectedValues)
    uniqueValues.has(val) ? uniqueValues.delete(val) : uniqueValues.add(val)

    setFilterValues(prev => ({ ...prev, [category]: Array.from(uniqueValues.values()) }))
  }

  const toggleValueFor = (category, val) => {
    setFilterValues(prev => ({ ...prev, [category]: prev[category] == val ? initialsValues[category] : val }))
  }

  const reset = () => {
    setFilterValues({ ...initialsValues, orderBy: 'asc' });
    return { ...initialsValues, orderBy: 'asc' }
  }

  return {
    filterValues,
    reset,
    setFilterValueFor,
    addValueFor,
    toggleValueFor
  }
}

const FilterModal = ({ isModalVisible, onClose }) => {
  const { filterValues, setFilterValueFor, reset,addValueFor, toggleValueFor } = UseFilters()
  return (
    <Modal style={{ alignItems: 'center' }} isVisible={isModalVisible} onBackdropPress={() => onClose()}>
      <View style={{ padding: '3%', flexGrow: 0.6, backgroundColor: 'white', minHeight: '85%', width: '80%' }}>
        <Text style={{ fontSize: 24 }}>Filter by</Text>

        <View style={{ justifyContent: 'space-around', flex: 1, marginTop: '5%', backgroundColor: '#00000001' }}>
          <View>
            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Distance</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <FilterOptionItem onPress={() => setFilterValueFor('orderBy', 'asc')} selected={filterValues.orderBy == 'asc'} text={"Nearest"} />
              <FilterOptionItem onPress={() => setFilterValueFor('orderBy', 'desc')} selected={filterValues.orderBy == 'desc'} text={"Farest"} />
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Availability</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              <FilterOptionItem
                onPress={() => addValueFor('dayOfWeek', 'Sunday')}
                selected={filterValues.dayOfWeek.includes('Sunday')}
                styles={{ width: '30%' }}
                text={"Sun"}
              />
              <FilterOptionItem
                onPress={() => addValueFor('dayOfWeek', 'Monday')}
                selected={filterValues.dayOfWeek.includes('Monday')}
                styles={{ width: '30%' }}
                text={"Mon"}
              />
              <FilterOptionItem
                onPress={() => addValueFor('dayOfWeek', 'Tuesday')}
                selected={filterValues.dayOfWeek.includes('Tuesday')}
                styles={{ width: '30%' }}
                text={"Tues"}
              />
              <FilterOptionItem
                onPress={() => addValueFor('dayOfWeek', 'Wednesday')}
                selected={filterValues.dayOfWeek.includes('Wednesday')}
                styles={{ width: '30%' }}
                text={"Wed"}
              />
              <FilterOptionItem
                onPress={() => addValueFor('dayOfWeek', 'Thursday')}
                selected={filterValues.dayOfWeek.includes('Thursday')}
                styles={{ width: '30%' }}
                text={"Thurs"}
              />
              <FilterOptionItem
                onPress={() => addValueFor('dayOfWeek', 'Friday')}
                selected={filterValues.dayOfWeek.includes('Friday')}
                styles={{ width: '30%' }}
                text={"Fri"}
              />
              <FilterOptionItem
                onPress={() => addValueFor('dayOfWeek', 'Saturday')}
                selected={filterValues.dayOfWeek.includes('Saturday')}
                styles={{ width: '30%' }}
                text={"Sat"}
              />
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 20, marginBottom: '3%' }}>Level</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              <FilterOptionItem
                onPress={() => toggleValueFor('level', 1)}
                selected={filterValues.level == 1}
                text={"Level 1"}
              />

              <FilterOptionItem
                onPress={() => toggleValueFor('level', 2)}
                selected={filterValues.level == 2}
                text={"Level 2"}
              />

              <FilterOptionItem
                onPress={() => toggleValueFor('level', 3)}
                selected={filterValues.level == 3}
                text={"Level 3"}
              />

              <FilterOptionItem
                onPress={() => toggleValueFor('level', 4)}
                selected={filterValues.level == 4}
                text={"Level 4"}
              />

              <FilterOptionItem
                onPress={() => toggleValueFor('level', 5)}
                selected={filterValues.level == 5}
                text={"Level 5"}
              />

          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, marginBottom: '3%' }}>Rate</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <StartOptionItem
              onPress={() => setFilterValueFor('rate', 1)}
              selected={filterValues.rate == 1}
              value={1}
            />

            <StartOptionItem
              onPress={() => setFilterValueFor('rate', 2)}
              selected={filterValues.rate == 2}
              value={2}
            />

            <StartOptionItem
              onPress={() => setFilterValueFor('rate', 3)}
              selected={filterValues.rate == 3}
              value={3}
            />

            <StartOptionItem
              onPress={() => setFilterValueFor('rate', 4)}
              selected={filterValues.rate == 4}
              value={4}
            />

            <StartOptionItem
              onPress={() => setFilterValueFor('rate', 5)}
              selected={filterValues.rate == 5}
              value={5}
            />
          </View>

        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          const res = { dayOfWeek: filterValues.dayOfWeek, level: filterValues.level }
          if (filterValues.orderBy) {
            res.orderBy = filterValues.orderBy
          }
          if (filterValues.rate) {
            res.rate = filterValues.rate
          }
          onClose(res)
        }}
        style={[{ height: 40, backgroundColor: Colors.s_blue, justifyContent: 'center', marginBottom: '5%', marginTop: '2%' }]}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onClose(reset())
        }}
        style={[{ height: 40, backgroundColor: Colors.s_blue, justifyContent: 'center' }]}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Reset</Text>
      </TouchableOpacity>

      </View>
    </Modal >
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
  }, [orderingType])

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
    return (currentTab.i == 0 && TabsName[0] == "Coaches") || (currentTab.i == 1 && TabsName[1] == "Coaches")
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

  const parseResults = (users) => {
    return users
    .sort((a, b) => {
      if (!a.Lat || !a.Lng || !b.Lat || !b.Lng || !profile?.Lat || !profile?.Lng) return 0

      if (orderingType.orderBy) {
        return distanceFilter(a, b, orderingType.orderBy)
      }
      return 0
    })
    .filter(coach => {
      if (coach.Role == "Player") return true
      if (orderingType.rate) {
        return rateFilter(coach, orderingType.rate)
      }

      return true
    })
    .filter(coach => {
      if (coach.Role == "Player") return true
      if (!orderingType.dayOfWeek || orderingType.dayOfWeek.length == 0) return true
      if (coach.Availabilities.length == 0) return false

      return coach.Availabilities.some(a => orderingType.dayOfWeek.find(dow => a.Day == dow) != null)

    })
    .filter(coach => {
      if (coach.Role == "Player") return true
      if (!orderingType.level) return true

      return coach.Level == orderingType.level
    })

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
              backgroundColor: Colors.s_blue,
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
            {searchCoachesReq.data && parseResults(searchCoachesReq.data[propsToIterate[0]]).length == 0 && <NoResultMessage />}
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[0]].length != 0 && <FlatList
              contentContainerStyle={{ backgroundColor: '#00000020' }}
              keyExtractor={(item) => item.Id}
              data={parseResults(searchCoachesReq.data[propsToIterate[0]])} renderItem={({ item }) => <PostSearchCard hideCoachLevel={true} hideAddress={true} onPress={() => NavigationService.navigate(screensToNavigate[0], { player: item, ...item })} {...item} hideHeartIcon={true} />} />}
          </View>
        </Tab>
        <Tab textStyle={tabStyle} activeTextStyle={activeTabStyle} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading={TabsName[1]}>
          <View style={{ padding: '2%' }}>
            {searchCoachesReq.data && parseResults(searchCoachesReq.data[propsToIterate[1]]).length == 0 && <NoResultMessage />}
            {searchCoachesReq.data && searchCoachesReq.data[propsToIterate[1]].length != 0 && <FlatList
              contentContainerStyle={{ backgroundColor: '#00000020' }}
              keyExtractor={(item) => item.Id}
              data={parseResults(searchCoachesReq.data[propsToIterate[1]])} renderItem={({ item }) => <PostSearchCard hideAddress={true} onPress={() => NavigationService.navigate(screensToNavigate[1], { player: item, ...item })} {...item} hideHeartIcon={true} />} />}
          </View>
        </Tab>

        <Tab textStyle={tabStyle} activeTextStyle={activeTabStyle} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Featured">
          {searchCoachesReq.data && searchCoachesReq.data?.Featured?.length == 0 && <NoResultMessage />}
          {searchCoachesReq.data && searchCoachesReq.data?.Featured?.length != 0 && (
            <FlatList
              contentContainerStyle={{ backgroundColor: '#00000020' }}
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
              renderItem={({ item }) => {
                return <PostSearchCard hideAddress={true} onPress={() => NavigationService.navigate(screensToNavigate[1], { player: item, ...item })} {...item} hideHeartIcon={true} />
              }} />
          )}


        </Tab>
      </Tabs>
      <FilterModal onClose={(ordering) => {
        ordering && setOrderingType(ordering)
        setModalVisible(false)
      }} isModalVisible={isModalVisible} />
    </View>
  );
}

export default Search;
