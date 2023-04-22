import { createStore } from 'vuex'

//导入主题
import theme from './modules/theme.js'
export default createStore({
  /*state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },*/
  //定义模块
  modules: {
    theme
  }
})
