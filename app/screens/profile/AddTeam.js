import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';
import DatePicker from 'react-native-datepicker';

const AddTeam = (props) => {
  const cb = props.navigation.state.params.cb;
  const [teamName, setTeamName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isChecked, setChecked] = useState(false);
  return (
    <View>
      <HeaderClosePlus
        isSaveButton={true}
        saveOnPress={() => {
          cb({
            id: 11,
            title: teamName,
            startDate,
            endDate,
          });
          NavigationService.goBack();
        }}
      />
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{padding: 30}}>
        <View style={styles.inputContain}>
          <TextInput
            onChangeText={(text) => setTeamName(text)}
            style={{textAlign: 'left', padding: Dimension.px10, fontSize: 15}}
            placeholder="Team Name"
            keyboardType="email-address"
          />
        </View>

        <Text style={styles.timePeriod}>Time Period</Text>

        <View style={styles.pickerView}>
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

          <Text style={styles.dateText}>TO</Text>
          <DatePicker
            mode="date"
            date={endDate}
            format="DD-MM-YYYY"
            placeholder={'Select Date'}
            showIcon={false}
            customStyles={styles.dateInputs}
            cancelBtnText="Cancel"
            confirmBtnText="Confirm"
            onDateChange={(date) => {
              setEndDate(date);
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => setChecked(!isChecked)}
          style={styles.checkView}>
          <Icon
            name={isChecked ? 'check-square' : 'square'}
            type="Feather"
            style={styles.checkIcon}
          />
          <Text style={styles.checkText}>Currently playing with</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTeam;
