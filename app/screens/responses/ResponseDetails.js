import React from 'react'
import {View, TouchableOpacity, ScrollView, Text, Linking} from 'react-native'
import Header from '../../components/header/Header'
import { Icon } from 'native-base'
// import MapView, {Marker} from 'react-native-maps'

const ResponseDetails = props => {
  const response = props.navigation.getParam('lead')
  const time = response.CreatedAt.split("T")
  return (
    <View style={{flex: 1, backgroundColor: '#F8F8FA'}}>
      <Header
        title="Response"
        hideCreatePost
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
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{width: '100%', height: 400, backgroundColor: 'white'}}>
          <View
            style={{
              width: '100%',
              height: 100,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#9FA2B7', fontSize: 18, marginLeft: 15}}>
              {time[0]}
            </Text>
            <TouchableOpacity
              style={{
                width: '32%',
                height: 45,
                borderRadius: 5,
                backgroundColor: '#2D7AF0',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 15,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 17,
                  fontWeight: '600',
                  paddingRight: 10,
                }}>
                Live lead
              </Text>
              <Icon
                type="Feather"
                name="chevron-down"
                style={{
                  color: 'white',
                  fontSize: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
                paddingLeft: 15,
              }}>
              {response.Lead.FullName}
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
              {response.Lead.Location}
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
              {response.Lead.MobileNo}
            </Text>
            <View
              style={{
                backgroundColor: '#ECF7F5',
                height: 25,
                borderRadius: 15,
                width: '20%',
                marginLeft: 10,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <Icon
                onPress={() => {}}
                type="Feather"
                name="check"
                style={{
                  color: '#3ABA96',
                  fontSize: 15,
                }}
              />
              <Text style={{color: '#3ABA96', fontWeight: '500'}}>
                Verified
              </Text>
            </View>
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
              {response.Lead.EmailID}
            </Text>
          </View>

          <View
            style={{
              width: '95%',
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`mailto:${response.Lead.EmailID}`)
              }}
              style={{
                backgroundColor: '#2D7AF0',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30%',
                height: 50,
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <Icon
                type="Feather"
                name="mail"
                style={{
                  color: 'white',
                  fontSize: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 5,
                  color: 'white',
                }}>
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${response.Lead.MobileNo}`)
              }}
              style={{
                backgroundColor: '#2D7AF0',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30%',
                height: 50,
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <Icon
                type="Feather"
                name="phone"
                style={{
                  color: 'white',
                  fontSize: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 5,
                  color: 'white',
                }}>
                Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`sms:${response.Lead.MobileNo}`)
              }}
              style={{
                backgroundColor: '#2D7AF0',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30%',
                height: 50,
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <Icon
                type="Feather"
                name="message-square"
                style={{
                  color: 'white',
                  fontSize: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 5,
                  color: 'white',
                }}>
                SMS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
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
            <Text style={{fontSize: 18, paddingLeft: 15}}>
              {response.Lead.Experience}
            </Text>
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
            <Text style={{fontSize: 18, paddingLeft: 15}}>
              {response.Lead.Age}
            </Text>
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
            <View style={{flexDirection: 'row'}}>
              {response.Lead.CoachingType.map(item => (
                <Text style={{fontSize: 18, paddingLeft: 15}}>{item}</Text>
              ))}
            </View>
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
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {response.Lead.Days.map(item => (
                <Text style={{fontSize: 18, paddingLeft: 15}}>{item}</Text>
              ))}
            </View>
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
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {response.Lead.CoachingTime.map(item => (
                <Text style={{fontSize: 18, paddingLeft: 15}}>{item}</Text>
              ))}
            </View>
          </View>

          <View
            style={{
              marginTop: 5,
              marginBottom:15,
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
              How many times a week does the player want to train?
            </Text>
            <Text style={{fontSize: 18, paddingLeft: 15}}>
              {response.Lead.DaysOfWeek[0]}
            </Text>
          </View>
          {/* <View style={{width: '100%', marginTop: 30, marginLeft: 15}}>
            <Text style={{fontSize: 18, paddingLeft: 15}}>
              Additional Details
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              marginTop: 10,
              marginLeft: 15,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                paddingHorizontal: 15,
                paddingRight: 30,
                color: '#5E6488',
                textAlign: 'left',
              }}>
              'I am looking for a one to one coach for my 7 year old son. He
              currently plays for a team bug struggles to understand what is
              being asked of him so I think he would get benefit from one to one
              coaching.'
            </Text>
          </View> */}

          {/* <View style={{height: 200, width: '90%', marginTop: 20}}>
            <MapView
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
          </MapView>
          </View> */}
        </View>
      </ScrollView>
    </View>
  )
}

export default ResponseDetails
