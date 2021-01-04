import React from 'react';
import {View, ScrollView, TouchableOpacity, Text, Image} from 'react-native';
import Header from '../../components/header/Header';
import CheckBox from '@react-native-community/checkbox';
import {SliderPicker} from 'react-native-slider-picker';
import Images from '../../constants/image';
import Dimension from '../../constants/dimensions.js';

const Cart = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F8F8FA',
      }}>
      <Header title="Credits" hideCreatePost={true} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            width: Dimension.pro100,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            marginVertical: Dimension.px15,
          }}>
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri:
                'https://nextlevelfootballtraining.co.uk/images/logo-icon-only.png',
            }}
          />
        </View>
        <View
          style={{
            width: '95%',
            height: 250,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
            marginTop: 10,
            borderRadius: 5,
            elevation: 1,
            opacity: 1,
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '500',
              marginLeft: 20,
              width: 100,
            }}>
            Buy Credits
          </Text>
          <View style={{width: '100%', marginLeft: 20}}>
            <Text style={{fontWeight: '500'}}>About 5 responses</Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontWeight: '500', width: 100}}>5 credits</Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontWeight: '700'}}>£05.40</Text>
            <Text style={{fontWeight: '500', paddingLeft: 5}}>ex VAT</Text>
            <Text style={{fontSize: 13, color: '#9FA2B7', paddingLeft: 5}}>
              £1.02/credit
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '95%',
              height: 50,
              borderRadius: 5,
              backgroundColor: '#2D7AF0',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: '500',
                width: 100,
              }}>
              Buy credits
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={false}
              onValueChange={(newValue) => {}}
            />
            <Text style={{fontWeight: '500', marginLeft: 10, width: '50%'}}>
              Auto top-up next time
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '95%',
            height: 250,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
            marginTop: 10,
            borderRadius: 5,
            elevation: 1,
            opacity: 1,
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '500',
              marginLeft: 20,
              width: 100,
            }}>
            Buy Credits
          </Text>
          <View style={{width: '100%', marginLeft: 20}}>
            <Text style={{fontWeight: '500'}}>About 10 responses</Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontWeight: '500', width: 100}}>10 credits</Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontWeight: '700'}}>£10.40</Text>
            <Text style={{fontWeight: '500', paddingLeft: 5}}>ex VAT</Text>
            <Text style={{fontSize: 13, color: '#9FA2B7', paddingLeft: 5}}>
              £1.02/credit
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '95%',
              height: 50,
              borderRadius: 5,
              backgroundColor: '#2D7AF0',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: '500',
                width: 100,
              }}>
              Buy credits
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={false}
              onValueChange={(newValue) => {}}
            />
            <Text style={{fontWeight: '500', marginLeft: 10, width: '50%'}}>
              Auto top-up next time
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '95%',
            height: 250,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
            marginTop: 10,
            borderRadius: 5,
            elevation: 1,
            opacity: 1,
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '500',
              marginLeft: 20,
              width: 100,
            }}>
            Buy Credits
          </Text>
          <View style={{width: '100%', marginLeft: 20}}>
            <Text style={{fontWeight: '500'}}>About 20 responses</Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontWeight: '500', width: 100}}>20 credits</Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontWeight: '700'}}>£20.40</Text>
            <Text style={{fontWeight: '500', paddingLeft: 5}}>ex VAT</Text>
            <Text style={{fontSize: 13, color: '#9FA2B7', paddingLeft: 5}}>
              £1.02/credit
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '95%',
              height: 50,
              borderRadius: 5,
              backgroundColor: '#2D7AF0',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: '500',
                width: 100,
              }}>
              Buy credits
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={false}
              onValueChange={(newValue) => {}}
            />
            <Text style={{fontWeight: '500', marginLeft: 10, width: '50%'}}>
              Auto top-up next time
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '95%',
            height: 400,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
            marginTop: 30,
            borderRadius: 5,
            elevation: 1,
            opacity: 1,
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '500',
              marginLeft: 20,
              width: 100,
            }}>
            Buy Credits
          </Text>
          <Text
            style={{
              fontWeight: '500',
              textAlign: 'center',
              paddingHorizontal: 70,
              color: '#515780',
            }}>
            Use the slider to customize roughly how many responses you want to
            buy. The more you buy, the bigger the discount.
          </Text>
          <View style={{width: '100%', marginLeft: 20}}>
            <Text style={{fontWeight: '500'}}>About 50 responses</Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontWeight: '500', width: 100}}>50 credits</Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
            <Text
              style={{
                fontWeight: '700',
                color: '#515780',
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }}>
              £60.00
            </Text>
            <Text style={{fontWeight: '500', paddingLeft: 5}}>£48.00</Text>
            <Text style={{fontWeight: '500', paddingLeft: 5}}>ex VAT</Text>
          </View>

          <View style={{width: '100%'}}>
            <SliderPicker
              maxValue={10}
              callback={(position) => {}}
              defaultValue={1}
              scaleNumberFontSize={15}
              showFill={true}
              errorToleranceMargin={0.5}
              fillColor={'#2D7AF0'}
              labelFontWeight={'bold'}
              showNumberScale={true}
              showSeparatorScale={true}
              buttonBackgroundColor={'#2D7AF0'}
              buttonBorderColor={'white'}
              buttonBorderWidth={3}
              scaleNumberFontWeight={'300'}
              buttonDimensionsPercentage={6}
              heightPercentage={1}
              widthPercentage={80}
            />
          </View>
          <TouchableOpacity
            style={{
              width: '95%',
              height: 50,
              borderRadius: 5,
              backgroundColor: '#2D7AF0',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: '500',
                width: 100,
              }}>
              Buy credits
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart;
