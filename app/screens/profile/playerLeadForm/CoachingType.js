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

const AgeComponent = () => {
  const { values, setFieldValue, goToNextStep, goToPevStep } = usePlayerLeadContext();

  const options = [
    { label: "1-1 coaching" },
    { label: "Small group sessions" },
    { label: "Large group sessions (team)" },
  ]

  const optionIsSelected = (opt) => values.coachingType.includes(opt)

  const toggleOption = (opt) => () => {
    const found = values.coachingType.find(i => i === opt.label)
    if (found) {
      setFieldValue("coachingType", values.coachingType.filter(i => i !== opt.label))
    } else {
      setFieldValue("coachingType", values.coachingType.concat([opt.label]))
    }
  }

  const nextBtnIsDisabled = () => values.coachingType.length === 0

  return (
    <View
      style={styles.root}>
      <Text style={styles.title}>
        What type of coaching would you consider?
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
    height: 500,
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

export default AgeComponent;