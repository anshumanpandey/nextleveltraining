import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../../../../navigation/NavigationService';
import styles from './information-style';

const ExperienceCard = ({ title, value, data, editable }) => {
  return (
    <View style={styles.detailContain}>
      <View style={styles.containers}>
        <TouchableOpacity
          disabled={!editable}
          onPress={() => {
            NavigationService.navigate('AddExperience', {
              title: 'Add Experience',
              goBackTo: 'Profile',
              cb: (team) => { },
            })
          }}
        >
          <Text style={styles.titleText}>{title}</Text>
        </TouchableOpacity>
        {data.map((obj, index) => {
          return (
            <TouchableOpacity
              disabled={!editable}
              onPress={() => {
                NavigationService.navigate('AddExperience', {
                  title: 'Add Experience',
                  goBackTo: 'Profile',
                  cb: (team) => { },
                  ...obj
                })
              }}
            >
              <View style={styles.expView}>
                <View>
                  <Text style={styles.valueText}>{obj.title}</Text>
                  <Text style={styles.valueText}>{obj.desig}</Text>
                  <Text style={styles.valueText}>{obj.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ExperienceCard;
