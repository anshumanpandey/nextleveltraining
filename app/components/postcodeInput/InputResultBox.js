import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import Axios from 'axios';
import { GOOGLE_API_KEY } from '../../constants/google';
import { usePostCodeSearch } from './state';
import PostcodeListItem from './PostcodeListItem';

const EmptyListComponent = () => <Text style={styles.emptyListText}>No locations found</Text>


const InputResultBox = ({ postCode, isVisible, onSelect, onResultsFound, coordinates }) => {
  const { isSearching } = usePostCodeSearch()

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState({ predictions: [] })

  const fetchSuggestions = useCallback(() => Axios({
    url: generateSearchUrl(postCode),
    method: 'POST',
  })
    .then((r) => r.data), [postCode])

  const isRefreshing = useCallback(() => isSearching || loading, [loading, isSearching])

  const canSearch = useCallback(() => isVisible === true && isRefreshing() === false, [isVisible, isRefreshing])

  const performSearch = useCallback(() => {
    setLoading(true)
    fetchSuggestions()
      .then((data) => data.status === "OK" ? data : Promise.reject(data.error_message))
      .then((data) => {
        onResultsFound(data)
        setResults(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setResults({ predictions: [] })
        onResultsFound([])
      })
  }, [onResultsFound, fetchSuggestions])

  useEffect(() => {
    if (canSearch() === true) {
      performSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postCode])

  const renderItem = ({ item }) => (
    <PostcodeListItem {...item} onSelect={onSelect} suggestions={results} />
  );

  const position = {
    left: coordinates?.x || 0,
    top: coordinates.height + coordinates.height,
    width: coordinates.width,
    height: coordinates.height * 4,
  }

  return (
    <>
      {isVisible && (
        <View
          style={[styles.root, position]}>
          <FlatList
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="always"
            refreshing={isRefreshing()}
            onRefresh={() => { }}
            data={results.predictions}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyListComponent />}
            keyExtractor={item => item.place_id}
          />
        </View>
      )}
    </>
  );
};

InputResultBox.propTypes = {
  postCode: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onResultsFound: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
}

InputResultBox.defaultProps = {
  onResultsFound: () => { },
}

export default InputResultBox;

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const generateSearchUrl = (term) => `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${term}&fields=address_component&components=country:gb`;

const styles = StyleSheet.create({
  emptyListText: { textAlign: "center", fontSize: 18 },
  root: {
    position: "absolute",
    zIndex: 101,
  },
  list: { backgroundColor: "white", height: "100%" }
});