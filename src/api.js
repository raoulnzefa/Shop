import axios from 'axios'
// // import store from '@/store'

const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    // withCredentials: true,
    auth : {
        username: process.env.VUE_APP_USER,
        password: process.env.VUE_APP_PASSWORD
    }
});


const auth = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
})

// http.defaults.withCredentials = true;

// const token = Buffer.from(`${process.env.VUE_APP_USER}:${process.env.VUE_APP_PASSWORD}`, 'utf8').toString('base64')
// const AUTH_TOKEN = store.getters['user/getUser'].api_token

// http.defaults.headers.common['Authorization'] = `Basic ${token}`;

// http.defaults.auth = {
//     username: process.env.VUE_APP_USER,
//     password: process.env.VUE_APP_PASSWORD
// }


// http.interceptors.request.use(config => {
//     store.commit('loading/START_LOADING');
//     return config;
// }, error => {
//     store.commit('loading/FINISH_LOADING');
//     return Promise.reject(error);
// });

// http.interceptors.response.use( response  => {
//     store.commit('loading/FINISH_LOADING');
//     return response;
// }, error => {
//     store.commit('loading/FINISH_LOADING');
//     return Promise.reject(error);
// });



const wc = "wc/v3/"
const wp = "wp/v2/"
const elektro_url = "digitakeoff/v1/"

export { elektro_url, wp, wc, http, auth } 