import { createStore } from 'vuex'

export default createStore({
  state: {
    classList: {
      income: [],
      cost: [],
    },
    recordList: [],
    selectMonth: {
      year: 0,
      month: 0,
    },
    account: {
      name: '',
      email: '',
      photo: '',
    }
  },
  mutations: {
    resetName(state, payload){
      state.account.name = payload;
    },
    resetEmail(state, payload){
      state.account.email = payload;
    },
    resetPhoto(state, payload){
      state.account.photo = payload;
    },
    reloadAccount(state, payload){
      state.account.name = payload.name;
      state.account.email = payload.email;
      state.account.photo = payload.photo;
    },
    reloadClassAndRecord(state, payload){
      state.classList.income = payload.classList.income;
      state.classList.cost = payload.classList.cost;
      state.recordList = payload.recordList;
    },
    selectMonth(state, payload){
      state.selectMonth.year = payload.year;
      state.selectMonth.month = payload.month;
    },
  },
  actions: {
  },
  modules: {
  }
})
