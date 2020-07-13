import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';
import DatePicker from 'react-native-datepicker';

const UpComingMatch = (props) => {
  const cb = props.navigation.state.params.cb;
  const [teamName, setTeamName] = useState('');
  const [startDate, setStartDate] = useState('');
  return (
    <View>
      <HeaderClosePlus
        isSaveButton={true}
        saveOnPress={() => {
          cb({
            id: 11,
            title: teamName,
            startDate,
          });
          NavigationService.goBack();
        }}
      />
      <View style={{padding: 30}}>
        <Text style={styles.titleText}>Playing Against Team Name</Text>
        <View style={[styles.inputContain,{ marginTop: 0}]}>
          <TextInput
            onChangeText={(text) => setTeamName(text)}
            style={{textAlign: 'left', padding: Dimension.px10, fontSize: 15}}
            // placeholder="Team Name"
            // keyboardType="email-address"
          />
        </View>

        <Text style={[styles.titleText,{ marginTop: 20}]}>Match Date</Text>

        <View style={[styles.pickerView, {marginTop: Dimension.px15}]}>
          <DatePicker
            mode="date"
            date={startDate}
            format="DD-MM-YYYY"
            placeholder={'Select Date'}
            showIcon={false}
            customStyles={styles.dateInputs}
            cancelBtnText="Cancel"
            confirmBtnText="Confirm"
            onDateChange={(date) => {
              setStartDate(date);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default UpComingMatch;
