import React, { useState, useEffect } from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment'
import useAxios from 'axios-hooks'
import { Icon } from 'native-base';
import { Calendar } from 'react-native-calendars';
import { parseISO } from 'date-fns';
import { useGlobalState } from '../../state/GlobalState';
import Colors from '../../constants/color';
import { UseNLMarkedDates } from '../../utils/UseNLMarkedDates';
import Header from '../../components/header/Header'
import CalendarRules from '../../components/CalendarRules';

const CalendarScreen = (props) => {
    const [profile] = useGlobalState('profile')
    const [agroupedData, setAgroupedData] = useState([])

    const { selectedDays, startDate, endDate, selectRange } = UseNLMarkedDates({ EmailID: profile?.EmailID })

    const [{ data, loading, }, getBookings] = useAxios({
        url: '/Users/GetBookings',
        method: 'POST',
        data: {
            "userID": profile?.Id,
            "role": profile?.Role
        }
    })

    useEffect(() => {
        const focusListener = props.navigation.addListener('didFocus', () => {
            const data = {
                "userID": profile?.Id,
                "role": profile?.Role
            }
            getBookings({ data })
        });
        return () => {
            focusListener?.remove();
        }
    }, [])

    useEffect(() => {
        if (!data || data.length == 0) return

        const d = data
            .filter(booking => {
                if (startDate && endDate) {
                    return booking.Sessions
                        .some(session => moment(session.BookingDate).isBetween(startDate, endDate, "D", "[]"))
                }

                return true
            })
            .reduce((groups, game) => {
                const date = game.Sessions[0].BookingDate.split('T')[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(game);
                return groups;
            }, {})
        const groupArrays = Object.keys(d).map((date) => ({
            date,
            bookings: d[date]
        }));
        setAgroupedData([...groupArrays])
    }, [data, startDate, endDate])

    return (
        <>
            <Header
                title="Calendar"
                hideCreatePost
                toggleDrawer={props.navigation.toggleDrawer}
                navigate={props.navigation.navigate}
                customButton={() => (
                    <Icon
                        onPress={() => props.navigation.goBack()}
                        type="Feather"
                        name="arrow-left"
                        style={{
                            paddingVertical: 10,
                            paddingRight: 10,
                            left: 15,
                            fontSize: 22,
                            color: '#2D7AF0',
                        }}
                    />
                )}
            />
            <Calendar
                onDayPress={(day) => {
                    selectRange(parseISO(day.dateString))
                }}
                markedDates={selectedDays}
                disableAllTouchEventsForDisabledDays
                markingType="period"
                theme={{
                    todayBackgroundColor: 'white',
                    dayTextColor: Colors.s_blue,
                    todayTextColor: Colors.s_blue,
                    arrowColor: Colors.s_blue,
                    monthTextColor: Colors.s_blue,
                }}
            />
            <CalendarRules />


            <FlatList
                ListEmptyComponent={
                    <>
                        <Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: 18, textAlign: 'center', marginTop: '15%' }}>No bookings in the selected date range</Text>
                    </>
                }
                refreshing={loading}
                onRefresh={() => {
                    const data = {
                        "userID": profile?.Id,
                        "role": profile?.Role
                    }
                    getBookings({ data })
                }}
                contentContainerStyle={{ flexGrow: 1 }}
                data={[...agroupedData]}
                keyExtractor={(item, index) => `D${index.toString()}`}
                renderItem={({ item }) => (<BookingGroup data={item.bookings} groupDate={item.date} />)}
            />
        </>
    );
}

const BookingGroup = ({ data = [], groupDate }) => (
    <FlatList
        ListHeaderComponent={
            <View style={{ padding: '3%', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.3)' }}>
                <Text style={{ color: 'rgba(0,0,0,0.5)' }}>{groupDate}</Text>
            </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.Id}
        renderItem={({ item }) => (<CalendarListItem {...item} Address={item?.Location?.LocationAddress || ""} />)}
    />
)

export const CalendarListItem = (item) => (
    <View style={{ flexDirection: 'row', padding: '3%' }}>
        <View style={{ marginRight: '5%' }}>
            <Text>{moment(item.Sessions[0].FromTime).format("HH:mm")}</Text>
            <Text>{moment(item.Sessions[item.Sessions.length - 1].ToTime).format("HH:mm")}</Text>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.3)' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon type="FontAwesome" name="circle" style={{ color: Colors.s_blue, fontSize: 12 }} />
                <Text>{item.FullName}</Text>
            </View>
            <View style={{ paddingLeft: '3%' }}>
                <Text style={{ color: 'rgba(0,0,0,0.5)' }}>{item.Address}</Text>
            </View>
        </View>
    </View>
)

export default CalendarScreen