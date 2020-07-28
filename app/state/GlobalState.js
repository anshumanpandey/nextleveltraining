import { createStore } from 'react-hooks-global-state';
import AsyncStorage from '@react-native-community/async-storage';
import hasFullProfile from '../utils/perType/profileResolver';

export const GLOBAL_STATE_ACTIONS = {
    ERROR: 'error',
    SUCCESS: 'success',
    TOKEN: 'TOKEN',
    PROFILE: 'PROFILE',
    LOGOUT: 'LOGOUT',
    TOGGLE: 'TOGGLE',
    ACHIVEMEN_SELECTED: 'ACHIVEMEN_SELECTED',
}

const initialState = {
    error: null,
    success: null,
    token: null,
    profile: null,
    toggle: false,
    currentAchivemenSelected: null,
};

const reducer = (state, action) => {
    switch (action.type) {
      case GLOBAL_STATE_ACTIONS.ACHIVEMEN_SELECTED: return { ...state, currentAchivemenSelected: action.state };
      case GLOBAL_STATE_ACTIONS.ERROR: return { ...state, ...{error: action.state} };
      case GLOBAL_STATE_ACTIONS.SUCCESS: return { ...state, ...{success: action.state} };
      case GLOBAL_STATE_ACTIONS.TOKEN: {
        AsyncStorage.setItem('token', action.state)
        return { ...state, ...{token: action.state}, toggle: !state.toggle };
      }
      case GLOBAL_STATE_ACTIONS.PROFILE: {
        let toggle = state.toggle
        AsyncStorage.setItem('profile', JSON.stringify(action.state))
        if (state.profile == null && action?.state?.Id) {
          console.log('setting profile first tinme')
          toggle = !state.toggle
        } else if (action?.state?.Id && action?.state?.Id != state?.profile?.Id) {
          toggle = !state.toggle
        } else if(state?.profile && !hasFullProfile(state?.profile)) {
          if (action?.state?.AboutMe && action?.state?.AboutMe != state?.profile?.AboutMe) {
            toggle = !state.toggle
          } else if (action?.state?.Achievements && action?.state?.Achievements != state?.profile?.Achievements) {
            toggle = !state.toggle
          } else if (action?.state?.Teams && action?.state?.Teams.length != state?.profile?.Teams.length) {
            toggle = !state.toggle
          } else if (action?.state?.UpcomingMatches && action?.state?.UpcomingMatches.length != state?.profile?.UpcomingMatches.length) {
            toggle = !state.toggle
          }

        }
        return { ...state, ...{profile: action.state}, toggle: toggle };
      }
      case GLOBAL_STATE_ACTIONS.LOGOUT: {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('profile')
        return { ...state, ...{profile: null, token: null}, toggle: !state.toggle };
      }
      case GLOBAL_STATE_ACTIONS.TOGGLE: {
        return { ...state, toggle: !state.toggle };
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