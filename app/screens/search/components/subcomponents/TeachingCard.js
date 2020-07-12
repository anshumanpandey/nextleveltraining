import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './../information/information-style';
import Images from '../../../../constants/image';

const TeachingCard = ({data}) => {
  return (
    <View style={styles.detailContain}>
      <View style={styles.containers}>
        {data.map((obj, index) => {
          return (
            <View style={styles.expView}>
              <Image source={Images.MessiPlayer} style={styles.expImg} />
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.valueText}>{obj.title}</Text>
                <Text style={styles.valueText}>{obj.subTitle}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TeachingCard;
