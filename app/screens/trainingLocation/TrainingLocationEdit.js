import React from 'react'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import { Image } from "react-native"
import { Text, View, Icon } from 'native-base'
import Images from '../../constants/image'
import Colors from '../../constants/color'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TrainingLocationForm } from '../profile/CoachProfile'


const TrainingLocationEdit = (props) => {
    return (
        <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
            <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
            <TrainingLocationForm {...props.navigation.getParam('item')} />
        </View>
    );
}

export default TrainingLocationEdit