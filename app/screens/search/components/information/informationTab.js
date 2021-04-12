import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../../constants/color';
import styles from './information-style';
import { Icon } from 'native-base';
import moment from 'moment';
import DetailsCard from './DetailsCard';
import ExperienceCard from './ExperienceCard';
import NavigationService from '../../../../navigation/NavigationService';

const handleOnCardPress = ({ title, data, screen = "EditInput", keyboardType, goBackTo }) => {
  NavigationService.navigate(screen, {
    title,
    data,
    goBackTo,
    keyboardType,
    cb: (achievements) => { },
  })
}

const InformationTab = (props) => {
  console.log(props)
  return (
    <View style={{ flex: 1, backgroundColor: 'white', marginTop: 10 }}>
      {/* <View style={styles.tab1Contain}>
        <View style={styles.tab1Container}>
          <View style={styles.tabs1}>
            <Text style={[styles.tab_text, { color: Colors.s_blue }]}>
              DBS Checked
            </Text>
            {props.coach?.DBSCeritificate?.Verified == true && <Icon type="MaterialIcons" name="check" style={styles.icons} />}
            {(!props.coach?.DBSCeritificate || props.coach?.DBSCeritificate.Verified == false) && <Icon type="MaterialIcons" name="close" style={[styles.icons, { color: 'red' }]} />}
          </View>
          <View style={[styles.tabs1, { justifyContent: 'center' }]}>
            <Text style={[styles.tab_text, { color: Colors.s_blue }]}>
              Valid ID
            </Text>
            {props.coach?.VerificationDocument?.Verified == true && <Icon type="MaterialIcons" name="check" style={styles.icons} />}
            {(!props.coach.VerificationDocument || props.coach?.VerificationDocument?.Verified == false) && <Icon type="MaterialIcons" name="close" style={[styles.icons, { color: 'red' }]} />}
          </View>
        </View>
      </View> */}
      <DetailsCard
        onPress={() => handleOnCardPress({ title: "About Me", data: props.coach.AboutUs, goBackTo: 'Profile' })}
        editable={props.editable}
        title={'About me'}
        value={props.coach.AboutUs}
      />
      <DetailsCard
        onPress={() => handleOnCardPress({ title: "Accomplishment", data: props.coach.Accomplishment, goBackTo: 'Profile' })}
        editable={props.editable}
        title={'Accomplishments'}
        value={props.coach.Accomplishment}
      />
      <ExperienceCard
        editable={props.editable}
        title={'Experience'}
        data={props.coach.Experiences.map(e => {
          return {
            id: e.Id,
            title: e.Club,
            desig: e.JobPosition,
            date: `${moment(e.StartDate).format("DD MMM YYYY")} ${e.EndDate ? moment(e.EndDate).format("DD MMM YYYY") : "Till Date"}`,
            ...e
          }
        })}
      />
      <DetailsCard
        onPress={() => {
          NavigationService.navigate('AddQualifications', {
            title: 'Add Experience',
            cb: (team) => { },
            goBackTo: 'Profile',
            Qualifications: props.coach.Qualifications
          })
        }}
        editable={props.editable}
        title={'Qualifications'}
        value={props.coach.Qualifications.map(e => {
          return e.Qualification
        }).join("\n")}
      />
    </View>
  );
};

export default InformationTab;
