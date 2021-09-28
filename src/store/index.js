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
    resetClassOrder(state, payload){
      let siblingIndex = payload.itemIndex + (payload.directionIsTop ? -1 : 1);
      let list = state.classList[payload.isIncome ? 'income' : 'cost'];
      [list[payload.itemIndex].order, list[siblingIndex].order] = [list[siblingIndex].order, list[payload.itemIndex].order];
      [list[payload.itemIndex], list[siblingIndex]] = [list[siblingIndex], list[payload.itemIndex]];
      let res = false;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          res = JSON.parse(xhr.response).isSuccess;
        }
      };
      xhr.open('post', '/api/updateClass', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
        targetClass: {
          order: list[siblingIndex].order, 
          _id: list[siblingIndex]._id
        },
        siblingClass: {
          order: list[payload.itemIndex].order, 
          _id: list[payload.itemIndex]._id
        },
      }));
    },
    reloadClass(state){
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          let res = JSON.parse(xhr.response);
          state.classList.income =  res.filter(x=>x.typeIsIncome).sort(function (a, b) {
            return a.order > b.order ? 1 : -1;
          });
          state.classList.cost =  res.filter(x=>!x.typeIsIncome).sort(function (a, b) {
            return a.order > b.order ? 1 : -1;
          });
        }
      };
      xhr.open('post', '/api/readClass', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
      }));
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
