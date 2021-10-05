import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import CheckBox from '@react-native-community/checkbox';
import usePlayerLeadContext from './usePlayerLeadContext';
import playerLeadFormStyles from './playerLeadFormStyles';

const CoachingSessions = () => {
  const { values, setFieldValue, goToNextStep, goToPevStep } = usePlayerLeadContext();

  const options = [
    { label: "Early morning (06:00 - 09:00)" },
    { label: "Late morning (09:00 - 12:00)" },
    { label: "Early afternoon (12:00 - 15:00)" },
    { label: "Late afternoon (15:00 - 18:00)" },
    { label: "Evening (18:00 - 22:00)" },
  ]

  const optionIsSelected = (opt) => values.coachingSessions.includes(opt)

  const toggleOption = (opt) => () => {
    const found = values.coachingSessions.find(i => i === opt.label)
    if (found) {
      setFieldValue("coachingSessions", values.coachingSessions.filter(i => i !== opt.label))
    } else {
      setFieldValue("coachingSessions", values.coachingSessions.concat([opt.label]))
    }
  }

  const nextBtnIsDisabled = () => values.coachingSessions.length === 0

  return (
    <View
      style={styles.root}>
      <Text style={styles.title}>
        Which time(s) of day would you consider for coaching?
      </Text>
      <View style={{ width: '90%' }}>
        {options.map(item => (
          <View
            style={[styles.checkboxWrapper, { backgroundColor: optionIsSelected(item.label) ? '#D7EBFF' : 'white', }]}>
            <CheckBox
              style={{ height: '40%' }}
              disabled={false}
              value={optionIsSelected(item.label)}
              onValueChange={toggleOption(item)}
            />
            <TouchableOpacity
              onPress={toggleOption(item)}
              activeOpacity={1}
              style={{ width: '80%' }}>
              <Text
                style={styles.label}>
                {item.label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={goToPevStep}
          style={playerLeadFormStyles.btn}>
          <Text style={styles.btnLabel}>
            PREVIOUS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={nextBtnIsDisabled()}
          onPress={goToNextStep}
          style={[playerLeadFormStyles.btn, nextBtnIsDisabled() && playerLeadFormStyles.btnDisabled]}>
          <Text style={styles.btnLabel}>
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
    </View>)
}

const styles = StyleSheet.create({
  root: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 650,
    marginBottom: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 20, fontWeight: '500', textAlign: 'center'
  },
  checkboxWrapper: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    color: 'black',
    width: '100%',
    height: '100%',
    marginTop: 25,
  },
  btnLabel: {
    fontSize: 18, fontWeight: '500', color: 'white'
  }
})

export default CoachingSessions;