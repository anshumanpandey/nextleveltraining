import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Spinner } from 'native-base'
import Colors from '../../constants/color'
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState'

const LogoutScreen = (props) => {

    useEffect(() => {
        const focusListener = props.navigation.addListener('didFocus', () => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.LOGOUT })
            console.log('dispatching logout')
        });
        dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.LOGOUT })
        console.log('dispatching logout')
        return () => focusListener?.remove();
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner size={200} color={Colors.s_yellow} />
        </View>
    )
}

export default LogoutScreen
