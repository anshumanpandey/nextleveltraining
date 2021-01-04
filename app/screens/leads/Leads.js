import React from 'react';
import {View, TouchableOpacity, ScrollView, Text} from 'react-native';
import Header from '../../components/header/Header';
import {Icon} from 'native-base'

const Leads = (props) => {
  return (
    <View style={{flex: 1, backgroundColor: '#F8F8FA'}}>
      <Header
        title="Leads"
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
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            paddingLeft: 15,
            backgroundColor: 'white',
            // justifyContent: 'center',
          }}>
          <Text style={{color: '#9FA2B7', fontSize: 18, fontWeight: '500'}}>
            41 leads matching your{' '}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                fontSize: 18,
              }}>
              Lead preferences
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <View
          style={{
            width: '100%',
            height: 80,
            alignItems: 'flex-start',
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 18,
              fontWeight: '500',
              paddingLeft: 15,
              paddingTop: 15,
            }}>
            Showing all 41 leads
          </Text>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 18,
              fontWeight: '500',
              paddingLeft: 15,
              paddingTop: 5,
            }}>
            Updated just now
          </Text>
        </View>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <View style={{backgroundColor: '#F4F4F7', height: 20}} />
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('LeadDetails');
          }}
          style={{
            height: 200,
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: '#327DED', paddingLeft: 5}}>
              •
            </Text>
            <Text style={{fontWeight: '600', fontSize: 17, paddingLeft: 5}}>
              Liam
            </Text>
          </View>
          <Text style={{fontWeight: '500', fontSize: 17, paddingLeft: 20}}>
            Football Coaching
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 20}}>
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
              Newscastle Upon Tyne, NE16
            </Text>
          </View>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 17,
              fontWeight: '500',
              paddingLeft: 20,
            }}>
            2 credits
          </Text>
          <View
            style={{
              backgroundColor: '#ECF7F5',
              height: 40,
              width: '80%',
              borderRadius: 5,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#3ABA96'}}>
              This customer has a requested quote
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('LeadDetails');
          }}
          style={{
            height: 150,
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
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 17,
              fontWeight: '500',
              paddingLeft: 15,
            }}>
            1 credit
          </Text>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('LeadDetails');
          }}
          style={{
            height: 150,
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: '600', fontSize: 17, paddingLeft: 15}}>
            Adam
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
              Glasgow, Glasgow City
            </Text>
          </View>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 17,
              fontWeight: '500',
              paddingLeft: 15,
            }}>
            1 credit
          </Text>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('LeadDetails');
          }}
          style={{
            height: 150,
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: '600', fontSize: 17, paddingLeft: 15}}>
            Dave
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
              Blackburn, Blackburn with Darwen
            </Text>
          </View>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 17,
              fontWeight: '500',
              paddingLeft: 15,
            }}>
            4 credits
          </Text>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#9FA2B7'}} />
      </ScrollView>
    </View>
  );
};

export default Leads;
