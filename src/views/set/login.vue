<template>
  <div class="login" v-if="!isAlreadyLogin">
    <div class="logo">
      <img src="@/assets/logo.png">
    </div>
    <div class="input"
         v-for="(item, index) in inputmodel" :key="index" 
         :class="[{'focus': inputmodel[index].onFocus}, {'fill': inputmodel[index].val.length > 0}]">
      <span>{{ inputmodel[index]['text'] }}</span>
      <input @blur="focusInput(index, false)" 
             @focus="focusInput(index, true)" 
             v-model="inputmodel[index].val" 
             :type="inputmodel[index]['type']">
    </div>
    <div class="loginbtn" @click="login">登入</div>
    <router-link class="signUp" to="signUp">註冊會員</router-link>
    <div class="fixbox" :class="{'open': errorMessageIsOpen}">
      <div class="lightbox">
        email或密碼輸入錯誤
        <div @click="closeLightbox">確定</div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'login',
  data() {
    return {
      isAlreadyLogin: false,
      inputmodel: [
        {
          text: 'email',
          type: 'account',
          val: '',
          onFocus: false
        },
        {
          text: '密碼',
          type: 'password',
          val: '',
          onFocus: false
        }
      ],
      errorMessageIsOpen: false
    }
  },
  beforeCreate(){
    let _this = this;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            _this.isAlreadyLogin = JSON.parse(xhr.response).alreadyLogin;
        }
    };
    xhr.open('post', '/api/alreadyLogin', false);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
    }));
    if(this.isAlreadyLogin) router.push('/');
  },
  methods: {
    focusInput(targetInput, status){
      this.inputmodel[targetInput].onFocus = status;
    },
    closeLightbox(){
      this.errorMessageIsOpen = false;
    },
    login(){
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.open('post', '/api/login', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          let res = JSON.parse(xhr.response);
          if(res.isSuccess){
            localStorage.setItem('loginCodeName', res.loginCodeName);
            localStorage.setItem('email', _this.inputmodel[0].val);
            _this.$emit('login');
            router.push('/');
          } else {
            _this.errorMessageIsOpen = true;
          }
        }
      };
      xhr.send(JSON.stringify({
        email: this.inputmodel[0].val,
        password: this.inputmodel[1].val
      }));
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/set/login.scss"></style>