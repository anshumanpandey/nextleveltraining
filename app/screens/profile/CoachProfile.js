import React, { Component, useState, useEffect, useRef, useCallback } from 'react'
import { View, FlatList, Image, Text, ScrollView, TouchableOpacity, Dimensions, TextInput as RNTextInput } from 'react-native'
import { CheckBox, Icon, Spinner, Input as TextInput, Tabs, Tab } from 'native-base';
import Header from '../../components/header/Header'
import { Picker } from '@react-native-community/picker';
import Images from "../../constants/image";
import styles from "./CoachStyle";
import NavigationService from '../../navigation/NavigationService';
import NLToggleButton from '../../components/NLToggleButton';
import { getGlobalState, useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import { axiosInstance } from '../../api/AxiosBootstrap';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment'
import { Formik, FieldArray } from 'formik';
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel';
import Colors from '../../constants/color.js';
import AsyncStorage from '@react-native-community/async-storage';
import NLGooglePlacesAutocomplete from '../../components/NLGooglePlacesAutocomplete';
import GlobalStyles from '../../constants/GlobalStyles';
import { syncProfilePic, syncTrainingLocationImage } from '../../utils/SyncProfileAssets';
import ImagePicker from 'react-native-image-picker';
import Menu, { MenuItem } from 'react-native-material-menu';
import Upload from 'react-native-background-upload'
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess';
import NLCropperImagePicker from '../../components/NLCropperImagePicker';
import NLAddressSuggestionInput, { getFullSuggestionAddress } from '../../components/NLAddressSuggestionInput';

const signupSegments = ['ABOUT ME', 'BANK ACCOUNT', 'AVAILABILITY', 'TRAINING LOCATION']
const TEXT_COLOR = 'gray'
const Width = Dimensions.get('window').width;

class MultiStep extends Component {


    constructor(props) {
        super(props);

        this.state = {
            selectedSegmentIndex: 0,
            selectedRole: "individual",
            showTimerPickerFor: null,
        };
    }

    componentDidMount() {
        const profile = getGlobalState('profile')

        this.focusListener = this.props.navigation.addListener('didFocus', this.resolveCurrentStep);

        AsyncStorage.getItem('ProfilePic')
            .then((s) => {
                if (!s) return
                this.setState({ profilePic: JSON.parse(s) })
            })

        if (profile.Availabilities && profile.Availabilities.length != 0) {
            profile.Availabilities.map(day => {
                if (day.Day == "Sunday") {
                    this.setState({ is_enable_sunday: true, start_sunday: moment(day.FromTime).toDate(), end_sunday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Monday") {
                    this.setState({ is_enable_monday: true, start_monday: moment(day.FromTime).toDate(), end_monday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Tuesday") {
                    this.setState({ is_enable_tuesday: true, start_tuesday: moment(day.FromTime).toDate(), end_tuesday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Wednesday") {
                    this.setState({ is_enable_wednesday: true, start_wednesday: moment(day.FromTime).toDate(), end_wednesday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Thursday") {
                    this.setState({ is_enable_thursday: true, start_thursday: moment(day.FromTime).toDate(), end_thursday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Friday") {
                    this.setState({ is_enable_friday: true, start_friday: moment(day.FromTime).toDate(), end_friday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Saturday") {
                    this.setState({ is_enable_saturday: true, start_saturday: moment(day.FromTime).toDate(), end_saturday: moment(day.ToTime).toDate() })
                }
            })

        }

    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener?.remove();
    }

    resolveCurrentStep = () => {
        const profile = getGlobalState('profile')

        if (profile.IsTempPassword) {
            this.props.navigation.replace("ForceChangePassword");
            return
        }

        if (
            this.stepOneIsComplete(profile) &&
            this.stepTwoIsComplete(profile) &&
            this.stepThreeIsComplete(profile) &&
            this.stepFourIsComplete(profile) &&
            !HasCompletedVerificationProcess(profile)
        ) {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOGGLE });
        }

        if (HasCompletedVerificationProcess(profile)) {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOGGLE });
            NavigationService.navigate('Home')
            console.log('step four is completed, navigating to home')
            this.focusListener?.remove();
            return
        }

        if (this.stepFourIsComplete(profile) && HasCompletedVerificationProcess(profile)) {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOGGLE });
            NavigationService.navigate('Home')
            console.log('step four is completed, navigating to home')
            this.focusListener?.remove();
            return
        }

        if (this.stepThreeIsComplete(profile)) {
            this.containerScrollView && this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * 3 })
            console.log('step three is completed, jumping to 4')
            return
        }

        if (this.stepTwoIsComplete(profile)) {
            this.containerScrollView && this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * 2 })
            console.log('step two is completed, jumping to 3')
            return
        }

        if (this.stepOneIsComplete(profile)) {
            this.containerScrollView && this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * 1 })
            console.log('step one is completed, jumping to 2')
        }

    }

    stepOneIsComplete = (profile) => {
        return profile.AboutUs != null &&
            profile.Accomplishment != null &&
            profile.Experiences != null && profile.Experiences.length != 0 &&
            profile.DBSCeritificate != null &&
            profile.VerificationDocument != null &&
            profile.Rate != 0 &&
            profile.TravelMile != null &&
            profile.ProfileImage != null
    }

    stepTwoIsComplete = (profile) => {
        return profile.BankAccount != null
    }

    stepThreeIsComplete = (profile) => {
        return profile.Availabilities != null && profile.Availabilities.length != 0
    }

    stepFourIsComplete = (profile) => {
        return profile.TrainingLocations != null && profile.TrainingLocations.length != 0
    }

    setShowTimePickerFor = (key) => this.setState({ showTimerPickerFor: key })
    setTimeFor = (key, date) => this.setState({ [key]: date }, (c) => console.log(c))

    toggleSwitchSunday = (cb) => this.setState({
        is_enable_sunday: !this.state.is_enable_sunday ? true : false
    }, cb)
    toggleSwitchMonday = (cb) => this.setState({
        is_enable_monday: !this.state.is_enable_monday ? true : false
    }, cb)
    toggleSwitchTuesday = (cb) => this.setState({
        is_enable_tuesday: !this.state.is_enable_tuesday ? true : false
    }, cb)
    toggleSwitchWednesday = (cb) => this.setState({
        is_enable_wednesday: !this.state.is_enable_wednesday ? true : false
    }, cb)
    toggleSwitchThursday = (cb) => this.setState({
        is_enable_thursday: !this.state.is_enable_thursday ? true : false
    }, cb)
    toggleSwitchFriday = (cb) => this.setState({
        is_enable_friday: !this.state.is_enable_friday ? true : false
    }, cb)
    toggleSwitchSaturday = (cb) => this.setState({
        is_enable_saturday: !this.state.is_enable_saturday ? true : false
    }, cb)


    render() {
        return (
          <View keyboardShouldPersistTaps="handled" style={{flex: 1}}>
            <Header
              toggleDrawer={this.props.navigation.toggleDrawer}
              hideCreatePost={true}
              title="Save Profile"
            />
            {this.about()}
          </View>
        )
    }

    handleContainerScroll = async (event) => {
        let _index = event.nativeEvent.contentOffset.x / Dimensions.get('window').width
        if (_index == Math.round(_index)) {
            this.setState({
                selectedSegmentIndex: Math.round(_index)
            })
            this.segmentFlatList.scrollToIndex({ index: Math.round(_index), animated: true })
        }
    }
    //bank account
    bankAccount() {
        return (<BankAccountForm setSubmitFn={(fn) => this.setState({ bankSubmitFn: fn })} />)
    }


    about() {
        return <AboutMeCoachForm goBackTo={"Profile"} navigation={this.props.navigation} />
    }


    //tracking location
    trackingLocation() {
        const profile = getGlobalState('profile')

        return (<TrainingLocationForm {...profile.TrainingLocations[0]} setSubmitFn={(fn) => this.setState({ traininLocationSubmitFn: fn })} />)
    }


    containerView() {
        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView style={{
                    flex: 1,
                    marginTop: 45
                }}
                    keyboardShouldPersistTaps="handled"
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    ref={(scrollView) => { this.containerScrollView = scrollView }}
                    onScroll={this.handleContainerScroll}
                    scrollEventThrottle={16}
                >
                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        width: Dimensions.get('window').width
                    }} >
                        {this.about()}
                    </View>

                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        width: Dimensions.get('window').width
                    }} >
                        {this.bankAccount()}
                    </View>
                    <AvailabiltyForm setSubmitFn={(fn) => this.setState({ availabilitySubmitFn: fn })} />
                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        width: Dimensions.get('window').width
                    }} >
                        {this.trackingLocation()}
                    </View>


                </ScrollView>
                <FlatList style={{
                    height: 40,
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                }}
                    ref={(ref) => {
                        this.segmentFlatList = ref
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(_, idx) => `${idx}-item`}
                    data={signupSegments}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    width: Dimensions.get('window').width / 3,
                                    height: 40
                                }}
                                onPress={() => {
                                    this.setState({
                                        selectedSegmentIndex: index
                                    })
                                    this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * index })
                                }} >
                                <Text style={{
                                    color: this.state.selectedSegmentIndex == index ? Colors.s_blue : TEXT_COLOR,
                                    textAlign: 'center'
                                }}>{item}</Text>
                                {this.state.selectedSegmentIndex == index && <View style={{
                                    position: 'absolute',
                                    height: 3,
                                    bottom: 0,
                                    width: '100%',
                                    backgroundColor: Colors.s_blue
                                }} />}
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        )
    }
}

export default MultiStep

const TimeInput = ({ onSelected, value }) => {
    const [showPicker, setShowPicker] = useState();
    const [date, setDate] = useState(value);

    const hasValue = () => date ? true : false

    useEffect(() => {
        setDate(value)
    }, [value])

    return (
      <>
        {showPicker && (
          <DateTimePickerModal
            headerTextIOS={'Pick a Time'}
            isVisible={showPicker}
            mode="time"
            pickerContainerStyleIOS={{
              backgroundColor: '#d1d3d8',
              justifyContent: 'center',
            }}
            onConfirm={d => {
              setShowPicker(false)
              //setDate(d)
              onSelected(d)
            }}
            onCancel={() => setShowPicker(false)}
          />
        )}
        <TouchableOpacity
          style={{width: '70%', height: '80%', justifyContent: 'flex-end'}}
          onPress={() => setShowPicker(true)}>
          <View style={[styles.collapsedViewInner]}>
            <Text style={{color: hasValue() ? 'black' : 'rgba(0,0,0,0.3)'}}>
              {hasValue() ? moment(date).format('hh:mm A') : '12:00 PM'}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    )
}

export const AvailabiltyForm = ({ setSubmitFn }) => {
    const [profile] = useGlobalState('profile')
    const [saving, setSaving] = useState(false)
    const [selectedDates, setSelectedDates] = useState({})
    const [errorsDic, setErrorsDic] = useState({})
    const [enabledDay, setEnabledDay] = useState({})

    const [{ data, loading, error }, doPost] = useAxios({
        url: '/Users/SaveAvailability',
        method: 'POST',
    }, { manual: true })

    const setErrorFor = (key, err) => setErrorsDic({ ...errorsDic, [key]: err })
    const setTimeFor = (key, date) => setSelectedDates({ ...selectedDates, [key]: date })
    const toggleSwitchSundayFor = (key, extra) => {
        setEnabledDay({ ...enabledDay, [key]: enabledDay[key] == true ? false : true })
        if (enabledDay[key] == true) {
            setSelectedDates({ ...selectedDates, [key]: undefined, [extra]: undefined })
            setErrorsDic({ ...errorsDic, [key]: undefined, [extra]: undefined })
        }
    }

    useEffect(() => {
        return () => {
            setErrorsDic({})
        }
    }, [])

    useEffect(() => {
        const formatDate = (d) => moment(d, 'hh: mm A')
        if (profile?.Availabilities && profile.Availabilities.length != 0) {
            const toggles = []
            const newState = {}
            profile.Availabilities.forEach(day => {
                if (day.Day == "Sunday") {
                    toggles.push('start_sunday')
                    newState.start_sunday = formatDate(day.FromTime).toDate()
                    newState.end_sunday = formatDate(day.ToTime).toDate()
                }
                if (day.Day == "Monday") {
                    toggles.push('start_monday')
                    newState.start_monday = formatDate(day.FromTime).toDate()
                    newState.end_monday = formatDate(day.ToTime).toDate()
                }
                if (day.Day == "Tuesday") {
                    toggles.push('start_tuesday')
                    newState.start_tuesday = formatDate(day.FromTime).toDate()
                    newState.end_tuesday = formatDate(day.ToTime).toDate()
                }
                if (day.Day == "Wednesday") {
                    toggles.push('start_wednesday')
                    newState.start_wednesday = formatDate(day.FromTime).toDate()
                    newState.end_wednesday = formatDate(day.ToTime).toDate()
                }
                if (day.Day == "Thursday") {
                    toggles.push('start_thursday')
                    newState.start_thursday = formatDate(day.FromTime).toDate()
                    newState.end_thursday = formatDate(day.ToTime).toDate()
                }
                if (day.Day == "Friday") {
                    toggles.push('start_friday')
                    newState.start_friday = formatDate(day.FromTime).toDate()
                    newState.end_friday = formatDate(day.ToTime).toDate()
                }
                if (day.Day == "Saturday") {
                    toggles.push('start_saturday')
                    newState.start_saturday = formatDate(day.FromTime).toDate()
                    newState.end_saturday = formatDate(day.ToTime).toDate()
                }
            })

            setSelectedDates(newState)
            setEnabledDay(() => {
                return toggles.reduce((json, item) => {
                    json[item] = true
                    return json
                }, {})
            })

        }
    }, [profile?.Availabilities])

    const availabiltySaveFunction = useCallback(() => {
        const formatDate = (d) => moment(d).utcOffset(0, true).format('hh:mm A')
        if (Object.keys(errorsDic).length == 0) return Promise.reject("NO_DATA")
        if (Object.keys(errorsDic).some(k => errorsDic[k] != undefined)) return Promise.reject()
        setSaving(true)
        const data = []
        if (selectedDates.start_sunday && selectedDates.end_sunday) {
            data.push({
                "day": "Sunday",
                "fromTime": formatDate(selectedDates.start_sunday),
                "toTime": formatDate(selectedDates.end_sunday),
                "isWorking": true
            })
        }

        if (selectedDates.start_monday && selectedDates.end_monday) {
            data.push({
                "day": "Monday",
                "fromTime": formatDate(selectedDates.start_monday),
                "toTime": formatDate(selectedDates.end_monday),
                "isWorking": true,
            })
        }

        if (selectedDates.start_wednesday && selectedDates.end_wednesday) {
            data.push({
                "day": "Wednesday",
                "fromTime": formatDate(selectedDates.start_wednesday),
                "toTime": formatDate(selectedDates.end_wednesday),
                "isWorking": true,
            })
        }

        if (selectedDates.start_tuesday && selectedDates.end_tuesday) {
            data.push({
                "day": "Tuesday",
                "fromTime": formatDate(selectedDates.start_tuesday),
                "toTime": formatDate(selectedDates.end_tuesday),
                "isWorking": true,
            })
        }

        if (selectedDates.start_thursday && selectedDates.end_thursday) {
            data.push({
                "day": "Thursday",
                "fromTime": formatDate(selectedDates.start_thursday),
                "toTime": formatDate(selectedDates.end_thursday),
                "isWorking": true,
            })
        }

        if (selectedDates.start_friday && selectedDates.end_friday) {
            data.push({
                "day": "Friday",
                "fromTime": formatDate(selectedDates.start_friday),
                "toTime": formatDate(selectedDates.end_friday),
                "isWorking": true,
            })
        }

        if (selectedDates.start_saturday && selectedDates.end_saturday) {
            data.push({
                "day": "Saturday",
                "fromTime": formatDate(selectedDates.start_saturday),
                "toTime": formatDate(selectedDates.end_saturday),
                "isWorking": true,
            })
        }

        return doPost({ data })
            .then(() => axiosInstance({ url: '/Users/GetUser' }))
            .then((r) => {
                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                setSaving(false)
            })

    }, [selectedDates]);

    useEffect(() => {
        setSubmitFn && setSubmitFn(availabiltySaveFunction)
    }, [selectedDates])

    const signupIsDisabled = () => saving

    const startTimeErrorMsg = "Cannot be after end time"
    const endTimeErrorMsg = "Cannot be before start time"

    return (

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexg: 1 }}>
            <View style={{
                flex: 1,
                width: Dimensions.get('window').width
            }}>
                <View style={{
                    width: '100%'
                }}>
                    <View style={{
                        height: 60,
                        width: '100%',
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>Sunday</Text>
                        <NLToggleButton
                            active={enabledDay.start_sunday}
                            onPress={() => toggleSwitchSundayFor('start_sunday', "end_sunday")}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.start_sunday && (
                        <>
                            <View style={[styles.collapsedView]}>
                                <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                    <TimeInput value={selectedDates.start_sunday} onSelected={(d) => {
                                        if (selectedDates.end_sunday && moment(selectedDates.end_sunday).isBefore(d)) {
                                            setErrorFor("start_sunday", startTimeErrorMsg)
                                        } else {
                                            setErrorFor("start_sunday", undefined)
                                        }
                                        setTimeFor("start_sunday", d)

                                    }} />
                                    {errorsDic.start_sunday && <ErrorLabel text={errorsDic.start_sunday} />}
                                </View>

                                <Text>TO</Text>

                                <View style={{ justifyContent: 'flex-end', width: '50%' }}>
                                    <TimeInput value={selectedDates.end_sunday} onSelected={(d) => {
                                        if (selectedDates.start_sunday && moment(selectedDates.start_sunday).isAfter(d)) {
                                            setErrorFor("end_sunday", endTimeErrorMsg)
                                        } else {
                                            setErrorFor("end_sunday", undefined)
                                        }
                                        setTimeFor("end_sunday", d)

                                    }} />
                                    {errorsDic.end_sunday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.end_sunday} />}
                                </View>
                            </View>
                        </>
                    )}

                </View>

                <View style={{
                    width: '100%'
                }}>
                    <View style={{
                        height: 60,
                        width: '100%',
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>Monday</Text>
                        <NLToggleButton
                            active={enabledDay.start_monday}
                            onPress={() => toggleSwitchSundayFor('start_monday', "end_monday")}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.start_monday && (
                        <View style={styles.collapsedView}>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.start_monday}
                                    onSelected={(d) => {
                                        if (selectedDates.end_monday && moment(selectedDates.end_monday).isBefore(d)) {
                                            setErrorFor("start_monday", startTimeErrorMsg)
                                        } else {
                                            setErrorFor("start_monday", undefined)
                                        }
                                        setTimeFor("start_monday", d)

                                    }} />
                                {errorsDic.start_monday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.start_monday} />}

                            </View>

                            <Text>TO</Text>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.end_monday}
                                    onSelected={(d) => {
                                        if (selectedDates.start_monday && moment(selectedDates.start_monday).isAfter(d)) {
                                            setErrorFor("end_monday", endTimeErrorMsg)
                                        } else {
                                            setErrorFor("end_monday", undefined)
                                        }
                                        setTimeFor("end_monday", d)

                                    }}
                                />
                                {errorsDic.end_monday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.end_monday} />}
                            </View>

                        </View>
                    )}
                </View>

                <View style={{
                    width: '100%'
                }}>
                    <View style={{
                        height: 60,
                        width: '100%',
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>Tuesday</Text>
                        <NLToggleButton
                            active={enabledDay.start_tuesday}
                            onPress={() => toggleSwitchSundayFor('start_tuesday', 'end_tuesday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.start_tuesday && (
                        <View style={styles.collapsedView}>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.start_tuesday}
                                    onSelected={(d) => {
                                        if (selectedDates.end_tuesday && moment(selectedDates.end_tuesday).isBefore(d)) {
                                            setErrorFor("start_tuesday", startTimeErrorMsg)
                                        } else {
                                            setErrorFor("start_tuesday", undefined)
                                        }
                                        setTimeFor("start_tuesday", d)

                                    }}
                                />
                                {errorsDic.start_tuesday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.start_tuesday} />}

                            </View>
                            <Text>TO</Text>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.end_tuesday}
                                    onSelected={(d) => {
                                        if (selectedDates.start_tuesday && moment(selectedDates.start_tuesday).isAfter(d)) {
                                            setErrorFor("end_tuesday", endTimeErrorMsg)
                                        } else {
                                            setErrorFor("end_tuesday", undefined)
                                        }
                                        setTimeFor("end_tuesday", d)

                                    }}
                                />
                                {errorsDic.end_tuesday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.end_tuesday} />}
                            </View>

                        </View>
                    )}
                </View>

                <View style={{
                    width: '100%'
                }}>
                    <View style={{
                        height: 60,
                        width: '100%',
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>Wednesday</Text>
                        <NLToggleButton
                            active={enabledDay.start_wednesday}
                            onPress={() => toggleSwitchSundayFor('start_wednesday', 'end_wednesday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.start_wednesday && (
                        <View style={styles.collapsedView}>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.start_wednesday}
                                    onSelected={(d) => {
                                        if (selectedDates.end_wednesday && moment(selectedDates.end_wednesday).isBefore(d)) {
                                            setErrorFor("start_wednesday", startTimeErrorMsg)
                                        } else {
                                            setErrorFor("start_wednesday", undefined)
                                        }
                                        setTimeFor("start_wednesday", d)

                                    }}
                                />
                                {errorsDic.start_wednesday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.start_wednesday} />}

                            </View>

                            <Text>TO</Text>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.end_wednesday}
                                    onSelected={(d) => {
                                        if (selectedDates.start_wednesday && moment(selectedDates.start_wednesday).isAfter(d)) {
                                            setErrorFor("end_wednesday", endTimeErrorMsg)
                                        } else {
                                            setErrorFor("end_wednesday", undefined)
                                        }
                                        setTimeFor("end_wednesday", d)

                                    }} />
                                {errorsDic.end_wednesday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.end_wednesday} />}
                            </View>
                        </View>
                    )}
                </View>

                <View style={{
                    width: '100%'
                }}>
                    <View style={{
                        height: 60,
                        width: '100%',
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>Thursday</Text>
                        <NLToggleButton
                            active={enabledDay.start_thursday}
                            onPress={() => toggleSwitchSundayFor('start_thursday', 'end_thursday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.start_thursday && (
                        <View style={styles.collapsedView}>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.start_thursday}
                                    onSelected={(d) => {
                                        if (selectedDates.end_thursday && moment(selectedDates.end_thursday).isBefore(d)) {
                                            setErrorFor("start_thursday", startTimeErrorMsg)
                                        } else {
                                            setErrorFor("start_thursday", undefined)
                                        }
                                        setTimeFor("start_thursday", d)

                                    }} />
                                {errorsDic.start_thursday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.start_thursday} />}
                            </View>
                            <Text>TO</Text>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.end_thursday}
                                    onSelected={(d) => {
                                        if (selectedDates.start_thursday && moment(selectedDates.start_thursday).isAfter(d)) {
                                            setErrorFor("end_thursday", endTimeErrorMsg)
                                        } else {
                                            setErrorFor("end_thursday", undefined)
                                        }
                                        setTimeFor("end_thursday", d)

                                    }} />
                                {errorsDic.end_thursday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.end_thursday} />}
                            </View>

                        </View>
                    )}
                </View>

                <View style={{
                    width: '100%'
                }}>
                    <View style={{
                        height: 60,
                        width: '100%',
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>Friday</Text>
                        <NLToggleButton
                            active={enabledDay.start_friday}
                            onPress={() => toggleSwitchSundayFor('start_friday', 'end_friday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.start_friday && (
                        <View style={styles.collapsedView}>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.start_friday}
                                    onSelected={(d) => {
                                        if (selectedDates.end_friday && moment(selectedDates.end_friday).isBefore(d)) {
                                            setErrorFor("start_friday", startTimeErrorMsg)
                                        } else {
                                            setErrorFor("start_friday", null)
                                        }
                                        setTimeFor("start_friday", d)
                                    }} />
                                {errorsDic.start_friday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.start_friday} />}

                            </View>
                            <Text>TO</Text>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.end_friday}
                                    onSelected={(d) => {
                                        if (selectedDates.start_friday && moment(selectedDates.start_friday).isAfter(d)) {
                                            setErrorFor("end_friday", endTimeErrorMsg)
                                        } else {
                                            setErrorFor("end_friday", undefined)
                                        }
                                        setTimeFor("end_friday", d)
                                    }} />
                                {errorsDic.end_friday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.end_friday} />}
                            </View>

                        </View>
                    )}
                </View>

                <View style={{
                    width: '100%'
                }}>
                    <View style={{
                        height: 60,
                        width: '100%',
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>Saturday</Text>
                        <NLToggleButton
                            active={enabledDay.start_saturday}
                            onPress={() => toggleSwitchSundayFor('start_saturday', 'end_saturday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.start_saturday && (
                        <View style={styles.collapsedView}>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.start_saturday}
                                    onSelected={(d) => {
                                        if (selectedDates.end_saturday && moment(selectedDates.end_saturday).isBefore(d)) {
                                            setErrorFor("start_saturday", "Cannot be after end date")
                                        } else {
                                            setErrorFor("start_saturday", undefined)
                                        }
                                        setTimeFor("start_saturday", d)

                                    }} />
                                {errorsDic.start_saturday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.start_saturday} />}

                            </View>
                            <Text>TO</Text>
                            <View style={{ justifyContent: 'flex-start', width: '40%' }}>
                                <TimeInput value={selectedDates.end_saturday} onSelected={(d) => {
                                    if (selectedDates.start_saturday && moment(selectedDates.start_saturday).isAfter(d)) {
                                        setErrorFor("end_saturday", "Cannot be before end date")
                                    } else {
                                        setErrorFor("end_saturday", undefined)
                                    }
                                    setTimeFor("end_saturday", d)
                                }} />
                                {errorsDic.end_saturday && <ErrorLabel style={{ fontSize: 12 }} text={errorsDic.end_saturday} />}
                            </View>

                        </View>
                    )}
                </View>
                {!setSubmitFn && (
                    <View style={styles.signup_btn_view}>
                        <TouchableOpacity
                            disabled={signupIsDisabled()}
                            style={[styles.buttonSave, { width: 200 }, signupIsDisabled() && GlobalStyles.disabled_button]}
                            onPress={availabiltySaveFunction}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>Save</Text>
                                {signupIsDisabled() && <Spinner color={Colors.s_yellow} />}
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>

    );
}


export const TrainingLocationForm = ({ setSubmitFn, onCreate, navigation, ...params }) => {
    const formikRef = useRef()
    const [image, setImage] = useState()
    const [profile] = useGlobalState('profile')
    const [{ data, loading, error }, doPost] = useAxios({
        url: '/Users/SaveTrainingLocation',
        method: 'POST',
    }, { manual: true })

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetUser',
    }, { manual: true })

    useEffect(() => {
        setSubmitFn && setSubmitFn(formikRef?.current?.submitForm)
        formikRef?.current?.setFieldValue("trainingLocationId", params?.Id || undefined)
        formikRef?.current?.setFieldValue("locationName", params?.LocationName || "")
        formikRef?.current?.setFieldValue("address", params?.LocationAddress || "")
        formikRef?.current?.setFieldValue("file", null)
        formikRef?.current?.setFieldValue("lat", params?.Lat || 0)
        formikRef?.current?.setFieldValue("lng", params?.Lng || 0)

        if (params?.ImageUrl) {
            formikRef?.current?.setFieldValue('file', { uri: params?.ImageUrl })
        } else {
            AsyncStorage.getItem((`Location-${params.Id}-file`).toString())
                .then(img => {
                    if (!img) return
                    formikRef?.current?.setFieldValue('file', JSON.parse(img).file)
                })
        }

    }, [params.Id, params.LocationName, params.LocationAddress])

    useEffect(() => {
        const focusListener = navigation?.addListener('didFocus', () => {
            console.log(params?.Id)
            formikRef?.current?.setFieldValue("locationName", params?.LocationName || "")
            formikRef?.current?.setFieldValue("trainingLocationId", params?.Id || undefined)
            formikRef?.current?.setFieldValue("address", params?.LocationAddress || "")
            formikRef?.current?.setFieldValue("file", null)
            formikRef?.current?.setFieldValue("lat", params?.Lat || 0)
            formikRef?.current?.setFieldValue("lng", params?.Lng || 0)
        })

        const blurListener = navigation?.addListener('didBlur', () => {
            formikRef?.current?.setFieldValue("trainingLocationId", undefined)
            formikRef?.current?.setFieldValue("locationName", "")
            formikRef?.current?.setFieldValue("address", "")
            formikRef?.current?.setFieldValue("file", null)
            formikRef?.current?.setFieldValue("lat", 0)
            formikRef?.current?.setFieldValue("lng", 0)
            formikRef?.current?.setErrors({
                locationName: undefined,
                address: undefined,
            })
        });

        return () => {
            focusListener?.remove()
            blurListener?.remove()
        }
    }, [])

    const signupIsDisabled = () => loading || getUserReq.loading

    return (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
            <Formik
                innerRef={(r) => formikRef.current = r}
                initialValues={{
                    trainingLocationId: params.Id || undefined,
                    locationName: params.LocationName || "",
                    address: params.LocationAddress || "",
                    file: params.ImageUrl || null,
                    lat: params.Lat || 0,
                    lng: params.Lng || 0
                }}
                validate={(values) => {
                    const errors = {}

                    if (!values.locationName) errors.locationName = 'Required'
                    if (!values.address) errors.address = 'Required'

                    return errors
                }}
                onSubmit={(values, { setFieldValue, setErrors, setTouched }) => {
                    const data = {
                        "trainingLocationId": values.trainingLocationId || undefined,
                        "locationName": values.locationName,
                        "locationAddress": values.address,
                        "role": profile.Role,
                        "playerOrCoachID": profile.Id,
                        lat: values.lat,
                        lng: values.lng
                    }

                    return doPost({ data })
                        .then((r) => {
                            if (values?.file?.uploadPath) {
                                syncTrainingLocationImage(values.file, r.data.Id)
                                delete values.file.data
                                return AsyncStorage.setItem(`Location-${r.data.Id}-file`, JSON.stringify({ file: values.file, uploaded: false }))
                            }
                        })
                        .then(r => getUserData())
                        .then((r) => {
                            if (onCreate) {
                                onCreate(() => dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data }));
                            } else {
                                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                            }
                            setErrors({
                                locationName: undefined,
                                address: undefined,
                                file: undefined,
                            })
                            setTouched({
                                locationName: undefined,
                                address: undefined,
                                file: undefined,
                            })

                            setFieldValue("trainingLocationId", undefined)
                            setFieldValue("locationName", "")
                            setFieldValue("address", "")
                            setFieldValue("file", null)
                            setFieldValue("lat", 0)
                            setFieldValue("lng", 0)
                        })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
                    return (
                        <>
                            <View style={styles.containerCommon}>
                                <View style={styles.inputContainer}>
                                    <RNTextInput
                                        style={{ height: 50, color: 'black', paddingLeft:5 }}
                                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                                        placeholder={"Location Name"}
                                        onChangeText={handleChange('locationName')}
                                        onBlur={handleBlur('locationName')}
                                        value={values.locationName}
                                    />
                                </View>
                                {errors.locationName && touched.locationName && <ErrorLabel text={errors.locationName} />}

                                <NLAddressSuggestionInput
                                    showList={true}
                                    defaultValue={values.address}
                                    onLocationSelected={(loc) => {
                                        setFieldValue("address", getFullSuggestionAddress(loc))
                                    }}
                                />

                                {errors.address && touched.address && <ErrorLabel text={errors.address} />}

                                <View style={[styles.inputContainer, { marginTop: '2%' }]}>
                                    <Text numberOfLines={1} style={{ paddingLeft:5, color: (values.file?.fileName || values.file?.uri) ? 'black' : 'rgba(0,0,0,0.3)', paddingVertical: '4%' }}>{(values.file?.fileName || values.file?.uri) ? (values.file?.fileName || values.file?.uri) : "Upload Training Location image"}</Text>
                                </View>
                                <NLCropperImagePicker onFileSelected={(file) => {
                                    console.log(file)
                                    setFieldValue("file", file)
                                }} />
                                {values.file && <Image style={{ height: 250, resizeMode: 'contain' }} source={{ uri: values.file?.uri }} />}
                                {errors.file && touched.file && <ErrorLabel text={errors.file} />}

                                {!setSubmitFn && (
                                    <View style={styles.signup_btn_view}>
                                        <TouchableOpacity
                                            disabled={signupIsDisabled()}
                                            style={[styles.buttonSave, { width: 200 }, signupIsDisabled() && GlobalStyles.disabled_button]}
                                            onPress={handleSubmit}
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: 'white' }}>Save</Text>
                                                {signupIsDisabled() && <Spinner color={Colors.s_yellow} />}
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </>
                    )
                }}
            </Formik>
        </ScrollView>
    );
}

export const AboutMeCoachForm = withNavigation(({ setSubmitFn, ...props }) => {
    const [triggerChange, setTriggerChange] = useState(true);
    const [submitFn, attachSubmitFn] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);
    const [profilePic, setProfilePic] = useState();
    const [profile] = useGlobalState('profile');
    const [token] = useGlobalState('token')

    const handleOnCardPress = ({ title, data, screen = "EditInput", keyboardType, goBackTo }) => {
        NavigationService.navigate(screen, {
            title,
            data,
            goBackTo,
            keyboardType,
            cb: (achievements) => { },
        })
    }

    const profileChecker = () => {
        if (profile?.ProfileImage) {
            setProfilePic(profile?.ProfileImage)
        } else {
            AsyncStorage.getItem(`ProfilePic-${profile?.Id}`)
                .then((s) => {
                    if (!s) return
                    setProfilePic(JSON.parse(s).uri)
                })
        }
    }

    useEffect(() => {
        profileChecker()
    }, [])

    useEffect(() => {
        if (currentTab == 1) {
            setSubmitFn(() => submitFn)
        }
    }, [submitFn])

    useEffect(() => {
        setTriggerChange(o => !o)
    }, [profilePic])

    useEffect(() => {
        profileChecker()
    }, [profile])

    return (
      <ScrollView>
        <View style={styles.containerAbout}>
          <TouchableOpacity
            onPress={async () => {
              const d = NavigationActions.navigate({
                routeName: 'ProfilePic',
                params: {goBackTo: props.goBackTo ? props.goBackTo : 'AboutMe'},
              })
              props.navigation.dispatch(d)
            }}
            style={{
              position: 'relative',
              justifyContent: 'center',
              flexDirection: 'row',
              width: '25%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            {triggerChange == true && (
              <Image
                resizeMode="stretch"
                source={
                  profilePic ? {uri: profilePic} : Images.PlayerPlaceholder
                }
                style={styles.profileImage}
              />
            )}
            {triggerChange == false && (
              <Image
                resizeMode="stretch"
                source={
                  profilePic ? {uri: profilePic} : Images.PlayerPlaceholder
                }
                style={styles.profileImage}
              />
            )}
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                width: Dimension.px30,
                height: Dimension.px30,
                backgroundColor: Colors.s_blue,
                borderRadius: Dimension.px30 / 2,
                right: 0,
                top: 3,
              }}>
              <Icon
                type="EvilIcons"
                name="pencil"
                style={{color: 'white', fontSize: 25}}
              />
            </View>
          </TouchableOpacity>

          <Text style={{alignSelf: 'center', color: 'red'}}>
            *Required
          </Text>

          <TouchableOpacity
            onPress={() =>
              handleOnCardPress({
                title: 'About Me',
                data: profile?.AboutUs,
                goBackTo: props.goBackTo ? props.goBackTo : 'AboutMe',
              })
            }>
            <View style={styles.cardContainer}>
              <View style={styles.cardInner}>
                <Text style={styles.textProfile}>About me</Text>
                <Icon
                  type="EvilIcons"
                  name="pencil"
                  style={{color: Colors.s_blue, fontSize: 25}}
                />
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.profileDescription}>
                  {profile?.AboutUs}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleOnCardPress({
                title: 'Accomplishment',
                data: profile?.Accomplishment,
                goBackTo: 'AboutMe',
              })
            }>
            <View style={styles.cardContainer}>
              <View style={styles.cardInner}>
                <Text style={styles.textProfile}>Accomplishment</Text>
                <Icon
                  type="EvilIcons"
                  name="pencil"
                  style={{color: Colors.s_blue, fontSize: 25}}
                />
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.profileDescription}>
                  {profile?.Accomplishment}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate('AddExperience', {
                  title: 'Add Experience',
                  cb: team => {},
                  goBackTo: 'AboutMe',
                })
              }}>
              <View style={styles.cardInner}>
                <Text style={styles.textProfile}>Job Role</Text>
                <Icon
                  name="plus"
                  type="EvilIcons"
                  style={{fontSize: 30, color: Colors.s_yellow}}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.cardContainer}>
              {profile?.Experiences.map(e => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('AddExperience', {
                        title: 'Add Experience',
                        goBackTo: 'AboutMe',
                        cb: team => {},
                        ...e,
                      })
                    }}>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(0,0,0,0.1)',
                      }}>
                      <View style={styles.editView}>
                        <Text style={{fontWeight: 'bold'}}>{e.Club}</Text>
                        <Icon
                          type="EvilIcons"
                          name="pencil"
                          style={{color: Colors.s_blue, fontSize: 25}}
                        />
                      </View>
                      <Text>{e.JobPosition}</Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text>{moment(e.StartDate).format('DD MMM YYYY')}</Text>
                        <Text> To </Text>

                        {e.CurrentlyWorking == true && <Text> Till Date</Text>}
                        {e.CurrentlyWorking == false && (
                          <Text>{moment(e.EndDate).format('DD MMM YYYY')}</Text>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate('AddQualifications', {
                  title: 'Add Experience',
                  cb: team => {},
                  goBackTo: 'AboutMe',
                  Qualifications: profile?.Qualifications,
                })
              }}>
              <View style={styles.cardInner}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textProfile}>Qualifications</Text>
                </View>
                <Icon
                  type="EvilIcons"
                  name="pencil"
                  style={{color: Colors.s_blue, fontSize: 25}}
                />
              </View>
              {profile?.Qualifications && (
                <View style={styles.cardContainer}>
                  {profile?.Qualifications.map(q => {
                    return (
                      <Text style={styles.profileDescription}>
                        {q.Qualification}
                      </Text>
                    )
                  })}
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate('AddDbsCertificate', {
                  title: 'Add Experience',
                  goBackTo: 'AboutMe',
                  cb: team => {},
                  ...profile.DBSCeritificate,
                })
              }}>
              <View style={styles.cardInner}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textProfile}>DBS Certificate</Text>
                  {profile?.DBSCeritificate &&
                    profile?.DBSCeritificate.Verified == true && (
                      <Text
                        style={{
                          marginLeft: '5%',
                          fontSize: 14,
                          color: 'green',
                        }}>
                        Verified
                      </Text>
                    )}
                  {(!profile?.DBSCeritificate ||
                    profile?.DBSCeritificate.Verified == false) && (
                    <Text
                      style={{marginLeft: '5%', fontSize: 14, color: 'red'}}>
                      Not Verified
                    </Text>
                  )}
                </View>
                <Icon
                  type="EvilIcons"
                  name="pencil"
                  style={{color: Colors.s_blue, fontSize: 25}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate('VerificationId', {
                  title: 'Add Experience',
                  goBackTo: 'AboutMe',
                  cb: team => {},
                  ...profile.VerificationDocument,
                })
              }}>
              <View style={styles.cardInner}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textProfile}>Valid ID</Text>
                  {profile?.VerificationDocument?.Verified == true && (
                    <Text
                      style={{marginLeft: '5%', fontSize: 14, color: 'green'}}>
                      Verified
                    </Text>
                  )}
                  {(!profile?.VerificationDocument ||
                    profile?.VerificationDocument.Verified == false) && (
                    <Text
                      style={{marginLeft: '5%', fontSize: 14, color: 'red'}}>
                      Not Verified
                    </Text>
                  )}
                </View>
                <Icon
                  type="EvilIcons"
                  name="pencil"
                  style={{color: Colors.s_blue, fontSize: 25}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              handleOnCardPress({
                title: 'Price Per Hour',
                data: profile.Rate,
                screen: 'EditInput',
                keyboardType: 'numeric',
                goBackTo: 'AboutMe',
              })
            }>
            <View style={styles.cardContainer}>
              <View style={styles.cardInner}>
                <Text style={styles.textProfile}>Price Per Hour</Text>
                <Icon
                  type="EvilIcons"
                  name="pencil"
                  style={{color: Colors.s_blue, fontSize: 25}}
                />
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.profileDescription}>£ {profile?.Rate}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleOnCardPress({
                title: 'Travel Miles',
                data: profile.TravelMile
                  ? profile.TravelMile.TravelDistance
                  : '',
                screen: 'EditInput',
                keyboardType: 'numeric',
                goBackTo: 'AboutMe',
              })
            }>
            <View style={styles.cardContainer}>
              <View style={styles.cardInner}>
                <Text style={styles.textProfile}>Travel Miles</Text>
                <Icon
                  type="EvilIcons"
                  name="pencil"
                  style={{color: Colors.s_blue, fontSize: 25}}
                />
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.profileDescription}>
                  {profile?.TravelMile ? profile.TravelMile.TravelDistance : ''}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
})

export const BankAccountForm = ({ setSubmitFn }) => {
    const [showModal, setShowModal] = useState(false)
    const formikRef = useRef()
    const menuRef = useRef()
    const [profile] = useGlobalState("profile")
    const [{ data, loading, error }, doPost] = useAxios({
        url: '/Users/SaveBankAccount',
        method: 'POST'
    }, { manual: true })

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetUser',
    }, { manual: true })

    useEffect(() => {
        setSubmitFn && setSubmitFn(formikRef.current.submitForm)
    }, [])

    const signupIsDisabled = () => loading || getUserReq.loading

    const options = [
        "Current",
        "Saving"
    ]

    return (
        <>
            <ScrollView>
                <Formik
                    innerRef={(r) => formikRef.current = r}
                    initialValues={{
                        bankName: profile?.BankAccount?.BankName || '',
                        holderName: profile?.BankAccount?.AccountName || '',
                        role: profile?.BankAccount?.AccountType || '',
                        sortCode: profile?.BankAccount?.Code || '',
                        accountNumber: profile?.BankAccount?.AccountNumber || ''
                    }}
                    validate={(values) => {
                        const errors = {}

                        if (!values.bankName) errors.bankName = 'Required'
                        if (!values.holderName) errors.holderName = 'Required'
                        if (!values.role) errors.role = 'Required'
                        if (!values.sortCode) errors.sortCode = 'Required'
                        if (!values.accountNumber) errors.accountNumber = 'Required'

                        return errors
                    }}
                    onSubmit={values => {
                        const data = {
                            "accountName": values.holderName,
                            "bankName": values.bankName,
                            "accountType": values.role,
                            "accountNumber": values.accountNumber,
                            "code": values.sortCode,
                        }
                        return doPost({ data })
                            .then((r) => getUserData())
                            .then((r) => {
                                console.log(r.data)
                                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOGGLE, state: null })
                            })
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <View style={styles.containerCommon}>
                                <View>
                                    <Text style={{ fontSize: 12, color: "blue" }}>Bank Account Details</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, color: "lightgrey" }}>Please enter your bank account details below</Text>
                                </View>
                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        style={{ color: "black" }}
                                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                                        placeholder={"Bank Name"}
                                        onChangeText={handleChange('bankName')}
                                        onBlur={handleBlur('bankName')}
                                        value={values.bankName}
                                    />
                                </View>
                                {errors.bankName && touched.bankName && <ErrorLabel text={errors.bankName} />}

                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <Menu
                                        ref={(r) => menuRef.current = r}
                                        style={{ width: '95%', position: 'absolute', marginLeft: Dimensions.get('window').width * 0.12 }}
                                        button={
                                            <TouchableOpacity onPress={() => menuRef.current?.show()} style={[styles.inputContain, { height: 50, justifyContent: 'center' }]}>
                                                <Text style={{ color: values.role ? "black" : 'rgba(0,0,0,0.3)', fontSize: 16 }}>{values.role ? values.role : "Select Account Type"}</Text>
                                            </TouchableOpacity>
                                        }
                                    >
                                        {options.map(o => {
                                            return <MenuItem style={{ maxWidth: 'auto', width: '200%' }} onPress={() => {
                                                setFieldValue('role', o)
                                                menuRef.current?.hide()
                                            }}>{o}</MenuItem>;
                                        })}
                                    </Menu>
                                </View>

                                {errors.role && touched.role && <ErrorLabel text={errors.role} />}

                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        style={{ color: "black" }}
                                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                                        placeholder={"Account Holder Name"}
                                        onChangeText={handleChange('holderName')}
                                        onBlur={handleBlur('holderName')}
                                        value={values.holderName}
                                    />
                                </View>
                                {errors.holderName && touched.holderName && <ErrorLabel text={errors.holderName} />}

                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        style={{ color: "black" }}
                                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                                        placeholder={"Sort code "}
                                        onChangeText={handleChange('sortCode')}
                                        onBlur={handleBlur('sortCode')}
                                        value={values.sortCode}
                                    />
                                </View>
                                {errors.sortCode && touched.sortCode && <ErrorLabel text={errors.sortCode} />}

                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        style={{ color: "black" }}
                                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                                        placeholder={"Account number"}
                                        onChangeText={handleChange('accountNumber')}
                                        onBlur={handleBlur('accountNumber')}
                                        value={values.accountNumber}
                                    />
                                </View>
                                {errors.accountNumber && touched.accountNumber && <ErrorLabel text={errors.accountNumber} />}
                            </View>
                            {!setSubmitFn && (
                                <View style={styles.signup_btn_view}>
                                    <TouchableOpacity
                                        disabled={signupIsDisabled()}
                                        style={[styles.buttonSave, { width: 200 }, signupIsDisabled() && GlobalStyles.disabled_button]}
                                        onPress={handleSubmit}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'white' }}>Save</Text>
                                            {signupIsDisabled() && <Spinner color={Colors.s_yellow} />}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </>
                    )}
                </Formik>
            </ScrollView>
        </>
    );
}