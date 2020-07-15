import { createStore } from 'react-hooks-global-state';
import AsyncStorage from '@react-native-community/async-storage';

export const GLOBAL_STATE_ACTIONS = {
    ERROR: 'error',
    SUCCESS: 'success',
    TOKEN: 'TOKEN',
    PROFILE: 'PROFILE',
    LOGOUT: 'LOGOUT',
    ACHIVEMEN_SELECTED: 'ACHIVEMEN_SELECTED',
}

const initialState = {
    error: null,
    success: null,
    token: null,
    profile: null,
    currentAchivemenSelected: null,
};

const reducer = (state, action) => {
    switch (action.type) {
      case GLOBAL_STATE_ACTIONS.ACHIVEMEN_SELECTED: return { ...state, currentAchivemenSelected: action.state };
      case GLOBAL_STATE_ACTIONS.ERROR: return { ...state, ...{error: action.state} };
      case GLOBAL_STATE_ACTIONS.SUCCESS: return { ...state, ...{success: action.state} };
      case GLOBAL_STATE_ACTIONS.TOKEN: {
        AsyncStorage.setItem('token', action.state)
        return { ...state, ...{token: action.state} };
      }
      case GLOBAL_STATE_ACTIONS.PROFILE: {
        AsyncStorage.setItem('profile', JSON.stringify(action.state))
        return { ...state, ...{profile: action.state} };
      }
      case GLOBAL_STATE_ACTIONS.LOGOUT: {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('profile')
        return { ...state, ...{profile: null, token: null} };
      }
      default: return state;
    }
  };

export const { dispatch: dispatchGlobalState, useGlobalState, getGlobalState } = createStore(reducer, initialState);

AsyncStorage.getItem('token')
.then(token => {
  if (token) dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: token })
})

AsyncStorage.getItem('profile')
.then(profile => {
  if (profile) dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: JSON.parse(profile) })
})