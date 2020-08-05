import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../../constants/color';
import styles from './information-style';
import { Icon } from 'native-base';
import moment from 'moment';
import DetailsCard from './DetailsCard';
import ExperienceCard from './ExperienceCard';

const InformationTab = (props) => {
  console.log(props.DBSCeritificate)
  return (
    <View style={{ flex: 1, backgroundColor: 'white', marginTop: 10 }}>
      <View style={styles.tab1Contain}>
        <View style={styles.tab1Container}>
          <View style={styles.tabs1}>
            <Text style={[styles.tab_text, { color: Colors.s_blue }]}>
              DBS Checked
            </Text>
            {props.DBSCeritificate.Verified == true && <Icon type="MaterialIcons" name="check" style={styles.icons} />}
            {props.DBSCeritificate.Verified == false && <Icon type="MaterialIcons" name="close" style={[styles.icons, { color: 'red' }]} />}
          </View>
          <View style={[styles.tabs1, { justifyContent: 'center' }]}>
            <Text style={[styles.tab_text, { color: Colors.s_blue }]}>
              Valid ID
            </Text>
            {props.VerificationDocument.Verified == true && <Icon type="MaterialIcons" name="check" style={styles.icons} />}
            {props.VerificationDocument.Verified == false && <Icon type="MaterialIcons" name="close" style={[styles.icons, { color: 'red' }]} />}
          </View>
        </View>
      </View>
      <DetailsCard
        title={'About me'}
        value={props.AboutUs}
      />
      <DetailsCard
        title={'Accomplishments'}
        value={props.Accomplishment}
      />
      <ExperienceCard
        title={'Experience'}
        data={props.Experiences.map(e => {
          return {
            id: e.Id,
            title: e.Club,
            desig: e.JobPosition,
            date: `${moment(e.StartDate).format("DD MMM YYYY")} ${e.EndDate ? moment(e.EndDate).format("DD MMM YYYY") : "Till Date"}`,
          }
        })}
      />
      <DetailsCard
        title={'Qualifications'}
        value={props.Qualifications.map(e => {
          return e.Qualification
        }).join("\n")}
      />
    </View>
  );
};

export default InformationTab;
