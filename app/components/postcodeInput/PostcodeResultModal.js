import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import useAxios from 'axios-hooks';
import { Text, StyleSheet, FlatList } from 'react-native';
import Modal from "react-native-modal";
import { GOOGLE_API_KEY } from '../../constants/google';
import PostcodeListItem from './PostcodeListItem';

const EmptyListComponent = () => <Text style={styles.emptyListText}>No locations found</Text>

const PostcodeResultModal = ({ postCode, isVisible, onSelect, onResultsFound, onCancel, coordinates }) => {
  const [gettingDetails, setGettingDetails] = useState(false)
  const [{ data: results = { predictions: [] }, loading }, doSearch] = useAxios({
    url: generateSearchUrl(postCode),
    method: 'POST',
  }, { manual: true });

  const isRefreshing = () => loading
  const isFetching = () => gettingDetails

  const performSearch = useCallback(() => {
    doSearch()
      .then(({ data }) => data.status === "OK" ? data.predictions : Promise.reject(data.error_message))
      .then((data) => {
        onResultsFound(data)
      })
      .catch(() => {
        onResultsFound([])
      })
  }, [doSearch, onResultsFound])

  const renderItem = ({ item }) => (
    <PostcodeListItem {...item} onSelect={onSelect} onGettingDetails={setGettingDetails} suggestions={results} />
  );

  return (
    <Modal
      onRequestClose={onCancel}
      onBackdropPress={onCancel}
      animationInTiming={1}
      animationOutTiming={1}
      style={[styles.modal, { marginHorizontal: coordinates.x, maxHeight: coordinates.y / 2, marginTop: coordinates.y }]}
      isVisible={isVisible}
      backdropColor="transparent"
      onShow={performSearch}>
      {isRefreshing() ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          refreshing
          onRefresh={() => { }}
          data={[]}
        />
      ) : (
        <FlatList
          keyboardShouldPersistTaps="always"
          refreshing={isFetching()}
          onRefresh={() => { }}
          data={results.predictions}
          renderItem={renderItem}
          ListEmptyComponent={<EmptyListComponent />}
          keyExtractor={item => item.place_id}
        />
      )}
    </Modal>
  );
};

PostcodeResultModal.propTypes = {
  postCode: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onResultsFound: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
}

PostcodeResultModal.defaultProps = {
  onResultsFound: () => { },
}

export default PostcodeResultModal;

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const generateSearchUrl = (term) => `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${term}&fields=address_component&components=country:gb`;

const styles = StyleSheet.create({
  emptyListText: { textAlign: "center", fontSize: 18 },
  modal: { backgroundColor: "white" },
});