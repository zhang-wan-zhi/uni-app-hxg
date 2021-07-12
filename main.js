import Vue from 'vue'
import App from './App'
import {myRequest} from './api/http.js'
import store from './store'

Vue.prototype.$store = store

Vue.config.productionTip = false
//后端接口地址
Vue.prototype.$serverUrl='http://localhost:8090/'

Vue.prototype.$myRequest = myRequest
// 挂载封装的request


App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
