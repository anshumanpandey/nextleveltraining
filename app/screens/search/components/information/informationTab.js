import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../../../../constants/color';
import styles from './information-style';
import {Icon} from 'native-base';
import DetailsCard from './DetailsCard';
import ExperienceCard from './ExperienceCard';

const InformationTab = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.tab1Contain}>
        <View style={styles.tab1Container}>
          <View style={styles.tabs1}>
            <Text style={[styles.tab_text, {color: Colors.s_blue}]}>
              DBS Checked
            </Text>
            <Icon type="MaterialIcons" name="check" style={styles.icons} />
          </View>
          <View style={[styles.tabs1, {alignItems: 'center'}]}>
            <Text style={[styles.tab_text, {color: Colors.s_blue}]}>
              Valid ID
            </Text>
            <Icon
              type="MaterialIcons"
              name="close"
              style={[styles.icons, {color: 'red'}]}
            />
          </View>
        </View>
      </View>
      <DetailsCard
        title={'About me'}
        value={
          'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting! '
        }
      />
      <DetailsCard
        title={'Accomplishments'}
        value={
          'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting! '
        }
      />
      <ExperienceCard
        title={'Experience'}
        data={[
          {
            id: 1,
            title: 'Club 1',
            desig: 'Head Coach',
            date: '23 Jun 2018 To 23 Jun 2020',
          },
          {
            id: 1,
            title: 'Club 1',
            desig: 'Head Coach',
            date: '23 Jun 2018 To 23 Jun 2020',
          },
          {
            id: 1,
            title: 'Club 1',
            desig: 'Head Coach',
            date: '23 Jun 2018 To 23 Jun 2020',
          },
          {
            id: 1,
            title: 'Club 1',
            desig: 'Head Coach',
            date: '23 Jun 2018 To 23 Jun 2020',
          },
        ]}
      />

      <DetailsCard
        title={'Qualification'}
        value={
          'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting! '
        }
      />
    </View>
  );
};

export default InformationTab;
