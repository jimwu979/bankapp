<template>
  <div class="login">
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
    <router-link class="loginbtn" to="index">登入</router-link>
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

export default {
  name: 'login',
  data() {
    return {
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
  methods: {
    focusInput(targetInput, status){
      this.inputmodel[targetInput].onFocus = status;
    },
    closeLightbox(){
      this.errorMessageIsOpen = false;
    },
  },
}
</script>
<style lang="scss" src="@/scss/set/login.scss"></style>