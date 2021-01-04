import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList } from 'react-native'
import { Input } from 'native-base';
import Toast from 'react-native-simple-toast';
import Axios from 'axios'
import { Client } from "@ideal-postcodes/core-axios"
import { useThrottle } from '@react-hook/throttle'
import NLButton from './NLButton';
import Colors from '../constants/color';

const client = new Client({ api_key: "ak_kgpgg5sceGe2S9cpVSSeU9UJo8YrI" });

const getSuggesitonId = (suggestion) => {
    return suggestion.northings + suggestion.udprn
}


/** @typedef {Object} Suggestion
 * @property {String} administrative_county
 * @property {String} building_name
 * @property {String} building_number
 * @property {String} country
 * @property {String} county
 * @property {String} delivery_point_suffix
 * @property {String} department_name
 * @property {String} dependant_locality
 * @property {String} dependant_thoroughfare
 * @property {String} district
 * @property {String} double_dependant_locality
 * @property {Number} eastings
 * @property {Number} latitude
 * @property {String} line_1
 * @property {String} line_2
 * @property {String} line_3
 * @property {Number} longitude
 * @property {Number} northings
 * @property {String} organisation_name
 * @property {String} po_box
 * @property {String} post_town
 * @property {String} postal_county
 * @property {String} postcode
 * @property {String} postcode_inward
 * @property {String} postcode_outward
 * @property {String} postcode_type
 * @property {String} premise
 * @property {String} su_organisation_indicator
 * @property {String} sub_building_name
 * @property {String} thoroughfare
 * @property {String} traditional_county
 * @property {Number} udprn
 * @property {String} umprn
 * @property {String} uprn
 * @property {String} ward
 */

/**
* This callback type is called `requestCallback` and is displayed as a global symbol.
*
* @callback onLocationSelected
* @param {Suggestion} suggestion
*/

/**
* @param {Suggestion} suggestion
*/
export const getFullSuggestionAddress = (suggestion) => {
    return `${suggestion.line_1} ${suggestion.line_2} ${suggestion.line_3} ${suggestion.district} ${suggestion.county} ${suggestion.country}`
}

const RenderItem = ({ onLocationSelected, value }) => {
    return <TouchableOpacity onPress={() => { onLocationSelected(value); console.log(0) }} style={{ padding: '2%', borderBottomWidth: 1, borderBottomColor: '#00000025', }}>
        <Text numberOfLines={2} style={{ fontSize: 14, marginLeft: '2%' }}>{getFullSuggestionAddress(value)}</Text>
    </TouchableOpacity>
}

/**
 * @param {Object} params
 * @param {onLocationSelected} params.onLocationSelected - On suggestion selected callback
 * @param {Function} params.onSuggestionsUpdated - When suggestions list is updated
 * @param {String} [params.defaultValue]
 * @param {String} [params.placeholder]
 */
const NLAddressSuggestionInput = ({ onLocationSelected, onSuggestionsUpdated, noLookupButton = false,showList = false,defaultValue = null, placeholder = '', style = {} }) => {
    const [inputLayout, setInputLayout] = useState()
    const [currentValue, setCurrentValue] = useThrottle(undefined, 3)
    const [currentDisaplyValue, setCurrentDisaplyValue] = useState()
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)

    const suggestionSelected = (s) => {
        setSuggestions([])
        onLocationSelected(s)
        setCurrentDisaplyValue(getFullSuggestionAddress(s))
    }

    useEffect(() => {
        if (defaultValue != null) setCurrentDisaplyValue(defaultValue)
    }, [defaultValue])

    const doLookup = () => {
        setLoading(true)
        Promise.all([
            client.lookupPostcode({ postcode: currentValue }),
            client.lookupAddress({ query: currentValue })
        ])
            .then(([byPostCode, byAddress]) => {
                setLoading(false)
                const merged = byPostCode.concat(byAddress)

                if (merged.length == 0) Toast.show('No suggestion found');
                
                const suggestions = merged.reduce((map, suggestion) => {
                    map.set(getSuggesitonId(suggestion), suggestion)
                    return map
                }, new Map())

                const suggestionsResult = Array.from(suggestions.values())
                setSuggestions(suggestionsResult)
                onSuggestionsUpdated && onSuggestionsUpdated(suggestionsResult)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                Alert.alert("Error", 'We could not get the suggestions')
            })
    }

    return (
        <>
            <View style={[styles.input_wrapper, { ...style }]}>
                <Input
                    onLayout={(e) => setInputLayout(e.nativeEvent.layout)}
                    placeholder={placeholder || "Search by a post code"}
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    value={currentDisaplyValue}
                    onChangeText={(t) => {
                        setCurrentValue(t)
                        setCurrentDisaplyValue(t)
                    }}
                />
                {noLookupButton == false && <NLButton disabled={loading} color={Colors.s_blue} style={{ width: '25%' }} value="Lookup" onPress={() => doLookup()} />}
            </View>
            {showList == true && suggestions.length != 0 && (
                <View style={[styles.input_wrapper, { backgroundColor: 'white', height: 200,position: 'absolute', zIndex: 20, marginTop: inputLayout ? inputLayout.height * 2 : undefined }]}>
                    <FlatList
                        keyboardShouldPersistTaps={'always'}
                        data={suggestions}
                        renderItem={({ item }) => <RenderItem onLocationSelected={suggestionSelected} value={item}  />}
                        keyExtractor={item => getSuggesitonId(item)}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    input_wrapper: {
        color: 'black',
        padding: 1,
        borderBottomWidth: 0.8,
        borderBottomColor: "lightgrey",
        marginTop: Dimension.px1,
        width: '100%',
        flexDirection: 'row'
    },
})


export default NLAddressSuggestionInput;