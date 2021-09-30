import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Input as TextInput, Icon } from 'native-base';
import PropTypes from 'prop-types';

const QualificationInput = ({ onAddMorePress, onRemovePress, label, onChangeText, disabledPlusBtn }) => (
  <View style={styles.root}>
    <TextInput
      onChangeText={onChangeText}
      value={label}
      placeholder="Type Here..."
      style={styles.input}
    />
    <View style={styles.iconSection}>
      <TouchableOpacity
        style={styles.iconWrapper}
        type="button"
        onPress={onRemovePress}>
        <Icon type="AntDesign" name="close" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabledPlusBtn}
        style={styles.iconWrapper}
        onPress={onAddMorePress}>
        <Icon type="AntDesign" name="plus" style={[styles.icon, disabledPlusBtn === true && styles.disabledIcon]} />
      </TouchableOpacity>
    </View>
  </View>
);

QualificationInput.propTypes = {
  onAddMorePress: PropTypes.func.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  disabledPlusBtn: PropTypes.bool,
}

QualificationInput.defaultProps = {
  disabledPlusBtn: false,

}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: '2%',
    marginBottom: '4%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    fontSize: 16,
    height: 55,
    color: 'black',
  },
  iconSection: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconWrapper: { padding: '3%', marginRight: '5%' },
  icon: {
    fontSize: 22
  },
  disabledIcon: {
    opacity: 0.2
  }
})

export default QualificationInput;
