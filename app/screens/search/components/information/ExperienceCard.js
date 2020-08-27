import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './information-style';
import Images from '../../../../constants/image';

const ExperienceCard = ({title, value, data}) => {
  return (
    <View style={styles.detailContain}>
      <View style={styles.containers}>
        <Text style={styles.titleText}>{title}</Text>
        {data.map((obj, index) => {
          return (
            <View style={styles.expView}>
              <View>
                <Text style={styles.valueText}>{obj.title}</Text>
                <Text style={styles.valueText}>{obj.desig}</Text>
                <Text style={styles.valueText}>{obj.date}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ExperienceCard;
