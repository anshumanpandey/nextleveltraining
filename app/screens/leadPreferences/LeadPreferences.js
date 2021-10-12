import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { Icon, Picker } from 'native-base';
import Header from '../../components/header/Header';
import NLSaveButton from '../../components/NLSaveButton';
import styles from './styles';
import NLAddressSuggestionInput from '../../components/postcodeInput';
import { usePostCodeSearch } from '../../components/postcodeInput/state';
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
  useGlobalState,
} from '../../state/GlobalState';

const LeadPreferences = (props) => {
  const postCodeSearch = usePostCodeSearch()

  const [preferences] = useGlobalState('preferences');
  const [address, setAddress] = useState({
    postCode: preferences?.postCode,
    lat: preferences?.lat,
    lng: preferences?.lng,
    county: preferences?.county,
    state: preferences?.state,
    address: preferences?.address,
  });
  const [range, setRange] = useState(preferences?.range || '50');

  const setPreferences = () => {
    dispatchGlobalState({
      type: GLOBAL_STATE_ACTIONS.PREFERENCES,
      state: {
        postCode: address?.postCode,
        lat: address?.latitude,
        lng: address?.longitude,
        range,
        county: address?.county,
        state: address?.country,
        address: address?.address,
      },
    })
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Customer Preferences"
        hideCreatePost
        customButton={() => (
          <>
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

            <View
              style={{
                position: 'absolute',
                right: 0,
                zIndex: 1,
              }}>
              <NLSaveButton onPress={setPreferences} />
            </View>
          </>
        )}
      />

      <View
        style={{
          backgroundColor: 'white',
          marginTop: 15,
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            paddingLeft: 5,
            marginBottom: 15,
          }}>
          Select Location
        </Text>
        <NLAddressSuggestionInput
          placeholder="Postcode"
          defaultValue={address.address}
          lookUpButtonStyle={{ backgroundColor: '#2D7AF0', borderRadius: 5 }}
          lookUpInitial
          onLocationSelected={(place) => {
            postCodeSearch.getSiteDetails(place)
              .then(details => {
                const coordinates = details.getPlaceLatLong()
                setAddress({
                  postCode: details.getPlacePostCode(),
                  lat: coordinates.lat,
                  lng: coordinates.lng,
                  county: details.getPlaceCounty(),
                  state: details.getPlaceCountry(),
                  address: details.getAddress()
                })
              })
          }}
        />

        <Text style={{ fontSize: 18 }}>Range</Text>
        <Picker
          mode="dropdown"
          renderHeader={(back) => (
            <SafeAreaView>
              <Header
                title="Select Range"
                hideCreatePost
                customButton={() => (
                  <Icon
                    onPress={back}
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
            </SafeAreaView>
          )}
          style={{ paddingLeft: 10 }}
          selectedValue={range}
          onValueChange={setRange}>
          <Picker.Item label="20 KM" value="20" />
          <Picker.Item label="30 KM" value="30" />
          <Picker.Item label="40 KM" value="40" />
          <Picker.Item label="50 KM" value="50" />
          <Picker.Item label="100 KM" value="100" />
        </Picker>
      </View>
    </View >
  );
};

export default LeadPreferences;
