import React, { Component, useRef, useEffect } from 'react'
import Header from '../../components/header/Header';
import { StyleSheet, ScrollView, Text } from 'react-native'
import { View } from 'native-base';

const ContactUsScreen = (props) => {

    return (
        <ScrollView>
            <Header title="Contact Us" hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />

            <View style={{ padding: '5%' }}>
                <Text style={styles.title1}>In case of any questions/issues please email info@nextlevelfootballtraining.co.uk and we shall respond to you within 24 hours.</Text>
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


export default ContactUsScreen;