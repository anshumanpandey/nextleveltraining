import React from 'react';
import { Icon } from 'native-base';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './information-style';
import Colors from '../../../../constants/color';

const DetailsCard = ({ title, value, editable, onPress }) => {
  return (
    <TouchableOpacity disabled={!editable} onPress={() => onPress()}>
      <View style={styles.detailContain}>
        <View style={styles.containers}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.titleText}>{title}</Text>
            {editable == true && (
              <Icon
                type="EvilIcons"
                name="pencil"
                style={{ color: Colors.s_blue, fontSize: 25 }}
              />
            )}
          </View>
          <Text style={styles.valueText}>{value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DetailsCard;
