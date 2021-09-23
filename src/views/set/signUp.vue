<template>
    <div class="signUp" v-if="!isAlreadyLogin">
        <div class="container">
            <h2>註冊會員</h2>
            <div class="board">
                <label for="name">姓名</label>
                <input id="name" type="text" v-model="name.val">
                <p :class="{'show': !name.done}">姓名未填寫</p>

                <label for="email">email</label>
                <input id="email" type="text" v-model="email.val" class="email">
                <p :class="{'show': !email.done}">email未填寫</p>
                <p class="show" v-if="!backendCheckResult.emailIsNew">此 email 已經申請過</p>
                
                <label for="password">密碼</label>
                <input id="password" type="password" v-model="password.val">
                <p :class="{'show': !password.done}">密碼未填寫</p>
                
                <label for="checkPassword">確認密碼</label>
                <input id="checkPassword" type="password" v-model="checkPassword.val">
                <p :class="{'show': !checkPassword.done}">密碼輸入不一致</p>
            </div>
            <router-link class="submit" to="login" @click.native.capture="checkForm">送出</router-link>
            <router-link class="goToLogin" to="login">返回登入頁</router-link>
        </div>
    </div>
</template>

<script>
import router from '@/router';

export default {
    name: 'signUp',
    data() {
        return {
            isAlreadyLogin: false,
            name: {
                val: '',
                done: true
            },
            email: {
                val: '',
                done: true,
            },
            password: {
                val: '',
                done: true
            },
            checkPassword: {
                val: '',
                done: true
            },
            fillDone: false,
            backendCheckResult: {
                isSuccess: false,
                nameIsFill: false,
                emailIsFill: false,
                emailIsNew: true,
                passwordIsFill: false,
            }
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
        checkForm(){
            this.name.done = this.name.val.length > 0 ? true : false;
            this.email.done = this.email.val.length > 0 && this.email.val.indexOf('@') != -1 ? true : false;
            this.password.done = this.password.val.length > 0 ? true : false;
            this.checkPassword.done = this.password.val == this.checkPassword.val ? true : false;
            this.fillDone = this.name.done && 
                            this.email.done && 
                            this.password.done && 
                            this.checkPassword.done ?
                            true : false;
            if(!this.fillDone){
                event.preventDefault();
            } else {
                let res;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200){
                        res = JSON.parse(xhr.response);
                    }
                };
                xhr.open('post', '/api/signUp', false);
                xhr.setRequestHeader("Content-type","application/json");
                xhr.send(JSON.stringify({
                    name: this.name.val,
                    email: this.email.val,
                    password: this.password.val,
                    photo: '',
                }));
                if(res.emailIsNew == false){
                    this.backendCheckResult.emailIsNew = false;
                    event.preventDefault();
                } else {
                    this.backendCheckResult.emailIsNew = true;
                }
            }
        }
    },
}
</script>
<style scoped lang="scss" src="@/scss/set/signUp.scss"></style>