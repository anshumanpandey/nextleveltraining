import React, { useState } from 'react'
import { Spinner, View, Icon } from 'native-base'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import FindCoachForm from './FindCoachForm'

const FindCoach = props => {
  const [isSaving, setIsSaving] = useState(false)
  let [profile] = useGlobalState('profile')
  if (props?.navigation?.state?.params?.player)
    profile = props.navigation.state.params.player

  return (
    <>
      <Header
        title="Find a Coach"
        hideCreatePost
        toggleDrawer={props.navigation.toggleDrawer}
        navigate={props.navigation.navigate}
        customButton={() => (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 1,
            }}>
            {isSaving == true && (
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
          </View>
        )
        }
      />
      <FindCoachForm />
    </>
  )
}

export default FindCoach
