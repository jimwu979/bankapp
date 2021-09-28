<template>
  <div id="nav" class="nav" :class="{'open': navStatus}" @click="toggleNav">
    <div class="content" v-on:click.stop>
      <div class="memberInformation">
        <div class="photo" :style="{'background-image': 'url('+ storeAccount.photo +')'}"></div>
        <div class="name">{{ storeAccount.name }}</div>
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
      this.initStore();
    }
  },
  computed: {
    storeAccount(){
      return this.$store.state.account;
    },
  },
  methods: {
    getAccount(){
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          let res = JSON.parse(xhr.response);
          _this.$store.commit('reloadAccount', {
            name: res.name,
            email: res.email,
            photo: res.photo.length > 0 ? '/photo/' + res.photo : '',
          });
        }
      };
      xhr.open('post', '/api/getAccount', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
      }));
    },
    initStore(){
      // selectMonth
      let date = new Date();
      let selectMonth = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      }
      this.$store.commit('selectMonth', selectMonth);

      // classList && recordList && account
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          let res = JSON.parse(xhr.response);
          _this.$store.commit('reloadClassAndRecord', {
            classList: res.classList,
            recordList: res.recordList,
          });
          _this.$store.commit('reloadAccount', {
            name: res.name,
            email: res.email,
            photo: res.photo,
          });
        }
      };
      xhr.open('post', '/api/initStore', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
        year: selectMonth.year,
        month: selectMonth.month,
      }));
    },
    toggleNav(){
      this.navStatus = !this.navStatus;
    }
  }
}
</script>
<style lang="scss" src="@/scss/App.scss"></style>
