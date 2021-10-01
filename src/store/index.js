import { createStore } from 'vuex'
import router from '@/router'

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
  getters: {
    allClass(state){
      let classList = state.classList;
      return classList.income.concat(classList.cost);
    },
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
      console.log('initStore');
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
          // classList
          res.classList.forEach(item => {
            state.classList[item.typeIsIncome ? 'income' : 'cost'].push(item);
          });
          state.classList.income =  state.classList.income.sort(function (a, b) {
            return a.order > b.order ? 1 : -1;
          });
          state.classList.cost =  state.classList.cost.sort(function (a, b) {
            return a.order > b.order ? 1 : -1;
          });

          // recordList
          state.recordList = res.recordList;

          // account
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
      this.commit('reloadRecord');
    },
    reloadRecord(state){
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          state.recordList = JSON.parse(xhr.response).record;
        }
      };
      xhr.open('post', '/api/readRecord_aMonth', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
        year: state.selectMonth.year,
        month: state.selectMonth.month,
      }));
    },
    deleteRecord(state, payload){
      let xhr = new XMLHttpRequest();
      let _this = this;
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          if(JSON.parse(xhr.response).isSuccess){
            let deleteIndex = state.recordList.findIndex((item)=> {
              return item._id == payload;
            });
            state.recordList.splice(deleteIndex, 1);
          }
        }
      };
      xhr.open('post', '/api/deleteRecord', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
        recordId: payload,
      }));
    },
    updateRecord(state, payload){
      payload.email = localStorage.getItem('email');
      payload.loginCodeName = localStorage.getItem('loginCodeName');
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          let res = xhr.response;
          if(payload.year  == state.selectMonth.year && 
             payload.month == state.selectMonth.month
          ){
            if( payload.isNew){ 
              _this.commit('reloadRecord');
            }else{
              let recordIndex = state.recordList.findIndex(item => {
                return item._id == payload.recordId;
              });
              state.recordList[recordIndex].typeIsIncome = payload.typeIsIncome;
              state.recordList[recordIndex].description = payload.description;
              state.recordList[recordIndex].classId = payload.classId;
              state.recordList[recordIndex].value = payload.value;
              state.recordList[recordIndex].year = payload.year;
              state.recordList[recordIndex].month = payload.month;
              state.recordList[recordIndex].day = payload.day;
              state.recordList[recordIndex].timestamp = payload.timestamp;
            }
          }
        }
      };
      xhr.open('post', '/api/'+ (payload.isNew ? 'createRecord' : 'updateRecord'), false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify(payload));
    }
  },
  actions: {
  },
  modules: {
  }
})
