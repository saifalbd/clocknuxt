import Vue from 'vue'
import Vuex from 'vuex'
import fullMonthPrayer from './fullMonthPrayer'
import forFilterPrayer from './forFilterPrayer'
import ChangeMonth from './ChangeMonth'
import AsmaAlHusma from './AsmaAlHusma'
import PreLoader from './PreLoader'
import ReadAndListen from './ReadAndListen'


Vue.use(Vuex);


const createStore = () => {
  return new Vuex.Store({
    modules:{
        fullMonthPrayer,
        forFilterPrayer,
        ChangeMonth,
        AsmaAlHusma,
        PreLoader,
        ReadAndListen
    },
    state: () => ({
        counter: 0
      }),
      mutations: {
        increment (state) {
          state.counter++
        }
      }

  })
}

export default createStore