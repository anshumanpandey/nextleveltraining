import React, { useState, useEffect, useCallback } from 'react'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import { TouchableOpacity } from "react-native"
import { Text, View, Spinner, Icon } from 'native-base'
import { TrainingLocationForm } from '../profile/CoachProfile'
import NavigationService from '../../navigation/NavigationService'


const TrainingLocationEdit = (props) => {
    const [submitFn, setSubmitFunction] = useState()
    const [isSaving, setIsSaving] = useState(false);

    return (
        <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
            <Header
                title="Add Location"
                customButton={() => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          flexGrow: 1,
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
                        {/* <Icon
                          onPress={() => props.navigation.goBack()}
                          type="Feather"
                          name="arrow-left"
                          style={{
                            left: 15,
                            fontSize: 22,
                            color: '#2D7AF0',
                          }}
                        /> */}
                        <TouchableOpacity
                          disabled={isSaving == true}
                          onPress={() => {
                            if (submitFn) {
                              setIsSaving(true)
                              submitFn().then(() => {
                                setIsSaving(false)
                                NavigationService.navigate('TrainingLocation')
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
                hideCreatePost={true}
                toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate}
            />
            <TrainingLocationForm navigation={props.navigation} isSaving={isSaving} setSubmitFn={(fn) => {
                setSubmitFunction(() => fn)
            }} {...props.navigation.state.params.item} />
        </View>
    );
}

export default TrainingLocationEdit