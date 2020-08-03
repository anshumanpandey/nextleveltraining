import React from 'react'
import useAxios from 'axios-hooks'
import { Spinner } from 'native-base';
import { TouchableOpacity, Image, Text } from "react-native"
import Colors from '../constants/color';
import Images from '../constants/image';

const ConnectedWidget = ({ userToConnectTo }) => {
    const [getconnectedUserReq, refetch] = useAxios({
        url: '/Users/GetConnectedUsers',
    })

    const [connectedUserReq, doConnect] = useAxios({
        url: '/Users/ConnectUser',
        method: 'POST'
    }, { manual: true })

    const isConnectedLoading = () => connectedUserReq.loading || getconnectedUserReq.loading
    const isConnected = () => getconnectedUserReq.data && getconnectedUserReq.data.length != 0 && getconnectedUserReq.data.find(u => u.Id == userToConnectTo) != null

    return (
        <>
            {!isConnectedLoading() && (
                <TouchableOpacity style={{ alignItems: 'center', opacity: isConnectedLoading() ? 0.3 : 1 }} disabled={isConnectedLoading()} onPress={() => {
                    const data = {
                        "userId": userToConnectTo,
                        "isConnected": !isConnected()
                    }
                    doConnect({ data })
                        .then(() => refetch())
                }}>
                    <Image style={{ height: 40, width: 40, marginRight: '15%' }} source={Images.ConnectIcon} />
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