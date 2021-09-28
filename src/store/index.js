import { createStore } from 'vuex'

export default createStore({
  state: {
    classList: [],
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
  getters: {
    classIncome(state){
      return state.classList.filter(function(item){
        return item.typeIsIncome == true;
      });
    },
    classCost(state){
      return state.classList.filter(function(item){
        return item.typeIsIncome == false;
      });
    },
  },
  mutations: {
    reloadAccount(state, payload){
      state.account.name = payload.name;
      state.account.email = payload.email;
      state.account.photo = payload.photo;
    },
    reloadClassAndRecord(state, payload){
      state.classList = payload.classList;
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
