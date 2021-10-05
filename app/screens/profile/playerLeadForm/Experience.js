import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import usePlayerLeadContext from './usePlayerLeadContext';
import playerLeadFormStyles from './playerLeadFormStyles';


const ExperienceComponent = () => {
  const { values, setFieldValue, goToNextStep } = usePlayerLeadContext();

  const radioProps = [
    { label: 'No Experience', value: 0 },
    { label: 'Beginner', value: 1 },
    { label: 'Intermediate', value: 2 },
    { label: 'Advance', value: 3 },
  ]

  const setVal = (e) => {
    goToNextStep()
    setFieldValue("experience", radioProps[e].label)
  }
  const optionIsSelected = (opt) => values.experience === opt
  const nextBtnIsDisabled = () => values.experience === ""

  return (
    <View
      style={styles.root}>
      <Text style={styles.title}>
        What is the player&apos;s current level of experience?
      </Text>
      <View style={{ width: '90%' }}>
        <RadioForm animation>
          {radioProps.map((obj, i) => (
            <View
              style={[styles.radioWrapper, { backgroundColor: optionIsSelected(obj.label) ? '#D7EBFF' : 'white', }]}>
              <RadioButton labelHorizontal key={obj.label}>
                <RadioButtonInput
                  obj={obj}
                  index={obj.label}
                  isSelected={optionIsSelected(obj.label)}
                  onPress={setVal}
                  borderWidth={1}
                  buttonInnerColor="#5BADFE"
                  buttonOuterColor={optionIsSelected(obj.label) ? '#2196f3' : '#00000050'}
                  buttonSize={13}
                  buttonOuterSize={20}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal
                  onPress={setVal}
                  labelStyle={styles.label}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            </View>
          ))}
        </RadioForm>
      </View>
      <TouchableOpacity
        disabled={nextBtnIsDisabled()}
        onPress={goToNextStep}
        style={[playerLeadFormStyles.btn, nextBtnIsDisabled() && playerLeadFormStyles.btnDisabled]}>
        <Text style={styles.btnLabel}>
          NEXT
        </Text>
      </TouchableOpacity>
    </View>
  )
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
  radioWrapper: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00000050',
    justifyContent: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    color: 'black',
    width: '100%',
  },
  btnLabel: {
    fontSize: 18, fontWeight: '500', color: 'white'
  }
})

export default ExperienceComponent;