import firebase from '@react-native-firebase/app';
import iid from '@react-native-firebase/iid';

export const FIREBASE_SENDER_ID = "669575831507"

// Your secondary Firebase project credentials...
const credentials = {
  clientId: '669575831507-1t77dvfe17sir5usss2ejc7ju5dhmako.apps.googleusercontent.com',
  appId: '1:669575831507:android:0cba19866c0f37e1e01926',
  apiKey: 'AIzaSyB8ct_AcRzDyR5fiTz1QfMRntGGUKsHKug',
  databaseURL: 'https://next-level-training-3ab08.firebaseio.com',
  storageBucket: 'next-level-training-3ab08.appspot.com',
  messagingSenderId: FIREBASE_SENDER_ID,
  projectId: 'next-level-training-3ab08',
};

const config = {
  name: iid.name,
};

if (!firebase.apps.length) {
  firebase.initializeApp(credentials, config);
}

const apps = firebase.apps;

apps.forEach(app => {
  console.log('App name: ', app.name);
});
