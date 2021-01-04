import React from 'react';
import {View, TouchableOpacity, ScrollView, Text} from 'react-native';
import Header from '../../components/header/Header';
import {Icon} from 'native-base';

const Responses = (props) => {
  return (
    <View style={{flex: 1, backgroundColor: '#F8F8FA'}}>
      <Header
        title="Responses"
        hideCreatePost={true}
        customButton={() => (
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Icon
              onPress={() => {}}
              type="AntDesign"
              name="filter"
              style={{
                position: 'absolute',
                zIndex: 1,
                color: 'black',
              }}
            />
          </View>
        )}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <View
          style={{
            width: '100%',
            height: 70,
            // alignItems: 'center',
            paddingLeft: 15,
            backgroundColor: 'white',
            // justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 18,
              fontWeight: '500',
              marginTop: 10,
            }}>
            Showing 72 all responses
          </Text>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 18,
              fontWeight: '500',
              marginTop: 5,
            }}>
            Updated just now
          </Text>
        </View>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <View style={{backgroundColor: '#F4F4F7', height: 20}} />
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ResponseDetails');
          }}
          style={{
            height: 120,
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: '600', fontSize: 17, paddingLeft: 15}}>
            Olie
          </Text>
          <Text style={{fontWeight: '500', fontSize: 17, paddingLeft: 15}}>
            Football Coaching
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 15}}>
            <Icon
              type="Feather"
              name="map-pin"
              style={{fontSize: 15, color: '#9FA2B7'}}
            />
            <Text
              style={{
                color: '#9FA2B7',
                fontSize: 17,
                fontWeight: '500',
                paddingLeft: 5,
              }}>
              Royal Tunbridge Wells, Kent
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
           props.navigation.navigate('ResponseDetails');
          }}
          style={{
            height: 120,
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: '600', fontSize: 17, paddingLeft: 15}}>
            Olie
          </Text>
          <Text style={{fontWeight: '500', fontSize: 17, paddingLeft: 15}}>
            Football Coaching
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 15}}>
            <Icon
              type="Feather"
              name="map-pin"
              style={{fontSize: 15, color: '#9FA2B7'}}
            />
            <Text
              style={{
                color: '#9FA2B7',
                fontSize: 17,
                fontWeight: '500',
                paddingLeft: 5,
              }}>
              Royal Tunbridge Wells, Kent
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
           props.navigation.navigate('ResponseDetails');
          }}
          style={{
            height: 120,
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: '600', fontSize: 17, paddingLeft: 15}}>
            Olie
          </Text>
          <Text style={{fontWeight: '500', fontSize: 17, paddingLeft: 15}}>
            Football Coaching
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 15}}>
            <Icon
              type="Feather"
              name="map-pin"
              style={{fontSize: 15, color: '#9FA2B7'}}
            />
            <Text
              style={{
                color: '#9FA2B7',
                fontSize: 17,
                fontWeight: '500',
                paddingLeft: 5,
              }}>
              Royal Tunbridge Wells, Kent
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ResponseDetails');
          }}
          style={{
            height: 120,
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: '600', fontSize: 17, paddingLeft: 15}}>
            Olie
          </Text>
          <Text style={{fontWeight: '500', fontSize: 17, paddingLeft: 15}}>
            Football Coaching
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 15}}>
            <Icon
              type="Feather"
              name="map-pin"
              style={{fontSize: 15, color: '#9FA2B7'}}
            />
            <Text
              style={{
                color: '#9FA2B7',
                fontSize: 17,
                fontWeight: '500',
                paddingLeft: 5,
              }}>
              Royal Tunbridge Wells, Kent
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
           props.navigation.navigate('ResponseDetails');
          }}
          style={{
            height: 120,
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: '600', fontSize: 17, paddingLeft: 15}}>
            Olie
          </Text>
          <Text style={{fontWeight: '500', fontSize: 17, paddingLeft: 15}}>
            Football Coaching
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 15}}>
            <Icon
              type="Feather"
              name="map-pin"
              style={{fontSize: 15, color: '#9FA2B7'}}
            />
            <Text
              style={{
                color: '#9FA2B7',
                fontSize: 17,
                fontWeight: '500',
                paddingLeft: 5,
              }}>
              Royal Tunbridge Wells, Kent
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ResponseDetails');
          }}
          style={{
            height: 120,
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: '600', fontSize: 17, paddingLeft: 15}}>
            Olie
          </Text>
          <Text style={{fontWeight: '500', fontSize: 17, paddingLeft: 15}}>
            Football Coaching
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 15}}>
            <Icon
              type="Feather"
              name="map-pin"
              style={{fontSize: 15, color: '#9FA2B7'}}
            />
            <Text
              style={{
                color: '#9FA2B7',
                fontSize: 17,
                fontWeight: '500',
                paddingLeft: 5,
              }}>
              Royal Tunbridge Wells, Kent
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
      </ScrollView>
    </View>
  );
};

export default Responses;
