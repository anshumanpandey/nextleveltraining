import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Spinner, View, Tabs, Tab, Icon } from 'native-base'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import Colors from '../../constants/color'
import { BankAccountForm } from '../profile/coachProfile/CoachProfile'
import NLSaveButton from '../../components/NLSaveButton'

const AboutMeScreen = (props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [submitFn, setSubmitFn] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  let [profile] = useGlobalState('profile')
  if (props?.navigation?.state?.params?.player) profile = props.navigation.state.params.player

  console.log("submitFn", submitFn)

  if (profile?.Role == "Player") {

    return (
      <>
        <Header
          title="About Me"
          hideCreatePost
          toggleDrawer={props.navigation.toggleDrawer}
          navigate={props.navigation.navigate}
          customButton={() =>
          // if (currentTab == 0) return <></>

          (
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
              <NLSaveButton
                disabled={isSaving === true}
                onPress={() => {
                  setIsSaving(true)
                  if (submitFn) {
                    submitFn().then(() => {
                      setIsSaving(false)
                    })
                  }
                }}
              />
            </View>
          )
          }
        />
        {resolveRoleForm(profile, "AboutMe", { player: profile, submit: true, navigation: props.navigation }, (cb) => {
          if (cb == null) {
            setSubmitFn(null)
          } else {
            setSubmitFn(cb)
          }
        })}
      </>
    );

  }

  return (
    <>
      <Tabs tabBarUnderlineStyle={{ backgroundColor: Colors.s_blue }} onChangeTab={(e) => {
        setCurrentTab(e.i)
      }}>
        <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="About Me">
          {resolveRoleForm(profile, "AboutMe", { player: profile, navigation: props.navigation }, (cb) => {
            if (cb == null) {
              setSubmitFn(null)
            } else {
              setSubmitFn(cb)
            }
          })}
        </Tab>
        <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Bank Accounts">
          <BankAccountForm navigation={props.navigation} />
        </Tab>
      </Tabs>

    </>
  );
}

export default AboutMeScreen