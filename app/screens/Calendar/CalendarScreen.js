import React, { useState, useEffect, useCallback } from 'react'
import Header from '../../components/header/Header'
import DatePicker from 'react-native-date-ranges';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment'
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../state/GlobalState';
import Colors from '../../constants/color';
import { Icon } from 'native-base';
import { Calendar } from 'react-native-calendars';
import { UseNLMarkedDates } from '../../utils/UseNLMarkedDates';
import { parseISO } from 'date-fns';
import CalendarRules from '../../components/CalendarRules';

const CalendarScreen = (props) => {
    const [profile] = useGlobalState('profile')
    const [agroupedData, setAgroupedData] = useState([])
    
    const { markedDays, startDate, endDate, selectRange } = UseNLMarkedDates({ EmailID: profile?.EmailID })

    const [{ data, loading, error }, getBookings] = useAxios({
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
        console.log(data)
        if (!data || data.length == 0) return

        const d = data
            .filter(booking => {
                if (startDate && endDate) return moment(booking.BookingDate).isBetween(startDate, endDate, "D", "[]")

                return true
            })
            .reduce((groups, game) => {
                const date = game.BookingDate.split('T')[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(game);
                return groups;
            }, {})
        const groupArrays = Object.keys(d).map((date) => {
            return {
                date,
                bookings: d[date]
            };
        });
        setAgroupedData([...groupArrays])
    }, [data, startDate, endDate])

    return (
        <>
            <Header
                title="Calendar"
                hideCreatePost={true}
                toggleDrawer={props.navigation.toggleDrawer}
                navigate={props.navigation.navigate}
            />
            <Calendar
                onDayPress={(day) => {
                    selectRange(parseISO(day.dateString))
                }}
                markedDates={markedDays}
                disableAllTouchEventsForDisabledDays={true}
                markingType={'period'}
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
                keyExtractor={(item, index) => 'D' + index.toString()}
                renderItem={({ item }) => {
                    return (<BookingGroup data={item.bookings} groupDate={item.date} />)
                }}
            />
        </>
    );
}

const BookingGroup = ({ data = [], groupDate }) => {
    return (
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
            renderItem={({ item }) => {
                return (<CalendarListItem {...item} Address={item.Location.LocationAddress} />)
            }}
        />
    );
}

export const CalendarListItem = (item) => {
    return (
        <View style={{ flexDirection: 'row', padding: '3%' }}>
            <View style={{ marginRight: '5%' }}>
                <Text>{moment(item.FromTime).format("HH:mm")}</Text>
                <Text>{moment(item.ToTime).format("HH:mm")}</Text>
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
    );
}

export default CalendarScreen