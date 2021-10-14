import React, { useState } from 'react'
import { Icon, View, Spinner } from 'native-base'
import Header from '../../components/header/Header'
import { TrainingLocationForm } from '../profile/coachProfile/TrainingLocationForm'
import NavigationService from '../../navigation/NavigationService'
import NLSaveButton from '../../components/NLSaveButton'


const TrainingLocationEdit = (props) => {
  const [submitFn, setSubmitFunction] = useState()
  const [isSaving, setIsSaving] = useState(false);

  return (
    <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
      <Header
        title="Add Location"
        customButton={() => (
          <>
            <Icon
              onPress={() => props.navigation.goBack()}
              type="Feather"
              name="arrow-left"
              style={{
                position: 'absolute',
                left: 15,
                fontSize: 22,
                zIndex: 1,
                color: '#2D7AF0',
              }}
            />
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
              <NLSaveButton
                disabled={isSaving === true}
                onPress={() => {
                  if (submitFn) {
                    setIsSaving(true)
                    submitFn().then(() => {
                      setIsSaving(false)
                      NavigationService.navigate('TrainingLocation')
                    })
                  }
                }} />
            </View>
          </>
        )}
        hideCreatePost
        toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate}
      />
      <TrainingLocationForm
        navigation={props.navigation}
        isSaving={isSaving}
        setSubmitFn={(fn) => {
          setSubmitFunction(() => fn)
        }} {...props.navigation.state.params.item} />
    </View>
  );
}

export default TrainingLocationEdit