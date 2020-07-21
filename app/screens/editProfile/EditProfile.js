import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Header from '../../components/header/Header'
import NLUserDataForm from '../../components/userDataForm/NLUserDataForm'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { compose } from 'redux'

const EditProfile = (props) => {
    const [submitFn, setSubmitFn] = useState();
    
    return (
        <View style={{ flexGrow: 1 }}>
            <Header
                hideCreatePost={true}
                toggleDrawer={props.navigation.toggleDrawer}
                navigate={props.navigation.navigate}
                customButton={() => {
                    return (
                        <TouchableOpacity onPress={() => {
                            if (submitFn) {
                                submitFn()
                            }
                        }}>
                            <Text>Save</Text>
                        </TouchableOpacity>
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
    )
}

export default EditProfile
