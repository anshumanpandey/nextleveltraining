import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import CheckBox from '@react-native-community/checkbox'


const QualificationItem = ({ onCheck, label, isChecked }) => (
  <View style={styles.root}>
    <TouchableOpacity style={styles.touchable} onPress={onCheck}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
    <CheckBox
      value={isChecked}
      onValueChange={onCheck}
    />
  </View>
);

QualificationItem.propTypes = {
  onCheck: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  root: {
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  touchable: {
    justifyContent: 'flex-start',
    width: "90%"
  },
  label: {
    fontSize: 16,
    padding: '3%'
  }
})

export default QualificationItem;
