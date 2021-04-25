import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
} from 'react-native'
import Header from '../../components/header/Header'
import Images from '../../constants/image'
import { useGlobalState } from '../../state/GlobalState'
import useAxios from 'axios-hooks'

const Settings = props => {
  const [profile] = useGlobalState('profile')

  const [getDeleteRes, deleteAccount] = useAxios(
    {url: `/Account/DeleteAccount/${profile?.EmailID}`},
    {manual: true},
  )

  const _deleteAccount = async () => {
    try {
      const res = await deleteAccount()
      if (res.status === 200) {
        // console.log(res.data)
        props.navigation.navigate('Logout')
      } else {
        // console.log(res.data)
        Alert.alert("Error", "Something went wrong.")
      }
    } catch (e) {
      // console.log(e)
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: '#F8F8FA'}}>
      <Header title="Settings" hideCreatePost={true} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: '#F8F8FA',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Image style={{height: 100, width: 100}} source={Images.Logo} />
          <View style={{width: '100%', alignItems: 'flex-start'}}>
            <Text style={{fontSize: 20, color: '#9FA2B7', paddingLeft: 20}}>
              Profile
            </Text>
          </View>
        </View>
        <Button
          height={120}
          title="My Profile"
          subTitle="Your profile is key to attracing customers. Update your profile to stand out"
          dividerFlag={true}
          onPress={() => {
            if (profile && profile.Role == 'Player') {
              props.navigation.navigate('MyProfilePlayer')
            } else {
              props.navigation.navigate('MyProfileCoach')
            }
          }}
        />
        <Button
          height={120}
          title="Profile Summary"
          subTitle="Your profile summary"
          dividerFlag={true}
          onPress={() => props.navigation.navigate('CoachSummary')}
        />
        <Button
          height={100}
          title="Personal Details"
          subTitle="Personal details"
          dividerFlag={true}
          onPress={() => props.navigation.navigate('PersonalDetails')}
        />
        <Button
          height={100}
          title="About Me"
          subTitle="About me"
          dividerFlag={true}
          onPress={() => props.navigation.navigate('AboutMe')}
        />
        {profile && profile.Role !== 'Player' && (
          <Button
            height={100}
            title="Availability"
            subTitle="Availability"
            dividerFlag={true}
            onPress={() => props.navigation.navigate('Availability')}
          />
        )}
        <Button
          height={100}
          title="Training Location"
          subTitle="Training Location"
          dividerFlag={true}
          onPress={() => props.navigation.navigate('TrainingLocation')}
        />
        <Button
          height={100}
          title="Calendar"
          subTitle="Calendar"
          dividerFlag={true}
          onPress={() => props.navigation.navigate('Calendar')}
        />
        {profile && profile.Role == 'Player' && (
          <Button
            height={100}
            title="Find a coach"
            subTitle="Find a coach to inhance your skills"
            dividerFlag={true}
            onPress={() => props.navigation.navigate('FindCoach')}
          />
        )}

        {/* <Button
          height={100}
          title="Reviews"
          subTitle="All reviews in one place"
          dividerFlag={true}
        /> */}
        {/* <Button
          height={120}
          title="Badges"
          subTitle="Badges help you to stand out. Learn how to use them to boost your business"
          dividerFlag={true}
        /> */}
        {/* <Button
          height={100}
          title="Account details"
          subTitle="View your account details"
          dividerFlag={false}
        /> */}

        <Text
          style={{
            fontSize: 20,
            color: '#9FA2B7',
            paddingLeft: 20,
            marginTop: 40,
            marginBottom: 20,
          }}>
          Extra Services
        </Text>
        <Button
          height={120}
          title="Be Featured"
          subTitle="Find out more about how to boost your likes , comments and bookings on Next Level by becoming “Featured“."
          dividerFlag={false}
          onPress={() => props.navigation.navigate('PayFeatured')}
        />

        {/* <Text
          style={{
            fontSize: 20,
            color: '#9FA2B7',
            paddingLeft: 20,
            marginTop: 40,
            marginBottom: 20,
          }}>
          Communication
        </Text>

        <Button
          height={120}
          title="One-click response"
          subTitle="Set a message to automatically send to customers when you buy a lead"
          dividerFlag={true}
        />
        <Button
          height={120}
          title="Email templates"
          subTitle="Save time with email templates you can send to customers when you buy a lead"
          dividerFlag={true}
        />
        <Button
          height={120}
          title="SMS templates"
          subTitle="Contact customers quickly with custom SMS templates"
          dividerFlag={false}
        /> */}

        {/* <Text
          style={{
            fontSize: 20,
            color: '#9FA2B7',
            paddingLeft: 20,
            marginTop: 40,
            marginBottom: 20,
          }}>
          Integrations
        </Text>

        <Button
          height={120}
          title="HubSpot"
          subTitle="Automatically link your purchased leads with your HubSpot CRM"
          dividerFlag={false}
        /> */}

        <Text
          style={{
            fontSize: 20,
            color: '#9FA2B7',
            paddingLeft: 20,
            marginTop: 40,
            marginBottom: 20,
          }}>
          Account & Credits
        </Text>

        <Button
          height={120}
          title="My credits"
          subTitle="View credit history and buy credits to contact more customers"
          dividerFlag={true}
          onPress={() => props.navigation.navigate('Wallet')}
        />
        {/* <Button
          height={120}
          title="Invoices and billing details"
          subTitle="View your invoices and manage your billing details"
          dividerFlag={true}
        /> */}
        {/* <Button
          height={100}
          title="My payment details"
          subTitle="Manage your saved card details"
          dividerFlag={false}
        /> */}

        {/* <Text
          style={{
            fontSize: 20,
            color: '#9FA2B7',
            paddingLeft: 20,
            marginTop: 40,
            marginBottom: 20,
          }}>
          My Notifications
        </Text>

        <Button
          height={120}
          title="Notifications"
          subTitle="Decide how you want to communicate across Bark and how you want us to contact you"
          dividerFlag={false}
        /> */}

        <Text
          style={{
            fontSize: 20,
            color: '#9FA2B7',
            paddingLeft: 20,
            marginTop: 40,
            marginBottom: 20,
          }}>
          Terms
        </Text>

        <Button
          height={100}
          title="Terms"
          subTitle="Terms"
          dividerFlag={false}
          onPress={() => props.navigation.navigate('Terms')}
        />
        <Button
          height={120}
          title="Privacy"
          subTitle="View our privary statement about how we collect, handle and process data"
          dividerFlag={false}
          onPress={() => props.navigation.navigate('Privacy')}
        />
        <Button
          height={100}
          title="Help"
          subTitle="Help"
          dividerFlag={false}
          onPress={() => props.navigation.navigate('Help')}
        />
        <Button
          height={100}
          title="Contact Us"
          subTitle="Contact Us"
          dividerFlag={false}
          onPress={() => props.navigation.navigate('ContactUs')}
        />

        <Text
          style={{
            fontSize: 20,
            color: '#9FA2B7',
            paddingLeft: 20,
            marginTop: 40,
            marginBottom: 20,
          }}></Text>

        <Button
          height={100}
          subTitle="Logout"
          title="Logout"
          dividerFlag={false}
          onPress={() => props.navigation.navigate('Logout')}
        />
        <Button
          height={100}
          subTitle="Delete Account"
          title="Delete Account"
          dividerFlag={false}
          onPress={() => {
            Alert.alert('Are you sure?', 'All your data will be lost.', [
              {
                text: 'Yes',
                onPress: () => {
                  _deleteAccount()
                },
              },
              {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
              },
            ])
          }}
        />
        <View style={{height: 30}} />
      </ScrollView>
    </View>
  )
}

const Button = ({title, subTitle, dividerFlag, height, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        height: height,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
      }}
      onPress={onPress}>
      <Text
        style={{
          fontSize: 20,
          paddingHorizontal: 20,
          marginBottom: 10,
          fontWeight: '500',
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 17,
          color: '#9FA2B7',
          paddingHorizontal: 20,
          fontWeight: '500',
          marginBottom: 20,
        }}>
        {subTitle}
      </Text>
      {dividerFlag && (
        <View
          style={{
            height: 1,
            backgroundColor: '#E8E9EE',
            marginHorizontal: 18,
          }}
        />
      )}
    </TouchableOpacity>
  )
}

export default Settings
