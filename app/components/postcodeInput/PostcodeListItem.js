import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePostCodeSearch } from './state';

const PostcodeListItem = ({ description, onSelect, ...rest }) => {
  const postCodeSearch = usePostCodeSearch()

  const onPress = () => {
    postCodeSearch.setIsSearching(false)
    onSelect(rest)
  }

  return (<TouchableOpacity
    onPress={onPress}
    style={styles.listItem}
  >
    <Text numberOfLines={2} style={styles.listItemText}>
      {description}
    </Text>
  </TouchableOpacity>);
}

PostcodeListItem.propTypes = {
  description: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PostcodeListItem;

const styles = StyleSheet.create({
  listItemText: { fontSize: 14, marginLeft: '2%' },
});