import React from 'react'
import { View } from 'react-native'
import Header from '../../components/header/Header'
import NLUserDataForm from '../../components/userDataForm/NLUserDataForm'

const EditProfile = (props) => {
    
    return (
        <View style={{ flexGrow: 1 }}>
            <Header toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
            <NLUserDataForm {...props} hidePasswordInput={true} />
        </View>
    )
}

export default EditProfile
