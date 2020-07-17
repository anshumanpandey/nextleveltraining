import { configure } from 'axios-hooks'
import Axios from 'axios'
import { getGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../state/GlobalState';

export const axiosInstance = Axios.create({
    baseURL: "http://44.233.116.105/NextLevelTrainingApi/api"
})

axiosInstance.interceptors.request.use(
    config => {
        const token = getGlobalState('token')


        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers["Content-Type"] = `application/json-patch+json`;

        console.log(config.url)
        return config;
    }
);
axiosInstance.interceptors.response.use(
    config => {
        return config;
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.data.errors) {
                const errors = Object.keys(error.response.data.errors).map(key => {
                    return error.response.data.errors[key].join('\n')
                }).join('\n')
                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.ERROR, state: errors });

            }
            /*if (error.response.status === 401) {
                dispatchGlobalState({ type: 'logout' });
            }*/
            console.log('error.response');
            console.log(error.response.headers);
            console.log(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.ERROR, state: 'we  could not connect to the server.' });
            console.log('error.request');
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Something happened in setting up the request that triggered an Error');
            console.log(error.message);
            console.log('error.message');
        }
        throw error;
    }
);

configure({ axios: axiosInstance, cache: false })