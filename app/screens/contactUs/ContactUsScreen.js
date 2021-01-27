import React, { Component, useRef, useEffect } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { View } from 'native-base';
import { useGlobalState } from '../../state/GlobalState';
import Header from '../../components/header/Header';
import UserTypeFactory from '../../utils/UserTypeFactory';

const ContactUsScreen = (props) => {
    const [profile] = useGlobalState('profile')

    return (
      <ScrollView>
        <Header
          title="Contact Us"
          hideCreatePost={true}
          toggleDrawer={props.navigation.toggleDrawer}
          navigate={props.navigation.navigate}
        />

        <View style={{padding: '5%'}}>
          <Text style={styles.title1}>
            In case of any questions/issues please email
            info@nextlevelfootballtraining.co.uk and we shall respond to you
            within 24 hours.
          </Text>
          <View style={{marginTop: '5%'}}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
              How to receive more bookings
            </Text>
            <Text>- Appear on feature page</Text>
            <Text>- Add dbs and valid ID</Text>
            <Text>- Set the radius your willing to travel for training</Text>
            <Text>- Add more hours on availability</Text>
            <Text>- Showcase your training sessions</Text>
          </View>
          <View style={{marginTop: '5%'}}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
              How to get a coach to travel to me ?
            </Text>
            <Text>
              - Set training location for players to book you and come to the
              location of your choice{' '}
            </Text>
            <Text>
              - When booking a Next Level Coach to travel to you. Choose a coach
              with “ Remote coach “ on profile.
            </Text>

            <Text>
              - On your profile set your training location and when booking ,
              your location will appear under “ home training location “
            </Text>
          </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    title1: {
        fontSize: 20,
        textAlign: 'center'
    },
})


export default ContactUsScreen;