import React from 'react'
import useAxios from 'axios-hooks'
import { Spinner } from 'native-base';
import { TouchableOpacity, Image, Text } from "react-native"
import Colors from '../constants/color';
import Images from '../constants/image';
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../state/GlobalState';

const ConnectedWidget = ({ userToConnectTo }) => {
    const [connectedUsers] = useGlobalState("connectedUsers")
    const [getconnectedUserReq, refetch] = useAxios({
        url: '/Users/GetConnectedUsers',
    }, { manual: true })

    const [connectedUserReq, doConnect] = useAxios({
        url: '/Users/ConnectUser',
        method: 'POST'
    }, { manual: true })

    const isConnectedLoading = () => connectedUserReq.loading || getconnectedUserReq.loading
    const isConnected = () => connectedUsers.length != 0 && connectedUsers.find(u => u.Id == userToConnectTo) != null

    return (
        <>
            {!isConnectedLoading() && (
                <TouchableOpacity style={{ alignItems: 'center', opacity: isConnectedLoading() ? 0.3 : 1 }} disabled={isConnectedLoading()} onPress={() => {
                    const data = {
                        "userId": userToConnectTo,
                        "isConnected": !isConnected()
                    }
                    console.log(data)
                    doConnect({ data })
                        .then(() => refetch())
                        .then(r => dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.CONNECTED_USER, state: r.data }))
                }}>
                    <Image style={{ height: 40, width: 40, marginRight: '15%' }} source={Images.UserPlus} />
                    {isConnected() && <Text style={{ fontSize: 12 }}>Connected</Text>}
                    {!isConnected() && <Text style={{ fontSize: 12 }}>Connect</Text>}
                </TouchableOpacity>
            )}
            {isConnectedLoading() && (
                <Spinner color={Colors.s_blue} />
            )}
        </>
    );

}

export default ConnectedWidget