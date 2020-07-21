import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Header from '../../components/header/Header'
import NLUserDataForm from '../../components/userDataForm/NLUserDataForm'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { compose } from 'redux'

const EditProfile = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [submitFn, setSubmitFn] = useState();

    return (
        <ScrollView keyboardShouldPersistTaps="handled" style={{
            width: "100%",
            height: "100%",
            backgroundColor: 'white'
        }}>
            <View style={{
                backgroundColor: 'white',
                height: "100%",
                width: "100%"
            }}>
                <Header
                    hideCreatePost={true}
                    toggleDrawer={props.navigation.toggleDrawer}
                    navigate={props.navigation.navigate}
                    customButton={() => {
                        return (
                            <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                                {isSaving && <Spinner size={28} color="black" style={{ right: 20, position: 'absolute', marginRight: '10%', height: '10%' }} />}
                                <TouchableOpacity
                                    disabled={isSaving == true}
                                    onPress={() => {
                                        if (submitFn) {
                                            setIsSaving(true)
                                            submitFn()
                                            .then(() => setIsSaving(false))
                                        }
                                    }}>
                                    <Text style={{ color: 'black', opacity: isSaving == true ? 0.5 : 1, fontSize: 18 }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
                <NLUserDataForm
                    {...props}
                    hidePasswordInput={true}
                    hideSaveBtn={true}
                    setSubmitFn={(submitFn) => {
                        setSubmitFn(() => submitFn)
                    }}
                />
            </View>
        </ScrollView>
    )
}

export default EditProfile
