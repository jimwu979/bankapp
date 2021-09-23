<template>
  <div id="nav" class="nav" :class="{'open': navStatus}" @click="toggleNav">
    <div class="content" v-on:click.stop>
      <div class="memberInformation">
        <div class="photo" :style="{'background-image': 'url('+ photo +')'}"></div>
        <div class="name">{{ name }}</div>
      </div>
      <div class="linkGroup">
        <router-link @click="toggleNav" class="link" to="/statistics">統計</router-link>
        <router-link @click="toggleNav" class="link" to="/settingClass">類別</router-link>
        <router-link @click="toggleNav" class="link" to="/account">帳號</router-link>
      </div>
    </div>
  </div>
  <router-view @login="getAccount" @openNav="toggleNav"/>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      photo: '',
      navStatus: false,
    }
  },
  created(){
    if(localStorage.getItem('email') && localStorage.getItem('loginCodeName')){
      this.getAccount();
    }
  },
  methods: {
    getAccount(){
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          let res = JSON.parse(xhr.response);
         _this.name = res.name;
         console.log(res.photo);
         _this.photo = res.photo.length > 0 ? '/photo/' + res.photo : '';
        }
      };
      xhr.open('post', '/api/getAccount', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
      }));
    },
    toggleNav: function(){
      this.navStatus = !this.navStatus;
    }
  }
}
</script>
<style lang="scss" src="@/scss/App.scss"></style>
