<template>
  <div id="nav" class="nav" :class="{'open': navStatus}" @click="toggleNav">
    <div class="content" v-on:click.stop>
      <div class="memberInformation">
        <div class="name">吳新蓁</div>
      </div>
      <div class="linkGroup">
        <router-link @click="toggleNav" class="link" to="/statistics">統計</router-link>
        <router-link @click="toggleNav" class="link" to="/settingClass">類別</router-link>
        <router-link @click="toggleNav" class="link" to="/account">帳號</router-link>
      </div>
    </div>
  </div>
  <router-view @openNav="toggleNav"/>
</template>
<script>
export default {
  data() {
    return {
      navStatus: false,
    }
  },
  methods: {
    toggleNav: function(){
      this.navStatus = !this.navStatus;
    }
  }
}
</script>
<style lang="scss" src="@/scss/App.scss"></style>
