import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';

const UserCard = ({title, data, onEditPress}) => {
  return (
    <TouchableOpacity
      onPress={() => onEditPress()}
      style={styles.cardContainer}>
      <View
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text style={styles.titleText}>{title}</Text>
        <Icon
          type="EvilIcons"
          name="pencil"
          style={{color: '#0F2F80', fontSize: 25}}
        />
      </View>
      <View style={{marginTop: data ? 10 : 20, marginRight: 15}}>
        <Text style={styles.dataText}>{data}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
