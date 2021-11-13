import {createStore} from 'vuex'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import getters from '@/store/getters'

export default createStore({
  state() {
    return {
      events: [],
      sessions: {}
    }
  },
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [],
})
