import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Alert, TouchableWithoutFeedback } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { NavigationActions, StackActions } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import Dimensions from './constants/dimensions';
import Menu from './screens/Menu/Menu.js';
import NavigationService from './navigation/NavigationService.js';
import Login from './screens/login/Login.js';
import SignUp from './screens/signup/Signup.js';
import Level from './screens/level/Level.js';
import Home from './screens/home/Home';
import Search from './screens/search/Search';
import Booking from './screens/booking/Booking';
import Message from './screens/message/Message';
import LastMessage from './screens/message/lastMessages';
import Profile from './screens/profile/index';
import EditInput from './screens/profile/EditInput';
import CreatePostScreen from './screens/createPost/CreatePost';
import CommentsScreen from './screens/home/Comments';
import AddTeam from './screens/profile/AddTeam';
import AddExperience from './screens/profile/AddExperience';
import AddDbsCertificate from './screens/profile/AddDbsCertificate';
import AddQualifications from './screens/profile/AddQualifications';
import VerificationId from './screens/profile/VerificationId';
import UpComingMatch from './screens/profile/UpCommingMatch';
import { Icon } from 'native-base';
import Comment from './screens/home/Comments';
import Information from './screens/search/components/information/Information';
import BookNow from './screens/search/components/BookNow';
import Payments from './screens/payments';
import JobDetails from './screens/bookingDetails';
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from './state/GlobalState';
import './api/AxiosBootstrap';
import SplashScreen from 'react-native-splash-screen'
import EditProfile from './screens/editProfile/EditProfile';
import AboutMeScreen from './screens/aboutMe/AboutMe';
import BankAccountScreen from './screens/bankAccount/BankAccount';
import TrainingLocationScreen from './screens/trainingLocation/TrainingLocation';
import TravelScreen from './screens/travel/Travel';
import TrainingLocationEdit from './screens/trainingLocation/TrainingLocationEdit';
import AvailavilityScreen from './screens/availavility/Availavility';
import TermsScreen from './screens/terms/TermsScreen';
import PrivacyPolicyScreen from './screens/privacyPolicy/PrivacyPolicyScreen';
import LogoutScreen from './screens/logoutScreen/LogoutScreen';
import PaymentConcentScreen from './screens/payments/PaymentConcent';
import HelpScreen from './screens/help/HelpScreen';
import ProfilePicScreen from './screens/profilePic/ProfilePic';
import PlayerInfoScreen from './screens/playerInfo/PlayerInfo';
import CalendarScreen from './screens/Calendar/CalendarScreen';
import ParentComponent from './screens/search/components/ParentComponent';
import CoachsummaryScreen from './screens/coachSummary/CoachsummaryScreen';
import Notifications from './screens/notifications/Notifications';
import ReviewScreen from './screens/review/ReviewScreen';
import ForgotPassword from './screens/forgotPassword/ForgotPassword';
import ForceChangePassword from './screens/forceChangePassword/ForceChangePassword';
import Colors from './constants/color';
import VideoScreen from './screens/video/VideoScreen';
import IsPlayer from './utils/perType/IsPlayer';
import playerProfileIsComplete from './utils/perType/playerProfileIsComplete';

let initialRouteName = null
let Apps = null

const NotificationCountComponent = ({ currentNotifications }) => {
  console.log(currentNotifications.length)
  return <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>
    {currentNotifications.filter(i => i.IsRead == false).length}
  </Text>
}

const AppMain = () => {
  //   const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

  const [error] = useGlobalState('error')
  const [success] = useGlobalState('success')
  const [token] = useGlobalState('token')
  const [profile] = useGlobalState('profile')
  const [toggle] = useGlobalState('toggle')
  const [notifications] = useGlobalState('notifications')
  const [goto] = useGlobalState('goto')
  const [currentNotifications, setCurrentNotifications] = useState([]);

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  useEffect(() => {
    console.log('notifications.length',notifications.length)
    console.log('readednotifications', notifications.filter(i => i.IsRead == false).length)
    console.log('currentNotifications', currentNotifications.filter(i => i.IsRead == false).length)
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
    console.log('error', error)
    if (error) {
      Alert.alert('Error', error.toString())
      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.ERROR, state: null })
    }
  }, [error])

  useEffect(() => {
    console.log('success', error)
    if (success) {
      Toast.show(success, Toast.LONG)
      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.SUCCESS, state: null })
    }
  }, [success])

  const hasCompletedVerificationProcess = () => {
    return (IsPlayer(profile) && playerProfileIsComplete(profile)) || CoachHasCompletedStepFour(profile)
  }

  const HomeStack = createStackNavigator(
    {
      Home: { screen: Home },
      Comment: { screen: Comment },
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        return {
          header: null,
        };
      },
    },
  );

  const SearchStack = createStackNavigator(
    {
      Search: { screen: Search },
      Information: { screen: Information },
      BookNow: { screen: BookNow },
      Payments: { screen: Payments },
      PaymentConcent: { screen: PaymentConcentScreen },
      JobDetails: { screen: JobDetails },
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        return {
          header: null,
        };
      },
    },
  );

  const BookingStack = createStackNavigator(
    {
      Booking: { screen: Booking },
      JobDetails: { screen: JobDetails },
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        return {
          header: null,
        };
      },
    },
  );

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
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        return {
          header: null,
        };
      },
    },
  );
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
      defaultNavigationOptions: ({ navigation }) => {
        return {
          header: null,
        };
      },
    },
  );
  const tabs = {
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        tabBarVisible: hasCompletedVerificationProcess(profile),
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
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    },
    ProfileStack: {
      screen: ConfirmedProfileStack,
      navigationOptions: () => ({
        tabBarVisible: hasCompletedVerificationProcess(profile),
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
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: () => ({
        drawerLockMode: 'locked-closed',
        tabBarVisible: false,
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    },
  }

  if (hasCompletedVerificationProcess(profile) == true && token) {
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
    tabs.CreatePost = {
      screen: CreatePostScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.EditProfile = {
      screen: EditProfile,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }
    tabs.Help = {
      screen: HelpScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.CreateComment = {
      screen: CommentsScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
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
      )
    }

    tabs.Search = {
      screen: SearchStack,
      navigationOptions: () => searchMenuItem,
    }
    tabs.Booking = {
      screen: BookingStack,
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
    tabs.Notifications = {
      screen: Notifications,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.tabContain}>
            <View style={{ marginTop: 'auto', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
              <View>
                <View style={{ backgroundColor: Colors.s_blue, zIndex: 2, position: 'absolute', top: '-50%', left: '50%', height: 18, width: 18, borderRadius: 18 / 2, alignItems: 'center', justifyContent: 'center' }}>
                  <NotificationCountComponent key={notifications.filter(n => n.IsRead).length} currentNotifications={notifications} />
                </View>
                <Icon
                  type="Feather"
                  name="bell"
                  style={[styles.icons, { color: tintColor }]}
                />
              </View>
            </View>
          </View>
        ),
      }),
    }
    tabs.Profile = {
      screen: profile.Role == "Player" ? PlayerInfoScreen : Information,
      params: { player: profile, ...profile, hideConnect: true, hideCoachButtons: true },
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.tabContain}>
            <Icon
              type="Feather"
              name="user"
              style={[styles.icons, { color: tintColor }]}
            />
          </View>
        ),
      }),
    }
    tabs.Message = {
      screen: LastMessage,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.tabContain}>
            <Icon
              type="Feather"
              name="message-square"
              style={[styles.icons, { color: tintColor }]}
            />
          </View>
        ),
      }),
    },
      tabs.Chat = {
        screen: Message,
        navigationOptions: () => ({
          tabBarButtonComponent: ({ tintColor }) => (
            <></>
          ),
        }),
      }

    tabs.AboutMe = {
      screen: AboutMeScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }
    tabs.BankAccount = {
      screen: BankAccountScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.TrainingLocation = {
      screen: TrainingLocationScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }
    tabs.AddCoaches = {
      screen: ParentComponent,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.TrainingLocationEdit = {
      screen: TrainingLocationEdit,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.Availavility = {
      screen: AvailavilityScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.Travel = {
      screen: TravelScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.Terms = {
      screen: TermsScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.CoachSummary = {
      screen: CoachsummaryScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.PrivacyPolicy = {
      screen: PrivacyPolicyScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.PlayerInfo = {
      screen: PlayerInfoScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.Video = {
      screen: VideoScreen,
      navigationOptions: () => ({
        tabBarVisible: false,
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.ReviewScreen = {
      screen: ReviewScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }

    tabs.Calendar = {
      screen: CalendarScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }
  }

  initialRouteName = hasCompletedVerificationProcess(profile) == true && token ? 'Home' : 'Profile'

  const TabNavigator = createBottomTabNavigator(tabs,
    {
      initialRouteName,
      order: hasCompletedVerificationProcess(profile) == true && token ? ['Home', 'Search', "Video",'Booking', "ReviewScreen", "Calendar", "Notifications", "CoachSummary", 'AddCoaches', "ProfileStack",'Message', "Chat", 'Profile', 'CreatePost', 'EditProfile', 'AboutMe', 'BankAccount', 'TrainingLocation', 'Travel', 'Availavility', 'TrainingLocationEdit', "CreateComment", "Terms", "PrivacyPolicy", "Logout", "Help", "PlayerInfo"] : ['Profile'],
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          if (navigation.state.routeName === 'homeTab') {
            if (navigation.state.index === 0) {
              defaultHandler();
            } else {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'drawer' })],
              });
              navigation.dispatch(resetAction);
            }
          } else {
            defaultHandler();
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
    },
  );

  const RootStack = createDrawerNavigator(
    {
      MainStack: {
        screen: TabNavigator,
      },
    },
    {
      drawerWidth: Dimensions.deviceWidth * 0.6,
      contentComponent: hasCompletedVerificationProcess(profile) ? Menu : undefined,
      defaultNavigationOptions: {
        drawerLockMode: hasCompletedVerificationProcess(profile) ? 'unlocked' : 'locked-closed',
      }
    },
  );

  const screens = {}
  if (token) {
    screens.MainStack = RootStack
  } else {
    screens.Level = { screen: Level }
    screens.Login = { screen: Login }
    screens.ForgotPassword = { screen: ForgotPassword }
    screens.SignUp = { screen: SignUp }
  }

  const AuthStack = createStackNavigator(screens, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: null,
      };
    },
  },
  );

  if (!Apps) {
    Apps = createAppContainer(AuthStack);
  }

  useEffect(() => {
    console.log("generationg", screens)
    Apps = createAppContainer(AuthStack);
  }, [token, profile?.Id, profile?.IsTempPassword, notifications.filter(i => i.IsRead == false).length,profile?.AboutUs, profile?.Achievements, profile?.Accomplishment, profile?.Rate, profile?.TravelMile?.TravelDistance, profile?.Teams?.length, profile?.UpcomingMatches?.length, profile?.Availabilities?.length, profile?.BankAccount?.AccountName, toggle])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Apps
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = {
  tabContain: { marginTop: 7, alignItems: 'center' },
  icons: { fontSize: 20 },
  textTab: { fontSize: 10, marginTop: 5 },
};
export default AppMain;
