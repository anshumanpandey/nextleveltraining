import React from 'react';
import { View, Text } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../../../navigation/NavigationService';

const BookCard = (item) => {
  return (
    <TouchableOpacity onPress={() => NavigationService.navigate("JobDetails", item)}>
      <View style={{ flexDirection: 'row', padding: 10, borderBottomColor: '#DEDEDE', borderBottomWidth: 1, backgroundColor: 'white' }}>
        <View style={styles.book_arrow_view}>
          <Icon type="AntDesign" name="arrowright" style={{ fontSize: 20, color: 'white' }} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, color: '#0F2F80' }}>
            { item.BookingStatus == "Cancelled" && "Order Cancelled"}
            { item.BookingStatus == "Done" && "Order Done"}
            { item.BookingStatus != "Done" && item.BookingStatus != "Cancelled" && "Order Paid"}
          </Text>
          <Text style={{ fontWeight: '500', marginTop: 5 }}>{item.FullName}</Text>
          <View style={{ marginTop: 5 }}>
            <Text>{item.Location.LocationAddress}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontWeight: '500', color: "#0F2F80" }}>Season for:</Text>
              <Text style={{ marginLeft: 5 }}>
                {item.BookingDate.split('T')[0]}{' '}
                {moment(item.FromTime).format("HH:mm")}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontWeight: '500', color: "#0F2F80" }}>Job fees:</Text>
              <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                <Text>{'\u00A3'}</Text>
                <Text>{item.CoachRate}/per hour</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default BookCard
