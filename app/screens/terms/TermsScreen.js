import React, { Component, useRef, useEffect } from 'react'
import Header from '../../components/header/Header';
import { StyleSheet, ScrollView, Text } from 'react-native'
import { View } from 'native-base';

const TermsScreen = (props) => {


    return (
        <ScrollView>
            <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />

            <View style={{ padding: '5%' }}>
                <Text style={styles.title1}>Terms and conditions</Text>
                <Text style={styles.text1}>
                    These terms and conditions ("Terms", "Agreement") are an agreement between Next Level ("Next Level", "us", "we" or "our") and you ("User", "you" or "your"). This Agreement sets forth the general terms and conditions of your use of the Next Level mobile application and any of its services (collectively, "Mobile Application" or "Services").
                </Text>


                <Text style={styles.title2}>Accounts and membership</Text>
                <Text style={styles.text1}>
                    If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. Users must use their legal government names. We may monitor and review new accounts before you may sign in and use our Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account, if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.
                    Youth 16 and under must inform their parents of sessions (Date, time and location) for safety reasons when meeting the coaches. Although we are not responsible for coaches or players we want our users to have a safe and positive experience using Next Level. Coaches are advised to be DBS checked, and will be displayed on coaches profiles whether they are or are not. Coaches are also responsible for bringing their own personal equipment to training sessions, we do not provide coaches with any equipment. If you’re using the app outside an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app. We also accept no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app. User cancellation. Following booking of a session by a player, user can cancel 48 hours before session and will get full refund, user will not get any refund if they cancel after 48 hours period. Coach cancellation: If coach cancels the booking then player will get full refund.
            </Text>

                <Text style={styles.title2}>User content</Text>

                <Text style={styles.text1}>
                    We do not own any data, information or material ("Content") that you submit in the Mobile Application in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted content. Users should not give access to their account to anyone else as user is solely responsible for their account. We may, but have no obligation to, monitor and review Content in the Mobile Application submitted or created using our Services by you. Unless specifically permitted by you, your use of the Mobile Application does not grant us the license to use, reproduce, adapt, modify, publish or distributed the Content created by you or stored in your user account for commercial, marketing or any similar purpose. But you grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable.
            </Text>

                <Text style={styles.title2}>Billing and payments</Text>
                <Text style={styles.text1}>
                    You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. If, in our judgment, your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification, and possibly a copy of a recent bank statement for the credit or debit card used for the purchase. We reserve the right to change product pricing at any time. We also reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.
            </Text>

                <Text style={styles.title2}>Accuracy of information</Text>

                <Text style={styles.text1}>
                    Occasionally there may be information in the Mobile Application that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Mobile Application or on any related Service is inaccurate at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information in the Mobile Application including, without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Mobile Application should be taken to indicate that all information in the Mobile Application or on any related Service has been modified or updated.
            </Text>

                <Text style={styles.title2}>Third-party services</Text>

                <Text style={styles.text1}>
                    If you decide to enable, access or use third-party services, be advised that your access and use of such other services are governed solely by the terms and conditions of such other services, and we do not endorse, are not responsible or liable for, and make no representations as to any aspect of such other services, including, without limitation, their content or the manner in which they handle data (including your data) or any interaction between you and the provider of such other services. You irrevocably waive any claim against Next Level with respect to such other services. Next Level is not liable for any damage or loss caused or alleged to be caused by or in connection with your enablement, access or use of any such other services, or your reliance on the privacy practices, data security processes or other policies of such other services. You may be required to register for or log into such other services on their respective mobile applications. By enabling any other services, you are expressly permitting Next Level to disclose your data as necessary to facilitate the use or enablement of such other service.
            </Text>

                <Text style={styles.title2}>Backups</Text>
                <Text style={styles.text1}>
                    We are not responsible for Content residing in the Mobile Application. In no event shall we be held liable for any loss of any Content. It is your sole responsibility to maintain appropriate backup of your Content. Notwithstanding the foregoing, on some occasions and in certain circumstances, with absolutely no obligation, we may be able to restore some or all of your data that has been deleted as of a certain date and time when we may have backed up data for our own purposes. We make no guarantee that the data you need will be available.
            </Text>


                <Text style={styles.title2}>Links to other mobile applications</Text>
                <Text style={styles.text1}>
                    Although this Mobile Application may link to other mobile applications, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked mobile application, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their mobile applications. We do not assume any responsibility or liability for the actions, products, services, and content of any other third-parties. You should carefully review the legal statements and other conditions of use of any mobile application which you access through a link from this Mobile Application. Your linking to any other off-site mobile applications is at your own risk.
            </Text>


                <Text style={styles.title2}>Prohibited uses</Text>
                <Text style={styles.text1}>
                    In addition to other terms as set forth in the Agreement, you are prohibited from using the Mobile Application or its Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related mobile application, other mobile applications, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related mobile application, other mobile applications, or the Internet. We reserve the right to terminate your use of the Service or any related mobile application for violating any of the prohibited uses.
            </Text>

                <Text style={styles.title2}>Intellectual property rights</Text>
                <Text style={styles.text1}>
                    This Agreement does not transfer to you any intellectual property owned by Next Level or third-parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Next Level. All trademarks, service marks, graphics and logos used in connection with our Mobile Application or Services, are trademarks or registered trademarks of Next Level or Next Level licensors. Other trademarks, service marks, graphics and logos used in connection with our Mobile Application or Services may be the trademarks of other third-parties. Your use of our Mobile Application and Services grants you no right or license to reproduce or otherwise use any Next Level or third-party trademarks. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. and you also shouldn’t try to translate the app into other languages, or make derivative versions.
            </Text>

                <Text style={styles.title2}>Disclaimer of warranty</Text>
                <Text style={styles.text1}>
                    You agree that your use of our Mobile Application or Services is solely at your own risk. You agree that such Service is provided on an "as is" and "as available" basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranty that the Services will meet your requirements, or that the Service will be uninterrupted, timely, secure, or error-free; nor do we make any warranty as to the results that may be obtained from the use of the Service or as to the accuracy or reliability of any information obtained through the Service or that defects in the Service will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of Service is done at your own discretion and risk and that you will be solely responsible for any damage to your computer system or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased or obtained through the Service or any transactions entered into through the Service. No advice or information, whether oral or written, obtained by you from us or through the Service shall create any warranty not expressly made herein.
            </Text>

                <Text style={styles.title2}>Limitation of liability</Text>
                <Text style={styles.text1}>
                    To the fullest extent permitted by applicable law, in no event will Next Level, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Next Level has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of Next Level and its affiliates, officers, employees, agents, suppliers and licensors, relating to the services will be limited to an amount greater of one dollar or any amounts actually paid in cash by you to Next Level for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.
            </Text>

                <Text style={styles.title2}>Indemnification</Text>
                <Text style={styles.text1}>
                    You agree to indemnify and hold Next Level and its affiliates, directors, officers, employees, and agents harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys' fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Mobile Application or Services or any willful misconduct on your part.
            </Text>

                <Text style={styles.title2}>Dispute resolution</Text>
                <Text style={styles.text1}>
                    The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of London, United Kingdom without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of United Kingdom. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the state and federal courts located in London, United Kingdom, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.
            </Text>

                <Text style={styles.title2}>Changes and amendments</Text>
                <Text style={styles.text1}>
                    We reserve the right to modify this Agreement or its policies relating to the Mobile Application or Services at any time, effective upon posting of an updated version of this Agreement in the Mobile Application. When we do, we will revise the updated date at the bottom of this page. Continued use of the Mobile Application after any such changes shall constitute your consent to such changes. These changes are effective immediately after they are posted on this page.
            </Text>

                <Text style={styles.title2}>Acceptance of these terms</Text>
                <Text style={styles.text1}>
                    You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using the Mobile Application or its Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Mobile Application and its Services.
            </Text>

                <Text style={styles.title2}>Contacting us</Text>
                <Text style={styles.text1}>
                    If you have any questions about this Agreement, please contact us.
                    This document was last updated on July 14, 2020
            </Text>

                <Text style={styles.title1}>Next Level</Text>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title1: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    title2: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text1: {
        fontSize: 18,
    },
})


export default TermsScreen;
