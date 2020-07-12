import React from 'react';
import {View, Text} from 'react-native';
import styles from './information-style';

const DetailsCard = ({title, value}) => {
  return (
    <View style={styles.detailContain}>
      <View style={styles.containers}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
};

export default DetailsCard;
