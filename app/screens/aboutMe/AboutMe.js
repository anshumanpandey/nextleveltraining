import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import { Spinner, View } from 'native-base'

const AboutMeScreen = (props) => {
    const [submitFn, setSubmitFn] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    let [profile] = useGlobalState('profile')
    if (props?.navigation?.state?.params?.player) profile = props.navigation.state.params.player

    console.log("submitFn", submitFn)

    return (
        <>
            <Header
                hideCreatePost={true}
                toggleDrawer={props.navigation.toggleDrawer}
                navigate={props.navigation.navigate}
                customButton={() => {
                    if (submitFn == null) return <></>

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

export default AboutMeScreen