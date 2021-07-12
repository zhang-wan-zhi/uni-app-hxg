import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		"username": "foo",
		"age": 18,
		'schoolTimeState': 0
	},
	// 获取状态
	getters: {
		doneTodos: state => {
			return state.username
		}
	},
	// 改变状态
	mutations: {
		add(state) {
			// 变更状态
			state.username = 'zwz'
		},
		changeSchoolTime(state) {
			state.schoolTimeState += 1
		}
	}
})
export default store
