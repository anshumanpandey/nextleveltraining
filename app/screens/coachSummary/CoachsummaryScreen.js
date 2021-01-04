import React, { Component, useEffect, useRef, useState } from 'react'
import { View, Image, FlatList, TouchableWithoutFeedback, Dimensions } from 'react-native'
import Header from '../../components/header/Header'
import useAxios from 'axios-hooks'
import { Spinner, Text, Icon } from 'native-base'
import Colors from '../../constants/color'
import { useGlobalState } from '../../state/GlobalState'
import { CalendarListItem } from '../Calendar/CalendarScreen'
import { setHours, parseISO, getHours } from "date-fns"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import NavigationService from '../../navigation/NavigationService'
import LoaderImage from 'react-native-image-progress';
import Images from '../../constants/image'


const CoachsummaryScreen = (props) => {
    const [idx, setIdx] = useState(0)
    const listRef = useRef()
    const [profile] = useGlobalState('profile')
    const [{ data, loading, error }, getSummary] = useAxios({
        url: `/users/GetCoachSummary/${profile?.Id}`,
    })

    useEffect(() => {
        const focusListener = props.navigation.addListener('didFocus', () => {
            getSummary()
        });

        return () => focusListener.remove()
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
                <Spinner size={40} color={Colors.s_blue} />
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
            <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
            <View style={{ padding: '5%' }}>
                <Text style={{ color: Colors.s_blue, fontSize: 20, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
                    Welcome {profile?.FullName}
                </Text>
                <View style={{ paddingTop: '3%' }}>
                    <Text>Profile Summary</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '2%' }}>
                        <View style={{ width: '33%', padding: '2%', borderWidth: 2, borderColor: Colors.s_blue, borderRadius: 25 }}>
                            <Text style={{ textAlign: 'center', color: Colors.s_blue, fontSize: 30 }}>{data.Level}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 14 }}>Coach Level</Text>
                        </View>
                        <View style={{ width: '33%', padding: '2%', borderWidth: 2, borderColor: Colors.s_blue, borderRadius: 25, marginHorizontal: '2%' }}>
                            <Text style={{ textAlign: 'center', color: Colors.s_blue, fontSize: 30 }}>{data.BookingsCount}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 14 }}>Player Under Coaching</Text>
                        </View>
                        <View style={{ width: '33%', padding: '2%', borderWidth: 2, borderColor: Colors.s_blue, borderRadius: 25 }}>
                            <Text style={{ textAlign: 'center', color: Colors.s_blue, fontSize: 30 }}>{data.Players.length}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 14 }}>All Time Players Coaching</Text>
                        </View>
                    </View>
                </View>

                <Text style={{ paddingTop: '5%', color: Colors.s_blue, fontSize: 20, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
                    Players Quick View
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {data.Players && data.Players.length != 0 && (
                        <TouchableWithoutFeedback onPress={() => {
                            setIdx(i => {
                                let newIdx = i - 3
                                if (newIdx < 0 ) {
                                    newIdx = 0
                                }
                                listRef.current?.scrollToIndex({ index: newIdx, animated: true })
                                return newIdx
                            })
                        }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Icon type="AntDesign" name="left" />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    <FlatList
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ref={(r) => listRef.current = r}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={
                            <Text style={{ textAlign: 'center', fontSize: 18, paddingVertical: '5%' }}>
                                Currently you dont have players
                        </Text>
                        }
                        data={data.Players}
                        keyExtractor={i => i.Id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => NavigationService.navigate("PlayerInfo", { player: item })} style={{ flexGrow: 1, padding: '1%', flexDirection: 'column' }}>
                                    <LoaderImage
                                        style={{ width: 60, height: 60, borderRadius: 60 / 2, borderColor: Colors.s_blue, borderWidth: 1, }}
                                        imageStyle={{ width: 60, height: 60, borderRadius: 60 / 2, borderColor: Colors.s_blue, borderWidth: 1, }}
                                        source={{ uri: item.ProfileImage }} />
                                    <Text>{item.FullName}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    {data.Players && data.Players.length != 0 && (
                        <TouchableWithoutFeedback onPress={() => {
                            setIdx(i => {
                                let newIdx = i + 3
                                if (newIdx > data?.Players?.length || 0) {
                                    newIdx =  11
                                }
                                listRef.current?.scrollToIndex({ index: newIdx, animated: true })
                                return newIdx
                            })
                        }}>
                            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                                <Icon type="AntDesign" name="right" />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>

                <View style={{ paddingTop: '5%', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.2)', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ color: Colors.s_blue, fontSize: 20, fontWeight: 'bold' }}>
                        Upcoming Training
                    </Text>
                    <TouchableOpacity onPress={() => NavigationService.navigate("Calendar")}>
                        <Text style={{ color: Colors.s_blue, fontSize: 16, fontWeight: 'bold' }}>
                            View more
                    </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', fontSize: 18, paddingVertical: '5%' }}>
                            Currently you dont have uncoming matches
                        </Text>
                    }
                    data={data.Bookings.sort((a, b) => {
                        const dateA = setHours(parseISO(a.BookingDate), getHours(parseISO(a.FromTime)))
                        const dateB = setHours(parseISO(b.BookingDate), getHours(parseISO(b.ToTime)))
                        return dateB - dateA
                    }).slice(0, 3)}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyExtractor={i => i.Id}
                    renderItem={({ item }) => {
                        return (<CalendarListItem {...item} Address={item.Location.LocationAddress} />);
                    }}
                />

            </View>
        </ScrollView>
    )
}
export default CoachsummaryScreen
