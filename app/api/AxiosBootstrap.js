import {configure} from 'axios-hooks'
import Axios from 'axios'
import {
  getGlobalState,
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../state/GlobalState'

export const API_BASE_URL =
  'https://mobileapi.nextlevelfootballtraining.co.uk/api'
// export const API_BASE_URL = "https://44.233.116.105/NextLevelTrainingApi/api"
export const axiosInstance = Axios.create({
  baseURL: API_BASE_URL,
})

axiosInstance.interceptors.request.use(config => {
  const token = getGlobalState('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers['Content-Type'] = `application/json-patch+json`

  console.log('\x1b[32m', config.method.toUpperCase(), '\x1b[0m', config.url)
  return config
})
axiosInstance.interceptors.response.use(
  config => {
    return config
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data.errors) {
        const errors = Object.keys(error.response.data.errors)
          .map(key => {
            return error.response.data.errors[key].join('\n')
          })
          .join('\n')
        if (
          error.response.data.errors.error?.[0].includes('Value cannot be null')
        ) {
          dispatchGlobalState({type: GLOBAL_STATE_ACTIONS.LOGOUT})
        } else {
          dispatchGlobalState({type: GLOBAL_STATE_ACTIONS.ERROR, state: errors})
        }
      }
      if (error.response.status === 401) {
        dispatchGlobalState({type: GLOBAL_STATE_ACTIONS.LOGOUT})
      }
      console.log(
        '\x1b[41m',
        error.request._method,
        '\x1b[0m',
        error.request.responseURL,
      )
      //   console.log(error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      dispatchGlobalState({
        type: GLOBAL_STATE_ACTIONS.ERROR,
        state:
          'Unable to connect to server, please check your internet connection and try again',
      })
      console.log(
        '\x1b[41m',
        error.request._method,
        '\x1b[0m',
        error.request.responseURL,
      )
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(
        'Something happened in setting up the request that triggered an Error',
      )
    }
    throw error
  },
)

configure({axios: axiosInstance, cache: false})
