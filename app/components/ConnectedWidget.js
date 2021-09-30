import React from 'react'
import useAxios from 'axios-hooks'
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native"
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
    const isConnected = () => connectedUsers.length !== 0 && connectedUsers.find(u => u.Id === userToConnectTo) != null
    const onPress = () => {
        const data = {
            "userId": userToConnectTo,
            "isConnected": !isConnected()
        }
        doConnect({ data })
            .then(() => refetch())
            .then(r => dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.CONNECTED_USER, state: r.data }))
    }

    return (
        <>
            {!isConnectedLoading() && (
                <TouchableOpacity style={styles.root} disabled={isConnectedLoading()} onPress={onPress}>
                    <View style={styles.wrapper}>
                        <Image style={styles.image} source={Images.UserPlus} />
                        {isConnected() && <Text style={styles.text}>Connected</Text>}
                        {!isConnected() && <Text style={styles.text}>Connect</Text>}
                    </View>
                </TouchableOpacity>
            )}
            {isConnectedLoading() && (
                <Spinner color={Colors.s_blue} />
            )}
        </>
    );
}

ConnectedWidget.propTypes = {
    userToConnectTo: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    root: {
        opacity: 1
    },
    wrapper: {
        alignItems: 'center'
    },
    image: { height: 40, width: 40 },
    text: {
        fontSize: 12
    }
});

export default ConnectedWidget