import React, { Component, useRef, useEffect } from 'react'
import { StyleSheet, View, Linking, Text } from 'react-native'
import { useGlobalState } from '../../state/GlobalState';
import NLButton from '../../components/NLButton';
import Colors from '../../constants/color';
import { NavigationActions, StackActions } from 'react-navigation';


const SuccessPayFeatured = (props) => {
    const [profile] = useGlobalState('profile')

    return (
        <View style={{ flexGrow: 1, backgroundColor: Colors.s_blue }}>
            <Text style={{ fontSize: 24, color: 'white',marginTop: '20%', paddingHorizontal: '10%', textAlign: 'center'}}>Thank you for your payment. You are now featured for a week on our app.</Text>
            <NLButton onPress={() => {
                const resetAction = StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({ routeName: 'MainStack', action: NavigationActions.navigate({ routeName: 'Search', params: { defaultTabIdx: 2 } }) })]
                  })
                  props.navigation.dispatch(resetAction);
            }} style={{ marginTop: '80%', width: '80%', marginLeft: 'auto', marginRight: 'auto' }} value={"Continute"} />
        </View>
    );
}

export default SuccessPayFeatured;
