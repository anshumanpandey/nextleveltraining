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
        <View style={{ flexGrow: 1 }}>
            <Header toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
            <NLUserDataForm {...props} hidePasswordInput={true} />
        </View>
    )
}



export default EditProfile
