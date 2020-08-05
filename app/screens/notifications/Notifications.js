import React, { Component, useRef, useEffect } from 'react'
import Header from '../../components/header/Header';
import { StyleSheet, ScrollView, Text } from 'react-native'
import { View } from 'native-base';

const Notifications = (props) => {


    return (
        <ScrollView>
            <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />

            <View style={{ padding: '5%' }}>
                <Text style={styles.title1}>No notifications</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title1: {
        fontSize: 20,
        textAlign: 'center'
    },
})


export default Notifications;
