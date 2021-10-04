import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Spinner, Icon } from 'native-base'
import Header from '../../components/header/Header'
import { AvailabiltyForm } from '../profile/coachProfile/CoachProfile'
import NavigationService from '../../navigation/NavigationService'

const AvailavilityScreen = (props) => {
  const { navigation } = props
  const [submitFn, setSubmitFn] = useState();
  const [isSaving, setIsSaving] = useState(false);

  return (
    <>
      <Header
        hideCreatePost
        toggleDrawer={navigation.toggleDrawer}
        navigate={navigation.navigate}
        customButton={() => (
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {isSaving && (
              <Spinner
                size={28}
                color="black"
                style={{
                  right: 20,
                  position: 'absolute',
                  marginRight: '10%',
                  height: '10%',
                }}
              />
            )}
            <Icon
              onPress={() => navigation.goBack()}
              type="Feather"
              name="arrow-left"
              style={{
                left: 15,
                fontSize: 22,
                color: '#2D7AF0',
              }}
            />
            <TouchableOpacity
              disabled={isSaving == true}
              onPress={() => {
                setIsSaving(true)
                if (submitFn) {
                  submitFn()
                    .then(() => {
                      setIsSaving(false)
                      navigation.goBack()
                    })
                    .catch(err => {
                      console.log("my erro:", err)
                      if (err == 'NO_DATA') {
                        navigation.goBack()
                      }
                      setIsSaving(false)
                    })
                }
              }}>
              <Text
                style={{
                  color: 'black',
                  opacity: isSaving == true ? 0.5 : 1,
                  fontSize: 18,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <AvailabiltyForm
        setSubmitFn={(submitFn) => {
          setSubmitFn(() => submitFn)
        }}
      />
    </>
  );
}

export default AvailavilityScreen