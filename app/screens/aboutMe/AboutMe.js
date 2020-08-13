import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import { Spinner, View, Tabs, Tab } from 'native-base'
import Colors from '../../constants/color'
import { BankAccountForm } from '../profile/CoachProfile'

const AboutMeScreen = (props) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [submitFn, setSubmitFn] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    let [profile] = useGlobalState('profile')
    if (props?.navigation?.state?.params?.player) profile = props.navigation.state.params.player

    console.log("submitFn", submitFn)

    if (profile.Role == "Player") {

        return (
            <>
                <Header
                    title="About Me"
                    hideCreatePost={true}
                    toggleDrawer={props.navigation.toggleDrawer}
                    navigate={props.navigation.navigate}
                    customButton={() => {
                        if (currentTab == 0) return <></>

                        return (
                            <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                                {isSaving == true && <Spinner size={28} color="black" style={{ right: 20, position: 'absolute', marginRight: '10%', height: '10%' }} />}
                                <TouchableOpacity
                                    disabled={isSaving == true}
                                    onPress={() => {
                                        setIsSaving(true)
                                        if (submitFn) {
                                            submitFn()
                                                .then(() => {
                                                    setIsSaving(false)
                                                })
                                        }
                                    }}>
                                    <Text style={{ color: 'black', opacity: isSaving == true ? 0.5 : 1, fontSize: 18 }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
                {resolveRoleForm(profile, "AboutMe", { player: profile }, (cb) => {
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
            <Header
                hideCreatePost={true}
                toggleDrawer={props.navigation.toggleDrawer}
                navigate={props.navigation.navigate}
                customButton={() => {
                    if (currentTab == 0) return <></>

                    return (
                        <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                            {isSaving == true && <Spinner size={28} color="black" style={{ right: 20, position: 'absolute', marginRight: '10%', height: '10%' }} />}
                            <TouchableOpacity
                                disabled={isSaving == true}
                                onPress={() => {
                                    setIsSaving(true)
                                    if (submitFn) {
                                        submitFn()
                                            .then(() => {
                                                setIsSaving(false)
                                            })
                                    }
                                }}>
                                <Text style={{ color: 'black', opacity: isSaving == true ? 0.5 : 1, fontSize: 18 }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
            <Tabs tabBarUnderlineStyle={{ backgroundColor: Colors.s_blue }} onChangeTab={(e) => {
                setCurrentTab(e.i)
            }}>
                <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="About Me">
                    {resolveRoleForm(profile, "AboutMe", { player: profile }, (cb) => {
                        if (cb == null) {
                            setSubmitFn(null)
                        } else {
                            setSubmitFn(cb)
                        }
                    })}
                </Tab>
                <Tab textStyle={{ color: Colors.s_blue }} activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Bank Accounts">
                    <BankAccountForm setSubmitFn={(fn) => setSubmitFn(() => fn)} />
                </Tab>
            </Tabs>

        </>
    );
}

export default AboutMeScreen