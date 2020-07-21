import React, { Component } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const NLGooglePlacesAutocomplete = ({ onPress }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder={'Search location address'}
            listViewDisplayed='true'
            getDefaultValue={() => ''}
            fetchDetails={true}
            GooglePlacesDetailsQuery={{ fields: 'formatted_address,geometry' }}
            debounce={300}
            styles={{
                container: {
                    minHeight: 45,
                },
                listView: {
                    position: 'absolute',
                    backgroundColor: 'white',
                    zIndex: 10,
                    top: 50
                },
                textInputContainer: {
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    borderBottomWidth: 0.8,
                    borderBottomColor: "lightgrey"
                },
                textInput: {
                    borderWidth: 0,
                    paddingLeft: 0,
                }
            }}
            onPress={(data, details = null) => {
                onPress(data, details)
            }}
            query={{
                key: 'AIzaSyB21yZhxBVgSsRmFXnoJeFhWz_3WjCNt2M',
                language: 'en',
                components: 'country:gbr',
            }}
        />
    );
}

export default NLGooglePlacesAutocomplete;
