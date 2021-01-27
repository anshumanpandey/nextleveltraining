import React, { useState } from 'react'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import { View, TouchableOpacity, Text } from 'react-native'
import { Spinner } from 'native-base'
import { AvailabiltyForm } from '../profile/CoachProfile'
import NavigationService from '../../navigation/NavigationService'
import {Icon} from 'native-base'

const AvailavilityScreen = (props) => {
    const [submitFn, setSubmitFn] = useState();
    const [isSaving, setIsSaving] = useState(false);

    return (
        <>
            <Header
                hideCreatePost={true}
                toggleDrawer={props.navigation.toggleDrawer}
                navigate={props.navigation.navigate}
                customButton={() => {
                    return (
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
                          onPress={() => props.navigation.goBack()}
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
                                .then(() => setIsSaving(false))
                                  .catch(err => {
                                    console.log("my erro:", err)
                                  if (err == 'NO_DATA') {
                                    NavigationService.navigate('Home')
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
                    )
                }}
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