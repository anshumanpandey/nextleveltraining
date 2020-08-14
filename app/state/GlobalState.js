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
    NOTIFICATIONS: 'NOTIFICATIONS',
    GOTO: 'GOTO',
    ACHIVEMEN_SELECTED: 'ACHIVEMEN_SELECTED',
}

const initialState = {
    error: null,
    success: null,
    token: null,
    profile: null,
    toggle: false,
    goto: null,
    notifications: [],
    currentAchivemenSelected: null,
};

const reducer = (state, action) => {
    switch (action.type) {
      case GLOBAL_STATE_ACTIONS.ACHIVEMEN_SELECTED: return { ...state, currentAchivemenSelected: action.state };
      case GLOBAL_STATE_ACTIONS.ERROR: return { ...state, ...{error: action.state} };
      case GLOBAL_STATE_ACTIONS.SUCCESS: return { ...state, ...{success: action.state} };
      case GLOBAL_STATE_ACTIONS.NOTIFICATIONS: return { ...state, notifications: action.state };
      case GLOBAL_STATE_ACTIONS.GOTO: return { ...state, goto: action.state };
      case GLOBAL_STATE_ACTIONS.TOKEN: {
        AsyncStorage.setItem('token', action.state)
        return { ...state, ...{token: action.state}, toggle: !state.toggle };
      }
      case GLOBAL_STATE_ACTIONS.PROFILE: {
        let toggle = state.toggle
        AsyncStorage.setItem('profile', JSON.stringify(action.state))
        console.log("1", toggle)
        if (state.profile == null && action?.state?.Id) {
          console.log('setting profile first tinme')
          toggle = !state.toggle
        } else if (action?.state?.Id && action?.state?.Id != state?.profile?.Id) {
          console.log('new ID')
          toggle = !state.toggle
        } else if(!hasFullProfile(state?.profile)) {
          if (action?.state?.AboutUs && action?.state?.AboutUs != state?.profile?.AboutUs) {
            console.log('no full profile, new aboutUs')
            toggle = !state.toggle
          } else if (action?.state?.TravelMile && action?.state?.TravelMile?.TravelDistance != state?.profile?.TravelMile?.TravelDistance) {
            console.log('no full profile, Rate')
            toggle = !state.toggle
          } else if (action?.state?.Rate && action?.state?.Rate != state?.profile?.Rate) {
            console.log('no full profile, Rate')
            toggle = !state.toggle
          } else if (action?.state?.Achievements && action?.state?.Achievements != state?.profile?.Achievements) {
            console.log('no full profile, Achievements')
            toggle = !state.toggle
          } else if (action?.state?.Teams && action?.state?.Teams.length != state?.profile?.Teams.length) {
            console.log('no full profile, Teams')
            toggle = !state.toggle
          } else if (action?.state?.UpcomingMatches && action?.state?.UpcomingMatches.length != state?.profile?.UpcomingMatches.length) {
            console.log('no full profile, UpcomingMatches')
            toggle = !state.toggle
          } else if (action?.state?.Availabilities && action?.state?.Availabilities.length != state?.profile?.Availabilities.length) {
            console.log('no full profile, Availabilities')
            toggle = !state.toggle
          } else if (!hasFullProfile(state?.profile) && action?.state?.TrainingLocations && action?.state?.TrainingLocations.length != state?.profile?.TrainingLocations.length) {
            console.log('no full profile, TrainingLocations')
            toggle = !state.toggle
          }
        }
        console.log("2", toggle)
        if (state.toggle !== toggle) {
          console.log("trugerring rerender of stack")
          return { ...state, ...{profile: action.state}, toggle: toggle };
        }
        return { ...state, ...{profile: action.state} };
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