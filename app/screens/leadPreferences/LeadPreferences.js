import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Icon, Picker} from 'native-base';
import Header from '../../components/header/Header';
import NLDropdownMenu from '../../components/NLDropdownMenu';
import styles from './styles';
import NLAddressSuggestionInput from '../../components/NLAddressSuggestionInput';
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
  useGlobalState,
} from '../../state/GlobalState';

const width = Dimensions.get('screen').width;

const getFullSuggestionAddress = (suggestion) => {
  return `${suggestion.line_1} ${suggestion.line_2} ${suggestion.line_3} ${suggestion.district} ${suggestion.county} ${suggestion.country}`;
};

const LeadPreferences = (props) => {
  const [profile] = useGlobalState('profile');
  const [preferences] = useGlobalState('preferences');
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({
    postCode: preferences?.postCode,
    lat: preferences?.lat,
    lng: preferences?.lng,
    county: preferences?.county
  });
  const [postCode, setPostCode] = useState(
    preferences?.postCode || profile.PostCode,
  );
  const [range, setRange] = useState(preferences?.range || '50');

  const setPreferences = () => {
    dispatchGlobalState({
      type: GLOBAL_STATE_ACTIONS.PREFERENCES,
      state: {
        postCode: address?.postcode,
        lat: address?.latitude,
        lng: address?.longitude,
        range,
        county: address?.county,
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
              <TouchableOpacity onPress={setPreferences}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    opacity: 1,
                    fontWeight: 'bold',
                    color: '#2D7AF0',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
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
          style={{borderBottomWidth: 0, padding: 0}}
          placeholder="Postcode"
          defaultValue={postCode}
          onSuggestionsUpdated={setAddresses}
          lookUpButtonStyle={{backgroundColor: '#2D7AF0', borderRadius: 5}}
          lookUpInitial
        />
        <NLDropdownMenu
          disabled={!addresses.length}
          placeholder={!addresses.length ? 'No options' : 'Select an address'}
          theme={{
            menu: {width: '80%'},
            textButton: {
              fontSize: 18,
              color: 'rgba(0,0,0,0.3)',
              paddingLeft: 5,
            },
            button: {
              ...styles.signup_info_view,
              width: width * 0.83,
            },
          }}
          onSelect={(selected) => {
            console.log(JSON.stringify(selected, null, 2));
            setPostCode(selected.postcode);
            setAddress(selected);
          }}
          options={addresses.map((a) => ({
            label: getFullSuggestionAddress(a),
            value: a,
          }))}
        />
      </View>
      <Seperator />
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 15,
          paddingLeft: 25,
          paddingRight: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>Range</Text>
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
          style={{paddingLeft: 10}}
          selectedValue={range}
          onValueChange={setRange}>
          <Picker.Item label="20 KM" value="20" />
          <Picker.Item label="30 KM" value="30" />
          <Picker.Item label="40 KM" value="40" />
          <Picker.Item label="50 KM" value="50" />
          <Picker.Item label="100 KM" value="100" />
        </Picker>
      </View>
    </View>
  );
};

const Seperator = ({opacity = 0.3}) => (
  <View style={{height: 1, backgroundColor: '#C7C9D6', opacity}} />
);

export default LeadPreferences;
