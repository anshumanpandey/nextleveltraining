import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Spinner } from 'native-base'
import Colors from '../../constants/color'
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState'

const LogoutScreen = (props) => {
    const [, setToggle] = useGlobalState("toggle")

    useEffect(() => {
        const focusListener = props.navigation.addListener('didFocus', () => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.LOGOUT })
            console.log('dispatching 1 logout')
        });
        dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.LOGOUT })
        console.log('dispatching 2 logout')
        return () => {
            focusListener?.remove();
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOGGLE })
        }
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner size={200} color={Colors.s_yellow} />
        </View>
    )
}

export default LogoutScreen
