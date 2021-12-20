import React, { useEffect, useState } from 'react'
import 'react-native-get-random-values'

import './utils/PushNotifications'
import './utils/GlobalErrorHandler'
// import './utils/Firebase';
import {
  Text,
  View,
  SafeAreaView,
  Alert,
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Icon } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-community/async-storage'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import messaging from '@react-native-firebase/messaging'
import Dimensions from './constants/dimensions'
import Menu from './screens/Menu/Menu.js'
import NavigationService from './navigation/NavigationService.js'
import Login from './screens/login/Login.js'
import SignUp from './screens/signup/Signup'
import AskReview from './screens/askReview/AskReview'
import Level from './screens/level/Level.js'
import Home from './screens/home/Home'
import Search from './screens/search/Search'
import Booking from './screens/booking/Booking'
import Message from './screens/message/Message'
import LastMessage from './screens/message/lastMessages'
import Profile from './screens/profile/index'
import EditInput from './screens/profile/EditInput'
import CreatePostScreen from './screens/createPost/CreatePost'
import CommentsScreen from './screens/home/Comments'
import BookingCheckout from './screens/bookingCheckout/BookingCheckout'
import AddTeam from './screens/profile/AddTeam'
import AddExperience from './screens/profile/AddExperience'
import AddDbsCertificate from './screens/profile/AddDbsCertificate'
import AddQualifications from './screens/profile/qualifications/AddQualifications'
import VerificationId from './screens/profile/VerificationId'
import UpComingMatch from './screens/profile/UpCommingMatch'
import Comment from './screens/home/Comments'
import Information from './screens/search/components/information/index'
import BookNow from './screens/search/components/BookNow'
import Payments from './screens/payments'
import JobDetails from './screens/bookingDetails'
import {
  useGlobalState,
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from './state/GlobalState'
import EditProfile from './screens/editProfile/EditProfile'
import AboutMeScreen from './screens/aboutMe/AboutMe'
import BankAccountScreen from './screens/bankAccount/BankAccount'
import TrainingLocationScreen from './screens/trainingLocation/TrainingLocation'
import TravelScreen from './screens/travel/Travel'
import TrainingLocationEdit from './screens/trainingLocation/TrainingLocationEdit'
import AvailavilityScreen from './screens/availavility/Availavility'
import TermsScreen from './screens/terms/TermsScreen'
import PrivacyPolicyScreen from './screens/privacyPolicy/PrivacyPolicyScreen'
import LogoutScreen from './screens/logoutScreen/LogoutScreen'
import PaymentConcentScreen from './screens/payments/PaymentConcent'
import HelpScreen from './screens/help/HelpScreen'
import SuccessPayFeatured from './screens/successPayFeatured/SuccessPayFeatured'
import ProfilePicScreen from './screens/profilePic/ProfilePic'
import PlayerInfoScreen from './screens/playerInfo/PlayerInfo'
import CalendarScreen from './screens/Calendar/CalendarScreen'
import ParentComponent from './screens/search/components/ParentComponent'
import CoachsummaryScreen from './screens/coachSummary/CoachsummaryScreen'
import Notifications from './screens/notifications/Notifications'
import ReviewScreen from './screens/review/ReviewScreen'
import ForgotPassword from './screens/forgotPassword/ForgotPassword'
import ForceChangePassword from './screens/forceChangePassword/ForceChangePassword'
import VideoScreen from './screens/video/VideoScreen'
import HasCompletedVerificationProcess from './utils/HasCompletedVerificationProcess'
import AskFeatured from './screens/askFeatured/AskFeatured'
import PayFeatured from './screens/payFeaturedScreen/PayFeatured'
import ContactUsScreen from './screens/contactUs/ContactUsScreen'
import { sendAndroidToken } from './utils/firebase/RequestDeviceToken'
import Settings from './screens/settings/Settings'
import Cart from './screens/cart/Cart'
import Responses from './screens/responses/Responses'
import ResponseDetails from './screens/responses/ResponseDetails'
import Leads from './screens/leads/Leads'
import LeadDetails from './screens/leads/LeadDetails'
import PayCredits from './screens/payCredits/PayCredits'
import LeadPreferences from './screens/leadPreferences/LeadPreferences'
import Wallet from './screens/wallet/Wallet'
import MyProfileCoach from './screens/myProfile/MyProfileCoach'
import MyProfilePlayer from './screens/myProfile/MyProfilePlayer'
import PersonalDetails from './screens/myProfile/PersonalDetails'
import FindCoach from './screens/myProfile/FindCoach'
import SuccessPayCredits from './screens/successPayCredits/SuccessPayCredits'
import CardPayment from './screens/cardPayment/CardPayment'

import GlobalContants from './constants/GlobalContants'



let initialRouteName = null
let Apps = null

// const NotificationCountComponent = ({ currentNotifications }) => {
//   console.log(currentNotifications.length)
//   return <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>
//     {currentNotifications.filter(i => i.IsRead == false).length}
//   </Text>
// }

// const BadgeNotification = ({ tintColor }) => {
//   const [notifications] = useGlobalState('notifications')

//   return (
//     <View style={styles.tabContain}>
//       <View style={{ marginTop: 'auto', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
//         <View>
//           <View style={{ backgroundColor: Colors.s_blue, zIndex: 2, position: 'absolute', top: '-50%', left: '50%', height: 18, width: 18, borderRadius: 18 / 2, alignItems: 'center', justifyContent: 'center' }}>
//             <NotificationCountComponent key={notifications.filter(n => n.IsRead).length} currentNotifications={notifications} />
//           </View>
//           <Icon
//             type="Feather"
//             name="bell"
//             style={[styles.icons, { color: tintColor }]}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

const AppMain = () => {
  //   const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

  const [error] = useGlobalState('error')
  const [success] = useGlobalState('success')
  const [token] = useGlobalState('token')
  const [profile] = useGlobalState('profile')
  const [toggle] = useGlobalState('toggle')
  const [notifications] = useGlobalState('notifications')
  const [goto] = useGlobalState('goto')
  const [currentNotifications, setCurrentNotifications] = useState([])

  const listenTokens = () => {
    messaging().onTokenRefresh(fcmToken => {
      sendAndroidToken(fcmToken)
    })
  }

  const listenForNotificationOpening = () => {
    messaging().onNotificationOpenedApp(() => {
      NavigationService.navigate('Notifications')
    })
  }

  useEffect(() => {
    listenForNotificationOpening()
    listenTokens()
    SplashScreen.hide()
    PushNotificationIOS.addEventListener('register', deviceToken => {
      AsyncStorage.setItem('AppleDeviceToken', deviceToken)
    })
    PushNotificationIOS.addEventListener('registrationError', err => {
      Alert.alert(
        'PushNotification registrationError',
        `${err.message}\n${err.details}`,
      )
    })
  }, [])

  useEffect(() => {
    console.group('notifications')
    console.log('total', notifications.length)
    console.log('read', notifications.filter(i => i.IsRead == false).length)
    console.log(
      'current',
      currentNotifications.filter(i => i.IsRead == false).length,
    )
    console.groupEnd()
    setCurrentNotifications([...notifications])
  }, [...notifications, toggle])

  useEffect(() => {
    setTimeout(() => {
      if (goto) {
        NavigationService.navigate(goto)
        dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.GOTO, state: null })
      }
    }, 100)
  }, [goto])

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.toString())
      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.ERROR, state: null })
    }
  }, [error])

  useEffect(() => {
    if (success) {
      Toast.show(success, Toast.LONG)
      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.SUCCESS, state: null })
    }
  }, [success])

  const HomeStack = createStackNavigator(
    {
      Home: { screen: Home },
      Comment: { screen: Comment },
      Notification: { screen: Notifications },
      Message: { screen: Message },
      LastMessage: { screen: LastMessage },
      Leads: { screen: Leads },
      LeadDetails: { screen: LeadDetails },
      Cart: { screen: Cart },
      PayCredits: { screen: PayCredits },
      CardPayment: { screen: CardPayment },
      LeadPreferences: { screen: LeadPreferences },
    },
    {
      defaultNavigationOptions: () => ({
        headerShown: false,
      }),
    },
  )

  const LeadStack = createStackNavigator(
    {
      Leads: { screen: Leads },
      LeadDetails: { screen: LeadDetails },
      Cart: { screen: Cart },
      PayCredits: { screen: PayCredits },
      CardPayment: { screen: CardPayment },
      LeadPreferences: { screen: LeadPreferences },
    },
    {
      defaultNavigationOptions: () => ({
        headerShown: false,
      }),
    },
  )

  const ResponseStack = createStackNavigator(
    {
      Responses: { screen: Responses },
      ResponseDetails: { screen: ResponseDetails },
    },
    {
      defaultNavigationOptions: () => ({
        headerShown: false,
      }),
    },
  )

  const SettingsStack = createStackNavigator(
    {
      Settings: { screen: Settings },
      CoachSummary: { screen: CoachsummaryScreen },
      Wallet: { screen: Wallet },
      EditProfile: { screen: EditProfile },
      AboutMe: { screen: AboutMeScreen },
      Availability: { screen: AvailavilityScreen },
      TrainingLocation: { screen: TrainingLocationScreen },
      TrainingLocationEdit: { screen: TrainingLocationEdit },
      Calendar: { screen: CalendarScreen },
      Terms: { screen: TermsScreen },
      Privacy: { screen: PrivacyPolicyScreen },
      Help: { screen: HelpScreen },
      ContactUs: { screen: ContactUsScreen },
      Logout: { screen: LogoutScreen },
      Information: { screen: Information },
      MyProfileCoach: { screen: MyProfileCoach },
      PersonalDetails: { screen: PersonalDetails },
      FindCoach: { screen: FindCoach },
      AskFeatured: { screen: AskFeatured },
      MyProfilePlayer: { screen: MyProfilePlayer },
      Cart: { screen: Cart },
      PayCredits: { screen: PayCredits },
      SuccessPayCredits: { screen: SuccessPayCredits },
      CardPayment: { screen: CardPayment },
      ProfilePic: { screen: ProfilePicScreen },
      PayFeatured: { screen: PayFeatured }
    },
    {
      defaultNavigationOptions: () => ({
        headerShown: false,
      }),
    },
  )

  const SearchStack = createStackNavigator(
    {
      Search: { screen: Search },
      Information: { screen: Information },
      PlayerInfo: { screen: PlayerInfoScreen },
      BookNow: { screen: BookNow },
      BookingCheckout: { screen: BookingCheckout },
      Payments: { screen: Payments },
      PaymentConcent: { screen: PaymentConcentScreen },
      JobDetails: { screen: JobDetails },
      Notification: { screen: Notifications },
      Message: { screen: Message },
      LastMessage: { screen: LastMessage },
      Cart: { screen: Cart },
      PayCredits: { screen: PayCredits },
      CardPayment: { screen: CardPayment },
    },
    {
      defaultNavigationOptions: () => ({
        headerShown: false,
      }),
    },
  )

  const BookingStack = createStackNavigator(
    {
      Booking: { screen: Booking },
      JobDetails: { screen: JobDetails },
      Notification: { screen: Notifications },
      Message: { screen: Message },
      LastMessage: { screen: LastMessage },
    },
    {
      defaultNavigationOptions: () => ({
        headerShown: false,
      }),
    },
  )

  const ProfileStack = createStackNavigator(
    {
      Profile: { screen: Profile },
      EditInput: { screen: EditInput },
      ProfilePic: { screen: ProfilePicScreen },
      AddTeam: { screen: AddTeam },
      AddExperience: { screen: AddExperience },
      AddDbsCertificate: { screen: AddDbsCertificate },
      AddQualifications: { screen: AddQualifications },
      VerificationId: { screen: VerificationId },
      UpComingMatch: { screen: UpComingMatch },
      ForceChangePassword: { screen: ForceChangePassword },
      Notification: { screen: Notifications },
      Message: { screen: Message },
      LastMessage: { screen: LastMessage },
    },
    {
      defaultNavigationOptions: () => ({
        headerShown: false,
      }),
    },
  )
  const ConfirmedProfileStack = createStackNavigator(
    {
      ProfilePic: { screen: ProfilePicScreen },
      EditInput: { screen: EditInput },
      AddTeam: { screen: AddTeam },
      AddExperience: { screen: AddExperience },
      AddDbsCertificate: { screen: AddDbsCertificate },
      AddQualifications: { screen: AddQualifications },
      VerificationId: { screen: VerificationId },
      UpComingMatch: { screen: UpComingMatch },
    },
    {
      defaultNavigationOptions: () => ({
        headerShown: false,
      }),
    },
  )
  const tabs = {
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        tabBarVisible:
          HasCompletedVerificationProcess(profile) && profile?.ProfileImage,
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.tabContain}>
            <Icon
              type="MaterialIcons"
              name="person-outline"
              style={[styles.icons, { color: tintColor }]}
            />
            <Text style={[styles.textTab, { color: tintColor }]}>PROFILE</Text>
          </View>
        ),
        tabBarButtonComponent: () => <></>,
      }),
    },
    ProfileStack: {
      screen: ConfirmedProfileStack,
      navigationOptions: () => ({
        tabBarVisible:
          HasCompletedVerificationProcess(profile) && profile?.ProfileImage,
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.tabContain}>
            <Icon
              type="MaterialIcons"
              name="person-outline"
              style={[styles.icons, { color: tintColor }]}
            />
            <Text style={[styles.textTab, { color: tintColor }]}>PROFILE</Text>
          </View>
        ),
        tabBarButtonComponent: () => <></>,
      }),
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: () => ({
        drawerLockMode: 'locked-closed',
        tabBarVisible: false,
        tabBarButtonComponent: () => <></>,
      }),
    },
    AboutMe: {
      screen: AboutMeScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    },
    succesPayFeatured: {
      screen: SuccessPayFeatured,
      navigationOptions: () => ({
        tabBarVisible: false,
        tabBarButtonComponent: () => <></>,
      }),
    },
    SuccessPayCredits: {
      screen: SuccessPayCredits,
      navigationOptions: () => ({
        tabBarVisible: false,
        tabBarButtonComponent: () => <></>,
      }),
    },
  }

  if (HasCompletedVerificationProcess(profile) == true && token) {
    tabs.Home = {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.tabContain}>
            <Icon
              type="SimpleLineIcons"
              name="home"
              style={[styles.icons, { color: tintColor }]}
            />
          </View>
        ),
      }),
    }
    tabs.succesPayFeatured = {
      screen: SuccessPayFeatured,
      navigationOptions: () => ({
        tabBarVisible: false,
        tabBarButtonComponent: () => <></>,
      }),
    }
    tabs.CreatePost = {
      screen: CreatePostScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.EditProfile = {
      screen: EditProfile,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }
    tabs.Help = {
      screen: HelpScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.CreateComment = {
      screen: CommentsScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }
    const searchMenuItem = {
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabContain}>
          <Icon
            type="Feather"
            name="search"
            style={[styles.icons, { color: tintColor }]}
          />
        </View>
      ),
    }

    tabs.Search = {
      screen: SearchStack,
      navigationOptions: () => searchMenuItem,
    }

    if (profile && profile.Role == 'Player') {
      tabs.Cart = {
        screen: Cart,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <View style={styles.tabContain}>
              <Icon
                type="Feather"
                name="shopping-cart"
                style={[styles.icons, { color: tintColor }]}
              />
            </View>
          ),
        }),
      }
    } else {
      tabs.Leads = {
        screen: LeadStack,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <View style={styles.tabContain}>
              <Icon
                type="FontAwesome5"
                name="grip-horizontal"
                style={[styles.icons, { color: tintColor }]}
              />
            </View>
          ),
        }),
      }
    }

    if (profile && profile.Role == 'Player') {
      tabs.Booking = {
        screen: BookingStack,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <View style={styles.tabContain}>
              <Icon
                type="Feather"
                name="bookmark"
                style={[styles.icons, { color: tintColor }]}
              />
            </View>
          ),
        }),
      }
    } else {
      tabs.Responses = {
        screen: ResponseStack,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <View style={styles.tabContain}>
              <Icon
                type="FontAwesome5"
                name="reply"
                style={[styles.icons, { color: tintColor }]}
              />
            </View>
          ),
        }),
      }
    }

    // tabs.Notifications = {
    //   screen: Notifications,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({ tintColor }) => (
    //       <BadgeNotification tintColor={tintColor} />
    //     ),
    //   }),
    // }

    tabs.AskFeatured = {
      screen: AskFeatured,
      params: { redirect: true },
      navigationOptions: () => ({
        tabBarVisible: false,
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.Profile = {
      // screen: profile.Role == "Player" ? PlayerInfoScreen : Information,
      screen: SettingsStack,
      // params: { player: getGlobalState("profile"), ...getGlobalState("profile"), coach: getGlobalState("profile"), hideConnect: true, hideCoachButtons: true, editable: true },
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.tabContain}>
            <Icon
              type="Feather"
              name="settings"
              style={[styles.icons, { color: tintColor }]}
            />
          </View>
        ),
      }),
      options: {
        unmountOnBlur: true,// set this props in your tab screen options
      }
    }
    // tabs.Message = {
    //   screen: LastMessage,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({ tintColor }) => (
    //       <View style={styles.tabContain}>
    //         <Icon
    //           type="Feather"
    //           name="message-square"
    //           style={[styles.icons, { color: tintColor }]}
    //         />
    //       </View>
    //     ),
    //   }),
    // },
    //   tabs.Chat = {
    //     screen: Message,
    //     navigationOptions: () => ({
    //       tabBarButtonComponent: ({ tintColor }) => (
    //         <></>
    //       ),
    //     }),
    //   }
    tabs.BankAccount = {
      screen: BankAccountScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.TrainingLocation = {
      screen: TrainingLocationScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }
    tabs.AddCoaches = {
      screen: ParentComponent,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.TrainingLocationEdit = {
      screen: TrainingLocationEdit,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.Availavility = {
      screen: AvailavilityScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.Travel = {
      screen: TravelScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.Terms = {
      screen: TermsScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.PayFeatured = {
      screen: PayFeatured,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.ContactUs = {
      screen: ContactUsScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.CoachSummary = {
      screen: CoachsummaryScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.PrivacyPolicy = {
      screen: PrivacyPolicyScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.PlayerInfo = {
      screen: PlayerInfoScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.Video = {
      screen: VideoScreen,
      navigationOptions: () => ({
        tabBarVisible: false,
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.ReviewScreen = {
      screen: ReviewScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }

    tabs.Calendar = {
      screen: CalendarScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <></>,
      }),
    }
  }

  initialRouteName =
    HasCompletedVerificationProcess(profile) === true && token
      ? 'Home'
      : 'Profile'

  let TabNavigator = null
  if (profile && profile.Role == 'Player') {
    const allAppScreens = [
      'Home',
      'succesPayFeatured',
      'AskFeatured',
      'Search',
      'Video',
      'Cart',
      'Booking',
      'ContactUs',
      'PayFeatured',
      'ReviewScreen',
      'Calendar',
      'CoachSummary',
      'AddCoaches',
      'ProfileStack',
      'Profile',
      'CreatePost',
      'EditProfile',
      'AboutMe',
      'BankAccount',
      'TrainingLocation',
      'Travel',
      'Availavility',
      'TrainingLocationEdit',
      'CreateComment',
      'Terms',
      'PrivacyPolicy',
      'Logout',
      'Help',
    ]
    TabNavigator = createBottomTabNavigator(tabs, {
      initialRouteName,
      order:
        HasCompletedVerificationProcess(profile) === true && token
          ? allAppScreens : ['Profile', 'succesPayFeatured'],
      defaultNavigationOptions: () => ({
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          if (navigation.state.routeName === 'homeTab') {
            if (navigation.state.index === 0) {
              defaultHandler()
            } else {
              // const resetAction = StackActions.reset({
              //   index: 0,
              //   actions: [NavigationActions.navigate({routeName: 'drawer'})],
              // });
              // navigation.dispatch(resetAction);
              // NavigatorService.openDrawer()
            }
          } else {
            defaultHandler()
          }
        },
      }),
      tabBarOptions: {
        activeTintColor: '#0F2F80',
        // inactiveTintColor: Colors.tabIconInActive,
        allowFontScaling: true,
        showLabel: false,
        style: {
          // backgroundColor: Colors.white,
        },
      },
      navigationOptions: {
        header: {
          visible: true,
        },
      },
    })
  } else {
    TabNavigator = createBottomTabNavigator(tabs, {
      initialRouteName,
      order:
        HasCompletedVerificationProcess(profile) == true && token
          ? [
            'Home',
            'succesPayFeatured',
            'AskFeatured',
            'Search',
            'Video',
            'Leads',
            'Responses',
            'ContactUs',
            'PayFeatured',
            'ReviewScreen',
            'Calendar',
            'CoachSummary',
            'AddCoaches',
            'ProfileStack',
            'Profile',
            'CreatePost',
            'EditProfile',
            'AboutMe',
            'BankAccount',
            'TrainingLocation',
            'Travel',
            'Availavility',
            'TrainingLocationEdit',
            'CreateComment',
            'Terms',
            'PrivacyPolicy',
            'Logout',
            'Help',
          ]
          : ['Profile', 'succesPayFeatured'],
      defaultNavigationOptions: () => ({
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          if (navigation.state.routeName === 'homeTab') {
            if (navigation.state.index === 0) {
              defaultHandler()
            } else {
              // const resetAction = StackActions.reset({
              //   index: 0,
              //   actions: [NavigationActions.navigate({routeName: 'drawer'})],
              // });
              // navigation.dispatch(resetAction);
              // NavigatorService.openDrawer()
            }
          } else {
            defaultHandler()
          }
        },
      }),
      tabBarOptions: {
        activeTintColor: '#0F2F80',
        // inactiveTintColor: Colors.tabIconInActive,
        allowFontScaling: true,
        showLabel: false,
        style: {
          // backgroundColor: Colors.white,
        },
      },
      navigationOptions: {
        header: {
          visible: true,
        },
      },
    })
  }

  const RootStack = createDrawerNavigator(
    {
      MainStack: {
        screen: TabNavigator,
      },
    },
    {
      drawerWidth: Dimensions.deviceWidth * 0.6,
      contentComponent: HasCompletedVerificationProcess(profile)
        ? Menu
        : undefined,
      defaultNavigationOptions: {
        drawerLockMode: HasCompletedVerificationProcess(profile)
          ? 'unlocked'
          : 'locked-closed',
      },
    },
  )

  const screens = {}
  if (token) {
    screens.MainStack = RootStack
  } else {
    screens.Level = { screen: Level }
    screens.AskFeatured = { screen: AskFeatured }
    screens.Login = { screen: Login }
    screens.Terms = { screen: TermsScreen }
    screens.ForgotPassword = { screen: ForgotPassword }
    screens.SignUp = { screen: SignUp }
    screens.AskReview = { screen: AskReview }
  }

  const AuthStack = createStackNavigator(screens, {
    defaultNavigationOptions: () => ({
      headerShown: false,
    }),
  })

  if (!Apps) {
    Apps = createAppContainer(AuthStack)
  }

  useEffect(() => {
    Apps = createAppContainer(AuthStack)
  }, [
    token,
    profile?.Id,
    profile?.IsTempPassword,
    profile?.AboutUs,
    profile?.Achievements,
    profile?.Accomplishment,
    profile?.Rate,
    profile?.TravelMile?.TravelDistance,
    profile?.Teams?.length,
    profile?.UpcomingMatches?.length,
    profile?.Availabilities?.length,
    profile?.BankAccount?.AccountName,
    toggle,
  ])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Apps
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = {
  tabContain: { marginTop: 7, alignItems: 'center' },
  icons: { fontSize: 20 },
  textTab: { fontSize: 10, marginTop: 5 },
}
export default AppMain
