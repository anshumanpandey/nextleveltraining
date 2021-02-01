import React from 'react';
import {View, TouchableOpacity, ScrollView, Text} from 'react-native';
import Header from '../../components/header/Header';
import {Icon} from 'native-base';
import MapView, {Marker} from 'react-native-maps';

const LeadDetails = (props) => {
  const player = props.navigation.getParam('player');

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8FA'}}>
      <Header
        title="Lead Details"
        hideCreatePost={true}
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
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <View
          style={{
            width: '100%',
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#9FA2B7', fontSize: 18, marginLeft: 15}}>
            15m ago
          </Text>
        </View>
        <View style={{width: '100%'}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '500',
              paddingLeft: 15,
            }}>
            Ashley
          </Text>
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 15,
            }}>
            Football Coaching
          </Text>
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 15,
            }}>
            St Helens, St Helens
          </Text>
        </View>
        <View style={{width: '100%', marginTop: 20, flexDirection: 'row'}}>
          <Icon
            onPress={() => {}}
            type="Feather"
            name="phone"
            style={{
              color: 'black',
              fontSize: 18,
              paddingLeft: 15,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 15,
            }}>
            077271837833
          </Text>
        </View>

        <View style={{width: '100%', marginTop: 10, flexDirection: 'row'}}>
          <Icon
            onPress={() => {}}
            type="Feather"
            name="mail"
            style={{
              color: 'black',
              fontSize: 18,
              paddingLeft: 15,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 15,
            }}>
            ashley.hecker@hotmail.com
          </Text>
        </View>

        <View style={{width: '100%', marginTop: 10, flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 15,
            }}>
            2 credits
          </Text>
        </View>

        <View
          style={{
            marginTop: 15,
            width: '90%',
            height: 50,
            backgroundColor: 'white',
            borderColor: 'grey',
            borderWidth: 1,
            borderRadius: 5,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '600',
              paddingLeft: 15,
              textAlign: 'left',
            }}>
            0/5 professionals have responded.
          </Text>
        </View>

        <View
          style={{
            marginTop: 20,
            width: '90%',
            height: 120,
            backgroundColor: '#00000008',
            borderRadius: 5,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 18,
              fontWeight: '500',
              paddingLeft: 15,
              lineHeight: 28,
            }}>
            What is the student's current level of experience?
          </Text>
          <Text style={{fontSize: 18, paddingLeft: 15}}>Beginner</Text>
        </View>
        <View
          style={{
            marginTop: 5,
            width: '90%',
            height: 80,
            backgroundColor: '#00000008',
            borderRadius: 5,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 18,
              fontWeight: '500',
              paddingLeft: 15,
            }}>
            How old is the student?
          </Text>
          <Text style={{fontSize: 18, paddingLeft: 15}}>Child</Text>
        </View>
        <View
          style={{
            marginTop: 5,
            width: '90%',
            height: 120,
            backgroundColor: '#00000008',
            borderRadius: 5,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 18,
              fontWeight: '500',
              paddingLeft: 15,
              lineHeight: 28,
            }}>
            Which kind of coaching would you consider?
          </Text>
          <Text style={{fontSize: 18, paddingLeft: 15}}>1-1 coaching</Text>
        </View>
        <View
          style={{
            marginTop: 5,
            width: '90%',
            height: 120,
            backgroundColor: '#00000008',
            borderRadius: 5,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 18,
              fontWeight: '500',
              paddingLeft: 15,
              lineHeight: 28,
            }}>
            Which day(s) would you consider for coaching?
          </Text>
          <Text style={{fontSize: 18, paddingLeft: 15}}>Monday</Text>
        </View>
        <View
          style={{
            marginTop: 5,
            width: '90%',
            height: 120,
            backgroundColor: '#00000008',
            borderRadius: 5,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              color: '#9FA2B7',
              fontSize: 18,
              fontWeight: '500',
              paddingLeft: 15,
              lineHeight: 28,
            }}>
            Which time(s) of day would you consider for coaching?
          </Text>
          <Text style={{fontSize: 18, paddingLeft: 15}}>
            Evening (1800-2200)
          </Text>
        </View>
        <View style={{width: '100%', marginTop: 30, marginLeft: 15}}>
          <Text style={{fontSize: 18, paddingLeft: 15}}>
            Additional Details
          </Text>
        </View>

        <View style={{width: '100%', marginTop: 10, marginLeft: 15}}>
          <Text
            style={{
              fontSize: 18,
              paddingHorizontal: 15,
              paddingRight: 30,
              color: '#5E6488',
              textAlign: 'left',
            }}>
            {player.AboutUs ||
              'I am looking for a one to one coach for my 7 year old son. He currently plays for a team bug struggles to understand what is being asked of him so I think he would get benefit from one to one coaching.'}
          </Text>
        </View>

        <View style={{height: 200, width: '90%', marginTop: 20}}>
          {/* <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            camera={{
              //   center: currentLocation,
              heading: 0,
              pitch: 10,
              zoom: 15,
              altitude: 10,
            }}>
            <Marker
              coordinate={currentLocation}
              title={'Current Location'}
              description={'werw'}
            />
          </MapView> */}
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Cart')}
          style={{
            width: '90%',
            height: 50,
            borderRadius: 5,
            backgroundColor: '#2D7AF0',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text style={{color: 'white', fontSize: 17, fontWeight: '500'}}>
            Buy Lead
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
};

export default LeadDetails;
