import React, { Component, useState, useEffect, useRef, useCallback } from 'react'
import { View, FlatList, Image, Text, ScrollView, TouchableOpacity, Dimensions, Switch, TextInput } from 'react-native'
import { CheckBox, Icon, Spinner } from 'native-base';
import Header from '../../components/header/Header'
import { Picker } from '@react-native-community/picker';
import Images from "../../constants/image";
import styles from "./CoachStyle";
import NavigationService from '../../navigation/NavigationService';
import NLToggleButton from '../../components/NLToggleButton';
import { getGlobalState, useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import { axiosInstance } from '../../api/AxiosBootstrap';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import { Formik, FieldArray } from 'formik';
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel';
import Modal from 'react-native-modal';
import FuzzySearch from 'fuzzy-search';
import Colors from '../../constants/color.js';
import MapView, { Marker } from 'react-native-maps';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { pickImage } from '../../helpers/ImagePicker';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import hasFullProfile from '../../utils/perType/profileResolver';
import NLGooglePlacesAutocomplete from '../../components/NLGooglePlacesAutocomplete';
import GlobalStyles from '../../constants/GlobalStyles';

const signupSegments = ['ABOUT ME', 'BANK ACCOUNT', 'AVAILABILITY', 'TRAINING LOCATION', 'TRAVEL']
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
        setTimeout(this.resolveCurrentStep, 1000)

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

        if (this.stepFiveIsComplete(profile)) {
            NavigationService.navigate('Home')
            console.log('step four is completed, navigating to home')
            return
        }

        if (this.stepFourIsComplete(profile)) {
            this.setState({ selectedSegmentIndex: 4 })
            this.containerScrollView && this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * 4 })
            console.log('step four is completed, jumping to 5')
            return
        }

        if (this.stepThreeIsComplete(profile)) {
            this.setState({ selectedSegmentIndex: 3 })
            this.containerScrollView && this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * 3 })
            console.log('step three is completed, jumping to 4')
            return
        }

        if (this.stepTwoIsComplete(profile)) {
            this.setState({ selectedSegmentIndex: 2 })
            this.containerScrollView && this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * 2 })
            console.log('step two is completed, jumping to 3')
            return
        }

        if (this.stepOneIsComplete(profile)) {
            this.setState({ selectedSegmentIndex: 1 })
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
            profile.Rate != 0
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

    stepFiveIsComplete = (profile) => {
        return profile.TravelPostCodes != null && profile.TravelPostCodes.length != 0
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
            <View keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
                <Header
                    toggleDrawer={this.props.navigation.toggleDrawer}
                    hideCreatePost={true}
                    customButton={this.state.selectedSegmentIndex != 0 ? () => {
                        return (
                            <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                                {this.state.saving && <Spinner size={28} color="black" style={{ right: 20, position: 'absolute', marginRight: '10%', height: '10%' }} />}
                                <TouchableOpacity
                                    disabled={this.state.saving == true}
                                    onPress={() => {

                                        if (this.state.selectedSegmentIndex == 1) {
                                            this.setState({ saving: true })
                                            this.state.bankSubmitFn()
                                        }
                                        if (this.state.selectedSegmentIndex == 2) {
                                            this.setState({ saving: true })
                                            this.state.availabilitySubmitFn()
                                                .then((r) => {
                                                    console.log(r)
                                                    this.setState({ saving: false })
                                                })
                                        }
                                        if (this.state.selectedSegmentIndex == 3) {
                                            this.setState({ saving: true })
                                            this.state.traininLocationSubmitFn()
                                        }

                                        if (this.state.selectedSegmentIndex == 4) {
                                            this.setState({ saving: true })
                                            this.state.travelSubmitFn()
                                        }

                                    }}>
                                    <Text style={{ color: 'black', opacity: this.state.saving == true ? 0.5 : 1, fontSize: 18 }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    } : undefined}
                />
                {this.containerView()}
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

    //travel
    //bank account
    travel() {
        return (<TravelForm setSubmitFn={(fn) => this.setState({ travelSubmitFn: fn })} />)
    }


    about() {
        return <AboutMeCoachForm />
    }


    //tracking location
    trackingLocation() {
        return (<TrainingLocationForm setSubmitFn={(fn) => this.setState({ traininLocationSubmitFn: fn })} />)
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

                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        width: Dimensions.get('window').width
                    }} >
                        {this.travel()}
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
                            <TouchableOpacity style={{
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

    return (
        <>
            {showPicker && (
                <DateTimePicker
                    mode="time"
                    value={date || new Date()}
                    format="DD-MM-YYYY"
                    placeholder={'Select Date'}
                    showIcon={false}
                    cancelBtnText="Cancel"
                    confirmBtnText="Confirm"
                    onChange={(_, d) => {
                        setShowPicker(false)
                        setDate(d)
                        onSelected(d)
                    }}
                />
            )}
            <TouchableOpacity style={{ width: '40%' }} onPress={() => setShowPicker(true)}>
                <View style={styles.collapsedViewInner}>
                    <TextInput style={{ color: 'black' }} editable={false} value={date ? moment(date).format("hh:mm A") : undefined} placeholder={"12:00 PM"}></TextInput>
                </View>
            </TouchableOpacity>
        </>
    );
}

let dataProviderInstance = new DataProvider((r1, r2) => {
    return r1.postCode !== r2.postCode;
});
const layoutProvider = new LayoutProvider(
    index => {
        return 0
    },
    (type, dim) => {
        dim.width = Dimensions.get("window").width;
        dim.height = 35;
    }
);

export const AvailabiltyForm = ({ setSubmitFn }) => {
    const [profile] = useGlobalState('profile')
    const [saving, setSaving] = useState(false)
    const [selectedDates, setSelectedDates] = useState({})
    const [enabledDay, setEnabledDay] = useState({})

    const setTimeFor = (key, date) => setSelectedDates({ ...selectedDates, [key]: date })
    const toggleSwitchSundayFor = (key) => {
        setEnabledDay({ ...enabledDay, [key]: enabledDay[key] == true ? false : true })
    }

    useEffect(() => {
        if (profile.Availabilities && profile.Availabilities.length != 0) {
            const toggles = []
            const newState = {}
            profile.Availabilities.forEach(day => {
                if (day.Day == "Sunday") {
                    toggles.push('Sunday')
                    newState.start_sunday = moment(day.FromTime).toDate()
                    newState.end_sunday = moment(day.ToTime).toDate()
                }
                if (day.Day == "Monday") {
                    toggles.push('Monday')
                    newState.start_monday = moment(day.FromTime).toDate()
                    newState.end_monday = moment(day.ToTime).toDate()
                }
                if (day.Day == "Tuesday") {
                    toggles.push('Tuesday')
                    newState.start_tuesday = moment(day.FromTime).toDate()
                    newState.end_tuesday = moment(day.ToTime).toDate()
                }
                if (day.Day == "Wednesday") {
                    toggles.push('Wednesday')
                    newState.start_wednesday = moment(day.FromTime).toDate()
                    newState.end_wednesday = moment(day.ToTime).toDate()
                }
                if (day.Day == "Thursday") {
                    toggles.push('Thursday')
                    newState.start_thursday = moment(day.FromTime).toDate()
                    newState.end_thursday = moment(day.ToTime).toDate()
                }
                if (day.Day == "Friday") {
                    toggles.push('Friday')
                    newState.start_friday = moment(day.FromTime).toDate()
                    newState.end_friday = moment(day.ToTime).toDate()
                }
                if (day.Day == "Saturday") {
                    toggles.push('Saturday')
                    newState.start_saturday = moment(day.FromTime).toDate()
                    newState.end_saturday = moment(day.ToTime).toDate()
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
    }, [profile.Availabilities])

    const availabiltySaveFunction = useCallback(() => {
        setSaving(true)
        const promises = []
        const config = {
            url: '/Users/SaveAvailability',
            method: 'POST',
        }
        if (selectedDates.start_sunday && selectedDates.end_sunday) {
            const p = axiosInstance({
                ...config,
                data: {
                    "day": "Sunday",
                    "fromTime": selectedDates.start_sunday,
                    "toTime": selectedDates.end_sunday
                }
            })
                .then((r) => {
                    console.log(r.data)
                })
            promises.push(p)
        }

        if (selectedDates.start_monday && selectedDates.end_monday) {
            const p = axiosInstance({
                ...config,
                data: {
                    "day": "Monday",
                    "fromTime": selectedDates.start_monday,
                    "toTime": selectedDates.end_monday
                }
            })
                .then((r) => {
                    console.log(r.data)
                })
            promises.push(p)
        }

        if (selectedDates.start_wednesday && selectedDates.end_wednesday) {
            const p = axiosInstance({
                ...config,
                data: {
                    "day": "Wednesday",
                    "fromTime": selectedDates.start_wednesday,
                    "toTime": selectedDates.end_wednesday
                }

            })
                .then((r) => {
                    console.log(r.data)
                })
            promises.push(p)
        }

        if (selectedDates.start_tuesday && selectedDates.end_tuesday) {
            const p = axiosInstance({
                ...config,
                data: {
                    "day": "Tuesday",
                    "fromTime": selectedDates.start_tuesday,
                    "toTime": selectedDates.end_tuesday
                }

            })
                .then((r) => {
                    console.log(r.data)
                })
            promises.push(p)

        }

        if (selectedDates.start_thursday && selectedDates.end_thursday) {
            const p = axiosInstance({
                ...config,
                data: {
                    "day": "Thursday",
                    "fromTime": selectedDates.start_thursday,
                    "toTime": selectedDates.end_thursday
                }
            })
                .then((r) => {
                    console.log(r.data)
                })
            promises.push(p)
        }

        if (selectedDates.start_friday && selectedDates.end_friday) {
            const p = axiosInstance({
                ...config,
                data: {
                    "day": "Friday",
                    "fromTime": selectedDates.start_friday,
                    "toTime": selectedDates.end_friday
                }
            })
                .then((r) => {
                    console.log(r.data)
                })
            promises.push(p)
        }

        if (selectedDates.start_saturday && selectedDates.end_saturday) {
            const p = axiosInstance({
                ...config,
                data: {
                    "day": "Saturday",
                    "fromTime": selectedDates.start_saturday,
                    "toTime": selectedDates.end_saturday
                }
            })
                .then((r) => {
                    console.log(r.data)
                })
            promises.push(p)
        }

        return Promise.all(promises)
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
                            active={enabledDay.Sunday}
                            onPress={() => toggleSwitchSundayFor('Sunday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.Sunday && (
                        <View style={styles.collapsedView}>
                            <TimeInput value={selectedDates.start_sunday} onSelected={(d) => setTimeFor("start_sunday", d)} />
                            <Text>TO</Text>
                            <TimeInput value={selectedDates.end_sunday} onSelected={(d) => setTimeFor("end_sunday", d)} />
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
                        <Text>Monday</Text>
                        <NLToggleButton
                            active={enabledDay.Monday}
                            onPress={() => toggleSwitchSundayFor('Monday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.Monday && (
                        <View style={styles.collapsedView}>
                            <TimeInput value={selectedDates.start_monday} onSelected={(d) => setTimeFor("start_monday", d)} />
                            <Text>TO</Text>
                            <TimeInput value={selectedDates.end_monday} onSelected={(d) => setTimeFor("end_monday", d)} />
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
                            active={enabledDay.Tuesday}
                            onPress={() => toggleSwitchSundayFor('Tuesday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.Tuesday && (
                        <View style={styles.collapsedView}>
                            <TimeInput value={selectedDates.start_tuesday} onSelected={(d) => setTimeFor("start_tuesday", d)} />
                            <Text>TO</Text>
                            <TimeInput value={selectedDates.end_tuesday} onSelected={(d) => setTimeFor("end_tuesday", d)} />
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
                            active={enabledDay.Wednesday}
                            onPress={() => toggleSwitchSundayFor('Wednesday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.Wednesday && (
                        <View style={styles.collapsedView}>
                            <TimeInput value={selectedDates.start_wednesday} onSelected={(d) => setTimeFor("start_wednesday", d)} />
                            <Text>TO</Text>
                            <TimeInput value={selectedDates.end_wednesday} onSelected={(d) => setTimeFor("end_wednesday", d)} />
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
                            active={enabledDay.Thursday}
                            onPress={() => toggleSwitchSundayFor('Thursday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.Thursday && (
                        <View style={styles.collapsedView}>
                            <TimeInput value={selectedDates.start_thursday} onSelected={(d) => setTimeFor("start_thursday", d)} />
                            <Text>TO</Text>
                            <TimeInput value={selectedDates.end_thursday} onSelected={(d) => setTimeFor("end_thursday", d)} />
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
                            active={enabledDay.Friday}
                            onPress={() => toggleSwitchSundayFor('Friday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.Friday && (
                        <View style={styles.collapsedView}>
                            <TimeInput value={selectedDates.start_friday} onSelected={(d) => setTimeFor("start_friday", d)} />
                            <Text>TO</Text>
                            <TimeInput value={selectedDates.end_friday} onSelected={(d) => setTimeFor("end_friday", d)} />
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
                            active={enabledDay.Saturday}
                            onPress={() => toggleSwitchSundayFor('Saturday')}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'lightgray',
                        height: 1,
                        marginHorizontal: 15
                    }} />
                    {enabledDay.Saturday && (
                        <View style={styles.collapsedView}>
                            <TimeInput value={selectedDates.start_saturday} onSelected={(d) => setTimeFor("start_saturday", d)} />
                            <Text>TO</Text>
                            <TimeInput value={selectedDates.end_saturday} onSelected={(d) => setTimeFor("end_saturday", d)} />
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

export const TravelForm = ({ setSubmitFn }) => {
    const formikRef = useRef()
    const [dataProvider, setDataProvider] = useState()
    const [showModal, setShowModal] = useState(false)
    const [searcher, setSearcher] = useState(null)
    const [profile] = useGlobalState('profile')
    const [valuesToShow, setValuesToShow] = useState([])

    const [postReq, doPost] = useAxios({
        url: '/Users/SaveTravelPostCode',
        method: 'POST'
    }, { manual: true })

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetUser',
    }, { manual: true })

    const [{ data, loading, error }] = useAxios({
        url: '/Users/GetPostCodes',
    })

    useEffect(() => {
        setSubmitFn && setSubmitFn(formikRef.current?.submitForm)
    }, [])

    useEffect(() => {
        if (!data) return
        const codes = data.map(i => ({ postCode: i }))
        setValuesToShow(codes)
        setDataProvider(dataProviderInstance.cloneWithRows(codes))
        setSearcher(new FuzzySearch(codes, ['postCode']))
    }, [loading]);

    const signupIsDisabled = () => postReq.loading || getUserReq.loading || loading

    return (
        <View style={styles.containerCommon}>
            <Formik
                innerRef={(r) => formikRef.current = r}
                initialValues={{ codes: profile?.TravelPostCodes?.map(t => t.PostCode) }}
                validate={(values) => {
                    const errors = {}

                    if (values.codes.length == 0) errors.codes = 'Required'

                    return errors
                }}
                onSubmit={values => {
                    doPost({ data: values.codes.map(t => ({ postCode: t })) })
                        .then(r => getUserData())
                        .then((r) => {
                            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                            NavigationService.goBack()
                        })
                        .catch((r) => console.log(r))
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <>
                        {loading && <Text style={{ fontSize: 28, textAlign: 'center', marginTop: '10%' }}>Loading...</Text>}
                        {!loading && (
                            <>
                                <View>
                                    <Text style={{ fontSize: 12, color: "blue" }}>Travel Details</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, color: "lightgrey" }}>Please enter your travel details below</Text>
                                </View>
                                <TouchableOpacity onPress={() => setShowModal(true)}>
                                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey", paddingVertical: '5%' }}>
                                        <Text style={{ color: 'gray' }}>Select post code...</Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    {values.codes.map(c => {
                                        return (<Text style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }}>{c.postCode ? c.postCode : c}</Text>);
                                    })}
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
                                <Modal
                                    onBackdropPress={() => setShowModal(false)}
                                    isVisible={showModal}
                                    style={styles.modal}>
                                    <View style={{ backgroundColor: 'white', height: '100%' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TextInput style={{ flex: 1, marginLeft: '5%' }} placeholder="Type a post code" onChangeText={(text) => {
                                                console.log('callked')
                                                setDataProvider(dataProviderInstance.cloneWithRows(searcher.search(text)))
                                            }} />
                                            <Text onPress={() => setShowModal(false)} style={{ fontSize: 20, paddingHorizontal: '5%' }}>X</Text>
                                        </View>

                                        <FieldArray
                                            name="codes"
                                            render={arrayHelpers => {
                                                if (!dataProvider) return <></>
                                                return (
                                                    <RecyclerListView
                                                        extendedState={values.codes}
                                                        layoutProvider={layoutProvider}
                                                        dataProvider={dataProvider}
                                                        rowRenderer={(_, item, index, state) => {
                                                            const fn = () => {
                                                                const found = values.codes.findIndex(i => item.postCode == i)

                                                                if (found == -1) {
                                                                    arrayHelpers.insert(index, item.postCode)
                                                                } else {
                                                                    arrayHelpers.remove(found)
                                                                }
                                                            }
                                                            return <PostCodeListItem isSelected={values.codes.includes(item.postCode)} value={item.postCode} cb={fn} />;
                                                        }}
                                                    />
                                                );
                                            }}

                                        />
                                    </View>
                                </Modal>
                            </>
                        )}
                    </>
                )}
            </Formik>
        </View>
    );
}

const PostCodeListItem = ({ isSelected, value, cb }) => {
    return (
        <View style={{ height: '100%', justifyContent: 'space-between', width: '95%', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }}>
            <TouchableOpacity
                style={{ justifyContent: 'flex-start', width: '95%' }}
                onPress={cb}>
                <View style={{ marginLeft: '5%', flex: 1, alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 16, padding: '3%' }}>{value}</Text>
                </View>
            </TouchableOpacity>
            <CheckBox
                style={{ width: '5%' }}
                checked={isSelected}
                onPress={cb} />
        </View>
    )
}


export const TrainingLocationForm = ({ setSubmitFn, ...params }) => {
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
        setSubmitFn && setSubmitFn(formikRef.current.submitForm)
        AsyncStorage.getItem((`Location-${params.Id}-file`).toString())
            .then(img => {
                if (!img) return
                formikRef.current.setFieldValue('file', JSON.parse(img).file)
            })
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
                    file: null
                }}
                validate={(values) => {
                    const errors = {}

                    if (!values.locationName) errors.locationName = 'Required'
                    if (!values.address) errors.address = 'Required'
                    if (!values.file) errors.file = 'Required'

                    return errors
                }}
                onSubmit={values => {
                    doPost({
                        data: {
                            "trainingLocationId": values.trainingLocationId || undefined,
                            "locationName": values.locationName,
                            "locationAddress": values.address,
                            "role": profile.Role,
                            "imageUrl": "string",
                            "playerOrCoachID": profile.Id
                        }
                    })
                        .then((r) => {
                            console.log(r.data)
                            return AsyncStorage.setItem(`Location-${r.data.Id}-file`, JSON.stringify({ file: values.file, uploaded: false }))
                        })
                        .then(r => getUserData())
                        .then((r) => {
                            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                        })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <>
                        <View style={styles.containerCommon}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder={"Location Name"}
                                    onChangeText={handleChange('locationName')}
                                    onBlur={handleBlur('locationName')}
                                    value={values.locationName}
                                />
                            </View>
                            {errors.locationName && touched.locationName && <ErrorLabel text={errors.locationName} />}

                            <NLGooglePlacesAutocomplete
                                defaultValue={values.address}
                                onPress={(data, details = null) => {
                                    setFieldValue("address", data.description)
                                }} />

                            {errors.address && touched.address && <ErrorLabel text={errors.address} />}

                            <TouchableOpacity onPress={() => {
                                DocumentPicker.pick({
                                    type: [DocumentPicker.types.images],
                                })
                                    .then((file) => {
                                        setFieldValue('file', file)
                                    })
                            }}>
                                <View style={[styles.inputContainer]}>
                                    <TextInput
                                        editable={false}
                                        placeholder="Upload Location Picture"
                                        keyboardType="email-address"
                                        onChangeText={handleChange('file')}
                                        onBlur={handleBlur('file')}
                                        value={values.file?.name}
                                    />
                                </View>
                            </TouchableOpacity>
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
                )}
            </Formik>
        </ScrollView>
    );
}

export const AboutMeCoachForm = () => {
    const [profilePic, setProfilePic] = useState('profile');
    const [profile] = useGlobalState('profile');

    const handleOnCardPress = ({ title, data, screen = "EditInput", }) => {
        NavigationService.navigate(screen, {
            title,
            data,
            cb: (achievements) => { },
        })
    }

    return (
        <ScrollView>
            <View style={styles.containerAbout}>
                <TouchableOpacity
                    onPress={async () => {
                        const source = await pickImage();
                        setProfilePic(source)
                        AsyncStorage.setItem('ProfilePic', JSON.stringify(source))
                    }}
                    style={{ position: 'relative', justifyContent: 'center', flexDirection: 'row', width: '25%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Image
                        source={profilePic ? { uri: profilePic.uri } : Images.PlayerPlaceholder}
                        style={styles.profileImage}
                    />
                    <View style={{
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
                            style={{ color: 'white', fontSize: 25 }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleOnCardPress({ title: "About Me", data: profile.AboutUs })}>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardInner}>
                            <Text style={styles.textProfile}>About me</Text>
                            <Icon
                                type="EvilIcons"
                                name="pencil"
                                style={{ color: Colors.s_blue, fontSize: 25 }}
                            />
                        </View>
                        <View style={styles.cardContainer}>
                            <Text style={styles.profileDescription}>{profile.AboutUs}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOnCardPress({ title: "Accomplishment", data: profile.Accomplishment })}>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardInner}>
                            <Text style={styles.textProfile}>Accomplishment</Text>
                            <Icon
                                type="EvilIcons"
                                name="pencil"
                                style={{ color: Colors.s_blue, fontSize: 25 }}
                            />
                        </View>
                        <View style={styles.cardContainer}>
                            <Text style={styles.profileDescription}>
                                {profile.Accomplishment}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.cardContainer}>
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('AddExperience', {
                            title: 'Add Experience',
                            cb: (team) => { }
                        })
                    }}>
                        <View style={styles.cardInner}>
                            <Text style={styles.textProfile}>Experience</Text>
                            <Icon name='plus' type='EvilIcons' style={{ fontSize: 30, color: Colors.s_yellow }} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.cardContainer}>
                        {profile.Experiences.map(e => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    NavigationService.navigate('AddExperience', {
                                        title: 'Add Experience',
                                        cb: (team) => { },
                                        ...e
                                    })
                                }}>
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }}>
                                        <View style={styles.editView}>
                                            <Text style={{ fontWeight: 'bold' }}>{e.Club}</Text>
                                            <Icon
                                                type="EvilIcons"
                                                name="pencil"
                                                style={{ color: Colors.s_blue, fontSize: 25 }}
                                            />
                                        </View>
                                        <Text>{e.JobPosition}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>{moment(e.StartDate).format('DD MMM YYYY')}</Text>
                                            <Text>{' '}To{' '}</Text>

                                            {e.CurrentlyWorking == true && <Text>{' '}Till Date</Text>}
                                            {e.CurrentlyWorking == false && <Text>{moment(e.EndDate).format('DD MMM YYYY')}</Text>}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('AddQualifications', {
                            title: 'Add Experience',
                            cb: (team) => { },
                            Qualifications: profile.Qualifications
                        })
                    }}>
                        <View style={styles.cardInner}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textProfile}>Qualifications</Text>
                                {profile.DBSCeritificate && <Icon name='check' type='Feather' style={{ marginLeft: '5%', fontSize: 20, color: 'green' }} />}
                            </View>
                            <Icon
                                type="EvilIcons"
                                name="pencil"
                                style={{ color: Colors.s_blue, fontSize: 25 }}
                            />
                        </View>
                        {profile.Qualifications && (
                            <View style={styles.cardContainer}>
                                {profile.Qualifications.map(q => {
                                    return <Text style={styles.profileDescription}>{q.Qualification}</Text>
                                })}
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('AddDbsCertificate', {
                            title: 'Add Experience',
                            cb: (team) => { },
                            ...profile.DBSCeritificate
                        })
                    }}>
                        <View style={styles.cardInner}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textProfile}>DBS Certificate</Text>
                                {profile.DBSCeritificate && <Icon name='check' type='Feather' style={{ marginLeft: '5%', fontSize: 20, color: 'green' }} />}
                            </View>
                            <Icon
                                type="EvilIcons"
                                name="pencil"
                                style={{ color: Colors.s_blue, fontSize: 25 }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('VerificationId', {
                            title: 'Add Experience',
                            cb: (team) => { },
                            ...profile.VerificationDocument
                        })
                    }}>
                        <View style={styles.cardInner}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textProfile}>Valid ID</Text>
                                {profile.VerificationDocument && <Icon name='check' type='Feather' style={{ marginLeft: '5%', fontSize: 20, color: 'green' }} />}
                            </View>
                            <Icon
                                type="EvilIcons"
                                name="pencil"
                                style={{ color: Colors.s_blue, fontSize: 25 }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleOnCardPress({ title: "Price Per Hour", data: profile.Rate })}>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardInner}>
                            <Text style={styles.textProfile}>Price Per Hour</Text>
                            <Icon
                                type="EvilIcons"
                                name="pencil"
                                style={{ color: Colors.s_blue, fontSize: 25 }}
                            />
                        </View>
                        <View style={styles.cardContainer}>
                            <Text style={styles.profileDescription}>£ {profile.Rate}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export const BankAccountForm = ({ setSubmitFn }) => {
    const [showModal, setShowModal] = useState(false)
    const formikRef = useRef()
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
                        doPost({ data })
                            .then((r) => getUserData())
                            .then((r) => {
                                console.log(r.data)
                                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
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
                                        placeholder={"Bank Name"}
                                        onChangeText={handleChange('bankName')}
                                        onBlur={handleBlur('bankName')}
                                        value={values.bankName}
                                    />
                                </View>
                                {errors.bankName && touched.bankName && <ErrorLabel text={errors.bankName} />}

                                <TouchableOpacity onPress={() => setShowModal(true)}>
                                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                        <TextInput
                                            style={{ color: values.role ? 'black' : 'gray' }}
                                            editable={false}
                                            placeholder={"Select account type"}
                                            value={values.role}
                                        />
                                    </View>
                                </TouchableOpacity>
                                {errors.role && touched.role && <ErrorLabel text={errors.role} />}

                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        placeholder={"Account Holder Name"}
                                        onChangeText={handleChange('holderName')}
                                        onBlur={handleBlur('holderName')}
                                        value={values.holderName}
                                    />
                                </View>
                                {errors.holderName && touched.holderName && <ErrorLabel text={errors.holderName} />}

                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        placeholder={"Sort code "}
                                        onChangeText={handleChange('sortCode')}
                                        onBlur={handleBlur('sortCode')}
                                        value={values.sortCode}
                                    />
                                </View>
                                {errors.sortCode && touched.sortCode && <ErrorLabel text={errors.sortCode} />}

                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
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
                            <Modal
                                onBackdropPress={() => setShowModal(false)}
                                isVisible={showModal}
                                style={styles.modal}>
                                <View style={{ backgroundColor: 'white' }}>
                                    <View style={{ marginBottom: '5%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Text onPress={() => setShowModal(false)} style={{ fontSize: 20, paddingHorizontal: '5%' }}>X</Text>
                                    </View>
                                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => {
                                        setFieldValue('role', "Current")
                                        setShowModal(false)
                                    }}>
                                        <Text style={{ fontSize: 22, borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', paddingHorizontal: '5%' }}>Current</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => {
                                        setFieldValue('role', "Saving")
                                        setShowModal(false)
                                    }}>
                                        <Text style={{ fontSize: 22, borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.2)', paddingHorizontal: '5%' }}>Saving</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </>
    );
}