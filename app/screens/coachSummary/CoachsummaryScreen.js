import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import useAxios from 'axios-hooks';
import { Spinner, Text, Icon } from 'native-base';
import { setHours, parseISO, getHours } from 'date-fns';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LoaderImage from 'react-native-image-progress';
import Header from '../../components/header/Header';
import { useGlobalState } from '../../state/GlobalState';
import { CalendarListItem } from '../Calendar/CalendarScreen';
import NavigationService from '../../navigation/NavigationService';

const CoachsummaryScreen = (props) => {
  const [idx, setIdx] = useState(0);
  const listRef = useRef();
  const [profile] = useGlobalState('profile');
  const [{ data = {}, loading }, getSummary] = useAxios({
    url: `/users/GetCoachSummary/${profile?.Id}`,
  }, { manual: true });
  const isCoach = profile?.Role === 'Coach';

  useEffect(() => {
    const focusListener = props.navigation.addListener('didFocus', () => {
      getSummary();
    });

    return () => focusListener.remove();
  }, []);

  if (loading === true || data.Level === undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          hideCreatePost
          toggleDrawer={props.navigation.toggleDrawer}
          navigate={props.navigation.navigate}
        />
        <Spinner size={40} color="#2D7AF0" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
      <Header
        hideCreatePost
        title="Summary"
        toggleDrawer={props.navigation.toggleDrawer}
        navigate={props.navigation.navigate}
        customButton={() => (
          <Icon
            onPress={() => props.navigation.goBack()}
            type="Feather"
            name="arrow-left"
            style={{
              position: 'absolute',
              left: 15,
              fontSize: 22,
              zIndex: 1,
              color: '#2D7AF0',
            }}
          />
        )}
      />
      <View style={{ padding: '5%' }}>
        <Text
          style={{
            color: '#2D7AF0',
            fontSize: 22,
            fontWeight: 'bold',
            borderBottomWidth: 1,
            borderBottomColor: '#2D7AF0',
          }}>
          Welcome {profile?.FullName}
        </Text>
        <View style={{ paddingTop: 10 }}>
          <Text style={{ marginBottom: 10 }}>Profile Summary</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <View
              style={{
                width: '33%',
                padding: '2%',
                borderWidth: 2,
                borderColor: '#2D7AF0',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#2D7AF0',
                  fontSize: 30,
                }}>
                {data.Level}
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 14 }}>
                {isCoach ? 'Coach Level' : 'Player Level'}
              </Text>
            </View>
            <View
              style={{
                width: '33%',
                padding: '2%',
                borderWidth: 2,
                borderColor: '#2D7AF0',
                borderRadius: 8,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#2D7AF0',
                  fontSize: 30,
                }}>
                {isCoach ? data.BookingsCount : profile?.Coaches?.length || 0}
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 14 }}>
                {isCoach ? 'Player Under Coaching' : 'Coaches Played With'}
              </Text>
            </View>
            <View
              style={{
                width: '33%',
                padding: '2%',
                borderWidth: 2,
                borderColor: '#2D7AF0',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#2D7AF0',
                  fontSize: 30,
                }}>
                {isCoach ? data.Players?.length : profile?.Bookings?.length || 0}
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 14 }}>
                {isCoach ? 'All Time Players Coaching' : 'Bookings'}
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            color: '#2D7AF0',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {isCoach ? 'Players Quick View' : 'Coaches Quick View'}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {isCoach && data.Players && data.Players.length != 0 && (
            <TouchableWithoutFeedback
              onPress={() => {
                setIdx((i) => {
                  let newIdx = i - 3;
                  if (newIdx < 0) {
                    newIdx = 0;
                  }
                  listRef.current?.scrollToIndex({
                    index: newIdx,
                    animated: true,
                  });
                  return newIdx;
                });
              }}>
              <View style={{ justifyContent: 'center' }}>
                <Icon type="AntDesign" name="left" />
              </View>
            </TouchableWithoutFeedback>
          )}
          {isCoach && (
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              ref={(r) => (listRef.current = r)}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    paddingVertical: '5%',
                  }}>
                  Currently you dont have players
                </Text>
              }
              data={data.Players}
              keyExtractor={(i) => i.Id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate('PlayerInfo', { player: item })
                  }
                  style={{
                    flexGrow: 1,
                    padding: '1%',
                    flexDirection: 'column',
                  }}>
                  <LoaderImage
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 60 / 2,
                      borderColor: '#2D7AF0',
                      borderWidth: 1,
                    }}
                    imageStyle={{
                      width: 60,
                      height: 60,
                      borderRadius: 60 / 2,
                      borderColor: '#2D7AF0',
                      borderWidth: 1,
                    }}
                    source={{ uri: item.ProfileImage }}
                  />
                  <Text>{item.FullName}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          {isCoach && data.Players && data.Players.length != 0 && (
            <TouchableWithoutFeedback
              onPress={() => {
                setIdx((i) => {
                  let newIdx = i + 3;
                  if (newIdx > data?.Players?.length || 0) {
                    newIdx = 11;
                  }
                  listRef.current?.scrollToIndex({
                    index: newIdx,
                    animated: true,
                  });
                  return newIdx;
                });
              }}>
              <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <Icon type="AntDesign" name="right" />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>

        <View
          style={{
            paddingTop: '5%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{ color: '#2D7AF0', fontSize: 20, fontWeight: 'bold' }}>
            Upcoming Training
          </Text>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('Calendar')}>
            <Text style={{ color: '#2D7AF0', fontSize: 16, fontWeight: 'bold' }}>
              View more
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ListEmptyComponent={
            <Text
              style={{
                fontSize: 18,
                paddingVertical: '5%',
              }}>
              Currently you dont have uncoming matches
            </Text>
          }
          data={data.Bookings?.sort((a, b) => {
            const dateA = setHours(
              parseISO(a.BookingDate),
              getHours(parseISO(a.FromTime)),
            );
            const dateB = setHours(
              parseISO(b.BookingDate),
              getHours(parseISO(b.ToTime)),
            );
            return dateB - dateA;
          }).slice(0, 3)}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(i) => i.Id}
          renderItem={({ item }) => (
            <CalendarListItem
              {...item}
              Address={item.Location.LocationAddress}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};
export default CoachsummaryScreen;
