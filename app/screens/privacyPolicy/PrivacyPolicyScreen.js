import React, { Component, useRef, useEffect } from 'react'
import Header from '../../components/header/Header';
import { StyleSheet, ScrollView, Text } from 'react-native'
import { View } from 'native-base';

const PrivacyPolicyScreen = (props) => {


    return (
        <ScrollView>
            <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />

            <View style={{ padding: '5%' }}>
                <Text style={styles.title1}>Privacy Policy</Text>

                <Text style={styles.text1}>
                    The Next Level app is a Free to download. This SERVICE contains in app costs, depending on whether users want to use paid services. However, we do not charge you for the app or its services without making it very clear what exactly what you are paying for.
                    This page is used to inform visitors regarding policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.

                    If you choose to use the Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.

                    The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Next Level unless otherwise defined in this Privacy Policy.

                    Information Collected is used for a better experience, while using our Services, we may require you to provide us with certain personal identifiable information. The information that we request will be retained on your device and is not collected by us in any way.
                    The app does use third party services that may collect information used to identify you.
                    Link to privacy policy of third party service providers used by the app
                    * Google Play Services
                    * App Store IOS
                </Text>

                <Text style={styles.title2}>Log Data</Text>
                <Text style={styles.text1}>
                    We want to inform you that whenever you use the Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.
                </Text>

                <Text style={styles.title2}>Security</Text>
                <Text style={styles.text1}>
                    We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                </Text>

                <Text style={styles.title2}>Links to Other Sites</Text>
                <Text style={styles.text1}>
                    This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, We strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </Text>

                <Text style={styles.title2}>Children’s Privacy</Text>
                <Text style={styles.text1}>
                    Youth 16 and under using the app must inform their parents of sessions (Date, time and location) for safety reasons when meeting the coaches. Although we are not responsible for coaches or players we want our users to have a safe and positive experience using Next Level. If you are a parent or guardian and you are aware that your child has provided us with personal information, and have any concerns or queries please contact us so that we will be able to do necessary actions.
                </Text>

                <Text style={styles.title2}>Changes</Text>
                <Text style={styles.text1}>
                    We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes when posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
                </Text>

                <Text style={styles.title2}>Contact Us</Text>
                <Text style={styles.text1}>
                    If you have any questions or suggestions about the Privacy Policy, do not hesitate to email us.
                </Text>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title1: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text1: {
        fontSize: 18,
    },
})


export default PrivacyPolicyScreen;
