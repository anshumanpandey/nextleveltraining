import React from 'react'
import {View, TouchableOpacity, ScrollView, Text, Alert} from 'react-native'
import Header from '../../components/header/Header'
import {Icon} from 'native-base'
import styles from './styles'
import MapView, {Marker} from 'react-native-maps'
import useAxios from 'axios-hooks'
import {CreditIcon} from '../../components/styled'
import {
  useGlobalState,
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState'

const LeadDetails = props => {
  const player = props.navigation.getParam('player')
  const address = props.navigation.getParam('address')
  const about = props.navigation.getParam('AboutUs')
  const Id = props.navigation.getParam('Id')

  const [profile] = useGlobalState('profile')
  const country = profile.State.split(',')

  const [getLeadReq] = useAxios(`/Users/GetLead/${Id}`)

  const lead = getLeadReq.data || null
  const loading = getLeadReq.loading || false
  const numResponses = lead ? Math.min(lead.NumResponses, 5) : 0

  const [purchaseLeadReq, purchaseLead] = useAxios(
    {
      url: `/Users/PurchaseLead`,
      method: 'POST',
    },
    {manual: true},
  )

  const [getUserReq, getUserData] = useAxios(
    {
      url: '/Users/GetUser',
    },
    {manual: true},
  )

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
          {/* <Text style={{color: '#9FA2B7', fontSize: 18, marginLeft: 15}}>
            {player.Distance} meters away
          </Text> */}
        </View>
        <View style={{width: '100%'}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '500',
              paddingLeft: 15,
            }}>
            {player.FullName}
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
            {player.Web
              ? `${player.Location}, ${country[country.length - 1]}`
              : address}
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
            0********
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
            *******@***.com
          </Text>
        </View>

        <View style={{width: '100%', marginTop: 10, flexDirection: 'row'}}>
          <CreditIcon style={{marginLeft: 10}} />
          <Text style={styles.creditText}>1 Credit</Text>
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
            {numResponses}/5 professionals have responded.
          </Text>
        </View>

        {player.Web ? (
          <>
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
                {player.Experience}
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
              <Text style={{fontSize: 18, paddingLeft: 15}}>{player.Age}</Text>
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
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {player.CoachingType.map(item => (
                  <Text style={{fontSize: 18, paddingLeft: 15}}>{item}</Text>
                ))}
              </View>
              <Text style={{fontSize: 18, paddingLeft: 15}}></Text>
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
                {player.Days.map(item => (
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
                {player.CoachingTime.map(item => (
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
                How many times a week does the player want to train?
              </Text>
              <Text style={{fontSize: 18, paddingLeft: 15}}>
                {player.DaysOfWeek[0]}
              </Text>
            </View>
          </>
        ) : (
          <>
            {lead ? (
              <>
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
                    {lead.Experience}
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
                    {lead.Age}
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
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {lead.CoachingType.map(item => (
                      <Text style={{fontSize: 18, paddingLeft: 15}}>
                        {item}
                      </Text>
                    ))}
                  </View>
                  <Text style={{fontSize: 18, paddingLeft: 15}}></Text>
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
                    {lead.Days.map(item => (
                      <Text style={{fontSize: 18, paddingLeft: 15}}>
                        {item}
                      </Text>
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
                    {lead.CoachingTime.map(item => (
                      <Text style={{fontSize: 18, paddingLeft: 15}}>
                        {item}
                      </Text>
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
                    How many times a week does the player want to train?
                  </Text>
                  <Text style={{fontSize: 18, paddingLeft: 15}}>
                    {lead.DaysOfWeek[0]}
                  </Text>
                </View>
              </>
            ) : loading ? undefined : (
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text style={{fontSize: 18}}>
                  Player hasn't filled his detail form yet.
                </Text>
              </View>
            )}
          </>
        )}

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
            {about}
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

        {player.Web ? (
          <>
            <TouchableOpacity
              onPress={() => {
                if (profile.Credits > 0) {
                  const data = {leadId: player.Id}
                  purchaseLead({data})
                    .then(res => {
                      if (res.status === 200) {
                        getUserData()
                          .then(res => {
                            dispatchGlobalState({
                              type: GLOBAL_STATE_ACTIONS.PROFILE,
                              state: res.data,
                            })
                          })
                          .catch(e => {
                            console.log(e)
                          })
                        Alert.alert(
                          'Lead Purchased',
                          'You have successfully purchased this lead. Go to responses tab to see it.',
                        )
                      }
                    })
                    .catch(e => {
                      console.log('err', e)
                    })
                } else {
                  Alert.alert(
                    'Not enough Credits',
                    'You have 0 credits left in you wallet, Please purchase credits from settings tab.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'Buy Now',
                        onPress: () => props.navigation.navigate('Cart'),
                      },
                    ],
                  )
                }
              }}
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
          </>
        ) : (
          <>
            {lead && (
              <TouchableOpacity
                onPress={() => {
                  if (profile.Credits > 0) {
                    const data = {leadId: lead.Id}
                    purchaseLead({data})
                      .then(res => {
                        if (res.status === 200) {
                          getUserData()
                            .then(res => {
                              dispatchGlobalState({
                                type: GLOBAL_STATE_ACTIONS.PROFILE,
                                state: res.data,
                              })
                            })
                            .catch(e => {
                              console.log(e)
                            })
                          Alert.alert(
                            'Lead Purchased',
                            'You have successfully purchased this lead. Go to responses tab to see it.',
                          )
                        }
                      })
                      .catch(e => {
                        console.log('err', e)
                      })
                  } else {
                    Alert.alert(
                      'Not enough Credits',
                      'You have 0 credits left in you wallet, Please purchase credits from settings tab.',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {},
                          style: 'cancel',
                        },
                        {
                          text: 'Buy Now',
                          onPress: () => props.navigation.navigate('Cart'),
                        },
                      ],
                    )
                  }
                }}
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
            )}
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default LeadDetails
