import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/assets/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data
  },
  getters: {
    data: state => state.data
  },
  mutations: {},
  actions: {},
  modules: {}
})
