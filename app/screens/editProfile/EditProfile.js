import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import Header from '../../components/header/Header'
import { useGlobalState } from '../../state/GlobalState'
import Dimension from '../../constants/dimensions.js'
import { Textarea, Icon, Input } from 'native-base'
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel'
import NLUserDataForm from '../../components/userDataForm/NLUserDataForm'

const EditProfile = (props) => {
    
    return (
        <View style={{ flex: 1 }}>
            {/* <View style={{
          width: "100%",
          height: STATUS_BAR_HEIGHT,
          backgroundColor: "#0F2F80"
      }}>
          <StatusBar
              barStyle="light-content"
          />
      </View> */}
            <Header toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
            <NLUserDataForm {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    post_view: {
        padding: Dimension.pro5,
        backgroundColor: 'white',
        flex: 1,
    },
    textArea: {
        flex: 0.5
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
})

export default EditProfile
