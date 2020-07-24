import React, { useState } from 'react'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import { TouchableOpacity } from "react-native"
import { Text, View, Spinner } from 'native-base'
import { TrainingLocationForm } from '../profile/CoachProfile'
import NavigationService from '../../navigation/NavigationService'


const TrainingLocationEdit = (props) => {
    const [submitFn, setSubmitFunction] = useState()
    const [isSaving, setIsSaving] = useState(false);

    return (
        <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
            <Header
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
                                            .then(() => {
                                                setIsSaving(false)
                                                setTimeout(() => NavigationService.navigate('TrainingLocation'), 1000)
                                            })
                                    }
                                }}>
                                <Text style={{ color: 'black', opacity: isSaving == true ? 0.5 : 1, fontSize: 18 }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
                hideCreatePost={true}
                toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate}
            />
            <TrainingLocationForm navigation={props.navigation} setSubmitFn={(fn) => {
                setSubmitFunction(() => fn)
            }} {...props.navigation.getParam('item')} />
        </View>
    );
}

export default TrainingLocationEdit