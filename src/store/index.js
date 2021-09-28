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
    initStore(state, payload){

      // selectMonth
      let date = new Date();
      state.selectMonth.year = date.getFullYear();
      state.selectMonth.month = date.getMonth() + 1;

      // classList && recordList && account
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          let res = JSON.parse(xhr.response);
          res.classList.forEach(item => {
            state.classList[item.typeIsIncome ? 'income' : 'cost'].push(item);
          });
          state.classList.income =  state.classList.income.sort(function (a, b) {
            return a.order > b.order ? 1 : -1;
          });
          state.classList.cost =  state.classList.cost.sort(function (a, b) {
            return a.order > b.order ? 1 : -1;
          });
          state.account.name = res.name;
          state.account.email = res.email;
          state.account.photo = res.photo.length > 0 ? '/photo/' + res.photo : '';
        }
      };
      xhr.open('post', '/api/initStore', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
        year: state.selectMonth.year,
        month: state.selectMonth.month,
      }));      
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
