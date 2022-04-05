import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { elektro_url, wp, wc, http, auth } from './api'
import lodash from 'lodash'
import mitt from 'mitt'
import ProductData from './components/ProductData'
import ProductDataWithID from './components/ProductDataWithId'
import Main from './components/layouts/Main'
import Auth from './components/layouts/Auth'
import Loader from './components/Loader'
import store from './store'
import './index.css'

window.$auth = auth
window.$wp = wp
window.$wc = wc
window.$http = http
window.$elektro = elektro_url

const app = createApp(App)
app.config.globalProperties.$publicPath = process.env.VUE_APP_PUBLIC_PATH

app.config.globalProperties.$sp = process.env.VUE_APP_STORAGE_PATH

app.config.globalProperties.$currency = "&#x20A6;"

app.config.globalProperties.$_ = lodash
app.config.globalProperties.$eBus = mitt()

app.config.globalProperties.$appName = "DOSE"
app.config.globalProperties.$lagos = [
    'Agege',
    'Ajeromi-Ifelodun',
    'Alimosho',
    'Amuwo-Odofin',
    'Apapa',
    'Badagry',
    'Epe',
    'Eti Osa',
    'Ibeju-Lekki',
    'Ifako-Ijaiye',
    'Ikeja',
    'Ikorodu',
    'Kosofe',
    'Lagos Island',
    'Lagos Mainland',
    'Mushin',
    'Ojo',
    'Oshodi-Isolo',
    'Shomolu',
    'Surulere',
],

app.config.globalProperties.$flash = function (message, level = 'success') {
    app.config.globalProperties.$eBus.emit('flash', { message, level });
};

app.config.globalProperties.$per_page = 12

app.use(store).use(router)

app.component('product-data', ProductData)
app.component('product-info', ProductDataWithID)

app.component('main-layout', Main)
app.component('auth-layout', Auth)
app.component('loader', Loader)

app.mount('#app')