import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, Alert } from 'react-native';
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
import JobDetails from './screens/jobDetails';
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from './state/GlobalState';
import './api/AxiosBootstrap';
import hasFullProfile from './utils/perType/profileResolver';
import SplashScreen from 'react-native-splash-screen'
import EditProfile from './screens/editProfile/EditProfile';

let initialRouteName = null

const AppMain = () => {
  //   const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

  const [error] = useGlobalState('error')
  const [success] = useGlobalState('success')
  const [token] = useGlobalState('token')
  const [profile] = useGlobalState('profile')

  useEffect(() => {
    SplashScreen.hide();
  }, [])

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
        tabBarVisible: hasFullProfile(profile),
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
  }

  if (hasFullProfile(profile)) {
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
            <Text style={[styles.textTab, { color: tintColor }]}>HOME</Text>
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

    tabs.CreateComment = {
      screen: CommentsScreen,
      navigationOptions: () => ({
        tabBarButtonComponent: ({ tintColor }) => (
          <></>
        ),
      }),
    }
    tabs.Search = {
      screen: SearchStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.tabContain}>
            <Icon
              type="Feather"
              name="search"
              style={[styles.icons, { color: tintColor }]}
            />
            <Text style={[styles.textTab, { color: tintColor }]}>SEARCH</Text>
          </View>
        ),
      }),
    }
    tabs.Booking = {
      screen: Booking,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.tabContain}>
            <Icon
              type="Feather"
              name="shopping-cart"
              style={[styles.icons, { color: tintColor }]}
            />
            <Text style={[styles.textTab, { color: tintColor }]}>BOOKING</Text>
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
            <Text style={[styles.textTab, { color: tintColor }]}>MESSAGE</Text>
          </View>
        ),
      }),
    }
  }

  if (initialRouteName == null) {
    initialRouteName = hasFullProfile(profile) == true ? 'Home' : 'Profile'
  }

  const TabNavigator = createBottomTabNavigator(tabs,
    {
      initialRouteName,
      order: hasFullProfile(profile) ? ['Home', 'Search', 'Booking', 'Message', 'Profile', 'CreatePost', 'EditProfile'] : ['Profile'],
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
      contentComponent: hasFullProfile(profile) ? Menu : undefined,
      defaultNavigationOptions: {
        drawerLockMode: hasFullProfile(profile) ? 'unlocked': 'locked-closed' ,
      }
    },
  );

  const screens = {}
  if (token) {
    screens.MainStack = RootStack
  } else {
    screens.Level = { screen: Level }
    screens.Login = { screen: Login }
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

  const Apps = createAppContainer(AuthStack);

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
