import React, { useState, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'native-base';
import Colors from '../constants/color';

const NLGooglePlacesAutocomplete = ({ onPress, defaultValue = undefined, style = {} }) => {
    const [currentLocation, setCurrentLocation] = useState()
    const [inputValue, setInputValue] = useState(undefined)

    useEffect(() => {
        setInputValue(defaultValue)
    }, [])

    return (
        <View style={{ zIndex: 20, height: 100,width: '100%'}}>
            <GooglePlacesAutocomplete
                style={{ zIndex: 10 }}
                placeholder={'Search location address'}
                listViewDisplayed='true'
                getDefaultValue={() => ''}
                value={inputValue}
                fetchDetails={true}
                GooglePlacesDetailsQuery={{ fields: 'formatted_address,geometry' }}
                debounce={300}
                 loader={true}
                styles={{
                    container: {
                        minHeight: 45,
                        zIndex: 999,
                        overflow: 'visible',
                    },
                    listView: {
                        position: 'absolute',
                        zIndex: 300000,
                    },
                    textInputContainer: {
                        backgroundColor: 'white',
                        borderTopWidth: 0,
                        borderBottomWidth: 0.8,
                        borderBottomColor: Colors.g_text,
                        ...style
                    },
                    textInput: {
                        borderWidth: 0,
                        paddingLeft: 0,
                        ...style
                    }
                }}
                onPress={(data, details = null) => {
                    onPress(data, details)
                    setCurrentLocation({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                    })
                    setInputValue(data.description)
                }}
                onChangeText={(txt) => setInputValue(txt)}
                query={{
                    key: 'AIzaSyB21yZhxBVgSsRmFXnoJeFhWz_3WjCNt2M',
                    language: 'en',
                    components: 'country:gbr',
                }}
            />
            {currentLocation && (
                <View style={{ borderWidth: 1, height: 200 }}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: currentLocation.latitude ? currentLocation.latitude : 37.78825,
                            longitude: currentLocation.longitude ? currentLocation.longitude : -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        camera={{
                            center: currentLocation,
                            heading: 0,
                            pitch: 10,
                            zoom: 15,
                            altitude: 10,
                        }}
                    >
                        <Marker
                            coordinate={currentLocation}
                            title={'Current Location'}
                            description={"werw"}
                        />
                    </MapView>
                </View>
            )}
        </View>
    );
}

export default NLGooglePlacesAutocomplete;
