import React from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import Header from '../../components/header/Header';
import Images from '../../constants/image';

const Settings = (props) => {
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
        />
        <Button
          height={100}
          title="Reviews"
          subTitle="All reviews in one place"
          dividerFlag={true}
        />
        <Button
          height={120}
          title="Elite Pro"
          subTitle="Find out more about how to boost your business on Bark with Elite Pro"
          dividerFlag={true}
        />
        <Button
          height={120}
          title="Badges"
          subTitle="Badges help you to stand out. Learn how to use them to boost your business"
          dividerFlag={true}
        />
        <Button
          height={100}
          title="Account details"
          subTitle="View your account details"
          dividerFlag={false}
        />

        <Text
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
        />

        <Text
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
        />

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
        />
        <Button
          height={120}
          title="Invoices and billing details"
          subTitle="View your invoices and manage your billing details"
          dividerFlag={true}
        />
        <Button
          height={100}
          title="My payment details"
          subTitle="Manage your saved card details"
          dividerFlag={false}
        />

        <Text
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
        />

        <View style={{height: 30}} />
      </ScrollView>
    </View>
  );
};

const Button = ({title, subTitle, dividerFlag, height}) => {
  return (
    <TouchableOpacity
      style={{
        height: height,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
      }}>
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
  );
};

export default Settings;
