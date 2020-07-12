import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';
import Images from '../../constants/image';
import {Icon} from 'native-base';

const Cards = ({item, onClickItem}) => {
  return (
    <TouchableOpacity onPress={onClickItem} style={styles.cardView}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={Images.PaymentMethodIcon}
          resizeMode={'contain'}
          style={styles.cardImg}
        />
        <Text style={styles.cardTitle}>**** 1023 (UK)</Text>
      </View>
      <Icon
        name="keyboard-arrow-right"
        type="MaterialIcons"
        style={styles.header_menu_icon}
      />
    </TouchableOpacity>
  );
};

export default Cards;
