import firebase from '@react-native-firebase/app';
import iid from '@react-native-firebase/iid';

// Your secondary Firebase project credentials...
const credentials = {
  clientId: '932426364308-earsrl3rg5f21a6v2s9n8jfql7aet2ot.apps.googleusercontent.com',
  appId: '1:932426364308:android:8704130440b24fabb78b81',
  apiKey: 'AIzaSyDrwsmUIARbeJOQtt6rHw4dkvjda6RRSAM',
  databaseURL: 'https://nextleveltraining-cc7ce.firebaseio.com',
  storageBucket: 'nextleveltraining-cc7ce.appspot.com',
  messagingSenderId: '932426364308',
  projectId: 'nextleveltraining-cc7ce',
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
