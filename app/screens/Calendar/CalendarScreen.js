import React, { useState, useEffect, useCallback } from 'react'
import Header from '../../components/header/Header'
import DatePicker from 'react-native-date-ranges';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment'
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../state/GlobalState';
import Colors from '../../constants/color';
import { Icon } from 'native-base';
import { format, addDays, parse } from 'date-fns'

const CalendarScreen = (props) => {
    const [profile] = useGlobalState('profile')
    const [showCalendar, setShowCalendar] = useState(false)
    const [agroupedData, setAgroupedData] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(addDays(new Date(), 30))

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
        if (!data) return

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
            <DatePicker
                style={{ height: 45 }}
                customStyles={{
                    placeholderText: { fontSize: 20 }, // placeHolder style
                    headerStyle: { backgroundColor: Colors.s_blue },			// title container style
                    headerMarkTitle: { color: 'white', opacity: 1 }, // title mark style 
                    headerDateTitle: {}, // title Date style
                    contentInput: {}, //content text container style
                    contentText: {}, //after selected text Style
                }} // optional 
                centerAlign // optional text will align center or not
                allowFontScaling={false} // optional
                placeholder={`${format(startDate, 'LLL dd, yyyy')} → ${format(endDate, 'LLL dd, yyyy')}`}
                mode={'range'}
                markText="Select a Date Range"
                ButtonText="Done"
                onConfirm={({ endDate, startDate }) => {
                    setStartDate(parse(startDate, "yyyy/MM/dd", new Date()))
                    setEndDate(parse(endDate, "yyyy/MM/dd", new Date()))
                }}
                customButton={(onConfirm, onCancel) => {
                    return (
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: '5%'}}>
                            <TouchableOpacity onPress={onConfirm}>
                                <Text style={{ fontSize: 18}}>Done</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onCancel}>
                                <Text style={{ fontSize: 18}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />

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