import React from 'react';
import {View, TouchableOpacity, ScrollView, Text} from 'react-native';
import Header from '../../components/header/Header';
import {Icon} from 'native-base';

const ResponseDetails = (props) => {
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
              15m ago
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
              ashley.hecker@hotmail.com
            </Text>
          </View>

          <View style={{width: '100%', marginTop: 10, flexDirection: 'row'}}>
            <Icon
              onPress={() => {}}
              type="FontAwesome5"
              name="tag"
              style={{
                color: '#9FA2B7',
                fontSize: 18,
                paddingLeft: 15,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                paddingLeft: 15,
                color: '#9FA2B7',
              }}>
              Your estimate:
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 5,
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  color: '#2D7AF0',
                }}>
                Send an estimate
              </Text>
            </TouchableOpacity>
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
        <View style={{backgroundColor: '#F4F4F7', height: 15}} />
        <View style={{height: 700, backgroundColor: 'white'}}>
          <View
            style={{
              width: '100%',
              height: 45,
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity style={{marginLeft: 15, marginTop: 10}}>
              <Text style={{fontSize: 20}}>Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 15, marginTop: 10}}>
              <Text style={{fontSize: 20, color: '#9FA2B7'}}>Lead Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 15, marginTop: 10}}>
              <Text style={{fontSize: 20, color: '#9FA2B7'}}>My Notes</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#000000',
                height: 2,
                width: '17%',
                marginLeft: 15,
              }}
            />
            <View
              style={{
                backgroundColor: '#00000020',
                height: 2,
                width: '35%',
              }}
            />
            <View
              style={{
                backgroundColor: '#00000020',
                height: 2,
                width: '35%',
              }}
            />
          </View>
          <View
            style={{
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#9FA2B7'}}>Tue 15 Dec</Text>
          </View>
          <View
            style={{
              height: 100,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 17.5,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 15,
              }}>
              <View
                style={{
                  height: 17.5,
                  width: 17.5,
                  borderRadius: 8.75,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>b</Text>
              </View>
            </View>
            <View
              style={{
                width: '80%',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#00000020',
                height: 80,
                marginLeft: 15,
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#9FA2B7', paddingLeft: 10}}>You</Text>
                <Text style={{color: '#9FA2B7', paddingRight: 10}}>09:11</Text>
              </View>
              <Text style={{paddingLeft: 10, fontSize: 18}}>
                Purchased the lead
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#9FA2B7'}}>Sat 12 Dec</Text>
          </View>
          <View
            style={{
              height: 100,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 17.5,
                backgroundColor: '#00000020',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 15,
              }}>
              <Icon
                type="Feather"
                name="user"
                style={{
                  color: 'black',
                  fontSize: 20,
                }}
              />
            </View>
            <View
              style={{
                width: '80%',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#00000020',
                height: 80,
                marginLeft: 15,
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#9FA2B7', paddingLeft: 10}}>Ashley</Text>
                <Text style={{color: '#9FA2B7', paddingRight: 10}}>15:41</Text>
              </View>
              <Text style={{paddingLeft: 10, fontSize: 18}}>
                Viewed your profile
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#9FA2B7'}}>
              Thursday 10 Dec
            </Text>
          </View>
          <View
            style={{
              height: 100,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 17.5,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 15,
              }}>
              <View
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 17.5,
                  backgroundColor: '#00000020',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 15,
                }}>
                <Icon
                  type="Feather"
                  name="user"
                  style={{
                    color: 'black',
                    fontSize: 20,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: '80%',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#00000020',
                height: 80,
                marginLeft: 15,
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#9FA2B7', paddingLeft: 10}}>Ashley</Text>
                <Text style={{color: '#9FA2B7', paddingRight: 10}}>03:11</Text>
              </View>
              <Text style={{paddingLeft: 10, fontSize: 18}}>
                Ashley requested the lead
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResponseDetails;
