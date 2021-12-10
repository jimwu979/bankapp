<template>
  <div class="account">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="back">
          <cssIcon_arrowLeft></cssIcon_arrowLeft>
        </div>
        <div class="center">
          帳號設定
        </div>
        <div class="right" v-clickStyle>
          <router-link to="login" @click.native.capture="logout">登出</router-link>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="board">
          <div class="photo">
            <div :style="{'background-image': 'url('+ storeAccount.photo +')'}">
              <input id="uploadImage" type="file" name="file" @change="uploadImg">
              <label for="uploadImage">
                <div>
                  <cssIcon_edit></cssIcon_edit>
                </div>
              </label>
            </div>
          </div>
          <ol>
            <li>
              <div>姓名</div>
              <div @click="openLightbox('name')">{{ storeAccount.name }}</div>
            </li>
            <li>
              <div>信箱</div>
              <div @click="openLightbox('email')">{{ storeAccount.email }}</div>
            </li>
          </ol>
          <div @click="openLightbox('password')">修改密碼</div>
        </div>
      </div>
    </main>
    <div class="fixbox" :class="{'open': lightbox.isOpen}">
      <div class="lightbox">
        <div class="resetImg" :class="{'open': lightbox.resetImg.isOpen}">
          <p class="show">檔案大小不可大於10MB</p>
          <div class="btns">
            <div @click="closeLightbox">確定</div>
          </div>
        </div>
        <div class="resetName" :class="{'open': lightbox.resetName.isOpen}">
          <h2>輸入姓名</h2>
          <input type="text" v-model="lightbox.resetName.val">
          <p :class="{'show': lightbox.resetName.showErrorMessage}">欄位不可空白</p>
          <div class="btns">
            <div @click="closeLightbox">取消</div>
            <div @click="confirmReset('name')">確定</div>
          </div>
        </div>
        <div class="resetEmail" :class="{'open': lightbox.resetEmail.isOpen}">
          <h2>輸入email</h2>
          <input type="text" v-model="lightbox.resetEmail.val">
          <p :class="{'show': lightbox.resetEmail.showErrorMessage}">欄位不可空白</p>
          <div class="btns">
            <div @click="closeLightbox">取消</div>
            <div @click="confirmReset('email')">確定</div>
          </div>
        </div>
        <div class="resetPassword" :class="{'open': lightbox.resetPassword.isOpen}">
          <h2>輸入密碼</h2>
          <ol>
            <li>
              <div>舊密碼</div>
              <input type="password" v-model="lightbox.resetPassword.originalPassword.val">
              <p :class="{'show': lightbox.resetPassword.originalPassword.showErrorMessage}">密碼輸入錯誤</p>
            </li>
            <li>
              <div>新密碼</div>
              <input type="password" v-model="lightbox.resetPassword.newPassword.val">
              <p :class="{'show': lightbox.resetPassword.newPassword.showErrorMessage}">欄位不可空白</p>
            </li>
            <li>
              <div>確認新密碼</div>
              <input type="password" v-model="lightbox.resetPassword.checkNewPassword.val">
              <p :class="{'show': lightbox.resetPassword.checkNewPassword.showErrorMessage}">新密碼輸入不一致</p>
            </li>
          </ol>
          <div class="btns">
            <div @click="closeLightbox">取消</div>
            <div @click="confirmReset('password')">確定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import cssIcon_arrowLeft from '@/components/public/cssIcon_arrowLeft.vue'
import cssIcon_edit from '@/components/public/cssIcon_edit.vue'

export default {
  name: 'account',
  components: {
    cssIcon_arrowLeft, cssIcon_edit
  },
  data() {
    return {
      img: {
        val: null,
      },
      preview: null,
      image: null,
      name: '',
      email: '',
      lightbox: {
        isOpen: false,
        resetImg: {
          isOpen: false,
        },
        resetName: {
          isOpen: false,
          val: '',
          showErrorMessage: false,
        },
        resetEmail: {
          isOpen: false,
          val: '',
          showErrorMessage: false,
        },
        resetPassword: {
          isOpen: false,
          originalPassword: {
            val: '',          
            showErrorMessage: false,
          },
          newPassword: {
            val: '',          
            showErrorMessage: false,
          },
          checkNewPassword: {
            val: '',          
            showErrorMessage: false,
          },
        },
      }
    }
  },
  computed: {
    storeAccount(){
      return this.$store.state.account;
    },
  },
  methods: {
    uploadImg(){
      var input = event.target;
      if (input.files) {
        let fileSize = Math.round(input.files[0].size / 1024 / 1024);
        if(fileSize > 10){
          this.openLightbox('img');
        } else {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.img.val = e.target.result;
          }
          this.image = input.files[0];
          reader.readAsDataURL(input.files[0]);
          let formData = new FormData();
          let uploadInputTag = document.getElementById('uploadImage');
          formData.append('email', localStorage.getItem('email'));
          formData.append('loginCode', localStorage.getItem('loginCode'));
          formData.append('file', uploadInputTag.files[0]);
          let _this = this;
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
              _this.$store.commit('resetPhoto', '/photo/' + JSON.parse(xhr.response).fileName);
            }
          };
          xhr.open('post', '/album/upload', false);
          xhr.send(formData);
        }
      }
    },
    confirmReset(resetItem){
      switch (resetItem) {
        case 'name':
          let resetName = this.lightbox.resetName;
          if(resetName.val.length == 0){
            resetName.showErrorMessage = true;
          } else {
            let _this = this;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
              if(xhr.readyState === 4 && xhr.status === 200){
                if(JSON.parse(xhr.response).isSuccess){
                  _this.$store.commit('resetName', resetName.val);
                }
              }
            };
            xhr.open('post', '/api/resetName', false);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify({
              email: localStorage.getItem('email'),
              loginCode: localStorage.getItem('loginCode'),
              newName: resetName.val,
            }));
            this.closeLightbox();
            resetName.showErrorMessage = false;
          }
          break;
        case 'email':
          let resetEmail = this.lightbox.resetEmail;
          if(resetEmail.val.length == 0){
            resetEmail.showErrorMessage = true;
          } else {
            // this.email = resetEmail.val;
            let _this = this;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
              if(xhr.readyState === 4 && xhr.status === 200){
                if(JSON.parse(xhr.response).isSuccess){
                  _this.$store.commit('resetEmail', resetEmail.val);
                  localStorage.setItem('email', resetEmail.val);
                }
              }
            };
            xhr.open('post', '/api/resetEmail', false);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify({
              email: localStorage.getItem('email'),
              loginCode: localStorage.getItem('loginCode'),
              newEmail: resetEmail.val,
            }));
            this.closeLightbox();
            resetEmail.showErrorMessage = false;
          }
          break;
        case 'password':
          let password = this.lightbox.resetPassword;
          let pwd_ori = password.originalPassword;
          let pwd_new = password.newPassword;
          let pwd_check = password.checkNewPassword;
          pwd_ori.showErrorMessage = (pwd_ori.val.length == 0) ? true : false;
          pwd_new.showErrorMessage = (pwd_new.val.length == 0) ? true : false;
          pwd_check.showErrorMessage = (pwd_new.val !== pwd_check.val) ? true : false;
          if( !pwd_ori.showErrorMessage && !pwd_new.showErrorMessage && !pwd_check.showErrorMessage ){
            let _this = this;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
              if(xhr.readyState === 4 && xhr.status === 200){
                if(JSON.parse(xhr.response).isSuccess){
                  pwd_ori.showErrorMessage = false;
                  _this.closeLightbox();
                } else {
                  pwd_ori.showErrorMessage = true;
                }
              }
            };
            xhr.open('post', '/api/resetPassword', false);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify({
              email: localStorage.getItem('email'),
              loginCode: localStorage.getItem('loginCode'),
              oldPassword: pwd_ori.val,
              newPassword: pwd_new.val,
            }));
          }
          break;
      }
    },
    openLightbox(resetItem){
      this.lightbox.isOpen = true;
      switch (resetItem) {
        case 'img':
          this.lightbox.resetImg.isOpen = true;
          break;
        case 'name':
          // this.lightbox.resetName.val = this.name;
          this.lightbox.resetName.val = this.$store.state.account.name;
          this.lightbox.resetName.isOpen = true;
          break;
        case 'email':
          // this.lightbox.resetEmail.val = this.email;
          this.lightbox.resetEmail.val = this.$store.state.account.email;
          this.lightbox.resetEmail.isOpen = true;
          break;
        case 'password':
          let password = this.lightbox.resetPassword;
          password.originalPassword.val = '';
          password.newPassword.val = '';
          password.checkNewPassword.val = '';
          password.isOpen = true;
          break;
      }
    },
    closeLightbox(){
      let lightbox = this.lightbox;
      lightbox.isOpen = false;
      setTimeout(function(){
        lightbox.resetImg.isOpen = false;
        lightbox.resetName.isOpen = false;
        lightbox.resetEmail.isOpen = false;
        lightbox.resetPassword.isOpen = false;
      }, 300, lightbox);
    },
    logout(){
      let result;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          result = JSON.parse(xhr.response).isSuccess;
        }
      };
      xhr.open('post', '/api/logout', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCode: localStorage.getItem('loginCode'),
      }));
      if(result){
        localStorage.removeItem('loginCode');
        localStorage.removeItem('email');
      }
    },
    back(){
      router.go(-1);
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/set/account.scss"></style>